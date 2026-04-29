// import { Server as SocketIOServer } from "socket.io";
// import { verifyAccessToken } from "./auth";
// import { connectDb } from "./db";
// import { Match } from "@/models/Match";
// import * as cricketEngine from "./cricket-engine";

// let io: SocketIOServer | null = null;

// export function getIO (): SocketIOServer | null {
//   return io;
// };

// export function initSocketServer(httpServer: any): SocketIOServer {
//   io = new SocketIOServer(httpServer, {
//     cors: {
//       origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//       methods: ["GET", "POST"],
//     },
//   })
// };

// io.use((socket, next) => {
//   const token = socket.handshake.auth?.token;
//   if (!token) return next(new Error("Authentication Required"));

//   const payload = verifyAccessToken(token);
//   if (!payload) return next(new Error("Invalid token"));

//   (socket as any).user = payload;
//   next();
// });

// io.on("connection", (socket) => {
//   console.log(`User connected ${(socket as any).user.usrId}`);

//   socket.on("join-match", async (matchId: string) => {
//     socket.join(`match:${matchId}`);
//     socket.join(`overlay:${matchId}`);

//     try {
//       await connectDb();
//       const match = await Match.findById(matchId)
//         .populate("teamA.team", "name shortName logo primaryColor secondaryColor")
//         .populate("teamB.team", "name shortName logo primaryColor secondaryColor")
//         .populate("teamA.playingXI", "name jerseyNumber")
//         .populate("teamB.playingXI", "name jerseyNumber");

//       if (match) {  
//         socket.emit("match-update", match);
//       }
//     } catch (error) {
//       socket.emit("error", { message: "Failed to load match" });
//     }
//   });

//   socket.on("ball-event", async (data) => {
//     try {
//       await connectDb();
//       const match = await Match.findById(data.matchId);
//       if (!match) return socket.emit("error", { message: "Match not found" });

//       const engine = 
//     } catch () {

//     }
//   })
// })

import { Server as SocketIOServer } from "socket.io";
import { verifyAccessToken } from "./auth";
import { connectDb } from "./db";
import { Match } from "@/models/Match";
import {
  calculateTotalRuns,
  shouldSwapStrike,
  isOverCompleted,
  isInningsCompleted,
} from "./cricket-engine";

let io: SocketIOServer | null = null;

export function getIO(): SocketIOServer | null {
  return io;
}

export function initSocketServer(httpServer: any): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication required"));

    const payload = verifyAccessToken(token);
    if (!payload) return next(new Error("Invalid token"));

    (socket as any).user = payload;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${(socket as any).user.userId}`);

    socket.on("join-match", async (matchId: string) => {
      socket.join(`match:${matchId}`);
      socket.join(`overlay:${matchId}`);

      try {
        await connectDb();
        const match = await Match.findById(matchId)
          .populate("teamA.team", "name shortName logo primaryColor secondaryColor")
          .populate("teamB.team", "name shortName logo primaryColor secondaryColor")
          .populate("teamA.playingXI", "name jerseyNumber")
          .populate("teamB.playingXI", "name jerseyNumber");

        if (match) {
          socket.emit("match-update", match);
        }
      } catch (err) {
        socket.emit("error", { message: "Failed to load match" });
      }
    });

    // Processing a ball event
    socket.on("ball-event", async (data) => {
      try {
        await connectDb();
        const match = await Match.findById(data.matchId);
        if (!match) return socket.emit("error", { message: "Match not found" });

        const currentInnings = match.innings[match.currentInnings];
        if (!currentInnings) {
          return socket.emit("error", { message: "Innings data not found" });
        }

        // Update the innings state based on `data` using existing cricket-engine functions
        const totalRuns = calculateTotalRuns(data);
        currentInnings.totalRuns += totalRuns;

        // Record the ball
        currentInnings.balls.push({
          runs: totalRuns,
          extras: data.extras,
          extrasType: data.extrasType,
          isWicket: data.isWicket,
          dismissalType: data.dismissalType,
          dismissedPlayer: data.dismissedPlayer,
          fielder: data.fielder,
          fielderPosition: data.fielderPosition,
          secondFielder: data.secondFielder,
        });

        // Strike swapping
        if (shouldSwapStrike(data, false)) {
          const batsmen = currentInnings.batsmen;
          const temp = batsmen[0];
          batsmen[0] = batsmen[1];
          batsmen[1] = temp;
        }

        // End-over handling
        if (isOverCompleted(currentInnings.legalDeliveriesInCurrentOver)) {
          currentInnings.legalDeliveriesInCurrentOver = 0;
          currentInnings.completedOvers += 1;
        }

        // End-innings handling
        if (
          isInningsCompleted(
            currentInnings.totalBalls,
            currentInnings.oversLimit,
            currentInnings.totalWickets,
            match.playersPerSide
          )
        ) {
          if (match.currentInnings === 0) {
            match.currentInnings = 1; // Switch to the second innings
          } else {
            match.status = "completed"; // Match completed
          }
        }

        await match.save();

        // Emit updated match state to clients
        io?.to(`match:${data.matchId}`).emit("match-update", match);
        io?.to(`match:${data.matchId}`).emit("ball-logged", {
          ...data,
          timestamp: new Date(),
        });

        // Broadcast updated overlay state
        io?.to(`overlay:${data.matchId}`).emit("overlay-update", {
          teamA: match.teamA,
          teamB: match.teamB,
          innings: match.innings,
          currentInnings: match.currentInnings,
          status: match.status,
        });
      } catch (err: any) {
        socket.emit("error", { message: err.message });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${(socket as any).user?.userId}`);
    });
  });

  return io;
}

// "use client";

// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import { useParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// interface OverlayData {
//   teamA: any[];
//   teamB: any[];
//   innings: any[];
//   currentInnings: number;
//   status: string;
// };

// export default function OverlayPage () {
//   const { matchId } = useParams();
//   const [data, setData] = useState<OverlayData | null>(null);
//   const [lastBall, setLastBall] = useState<any>(null);
//   const [showLastBall, setShowLastBall] = useState(false);

//   useEffect(() => {
//     // Initial fetch
//     fetch(`/api/overlay/${matchId}`)
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.success) setData(res.data);
//       });

//       // Socket connection for real time updates
//       const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");

//       socket.on("connect", () => {
//         socket.emit("join-match", matchId);
//       });

//       socket.on("overlay-update", (update: OverlayData) => {
//         setData(update);
//       });

//       socket.on("ball-logged", (ball: any) => {
//         setLastBall(ball);
//         setShowLastBall(true);
//         setTimeout(() => setShowLastBall((false)), 3000);
//       });

//       return () => {
//         socket.disconnect();
//       };
//   }, [matchId]);

//   if (!data) {
//     return <div className="bg-transparent"></div>
//   }

//   const currentInnings = data.innings?.[data.currentInnings];
//   const battingTeam = data.currentInnings === 0 ? data.teamA : data.teamB;
//   const bowlingTeam = data.currentInnings === 0 ? data.teamB : data.teamA;

//   const score = currentInnings?.totalRuns ?? 0;
//   const wickets = currentInnings?.totalWickets ?? 0;
//   const overs = currentInnings?.oversCompleted ?? 0;
//   const balls = currentInnings?.ballsInCurrentOver ?? 0;
//   const oversDisplay = `${overs}.${balls}`

//   const target = data.currentInnings === 1 ? ( data.innings?.[0]?.totalRuns ?? 0 ) + 1 : null;
//   const runRate = currentInnings?.currentRunRate?.toFixed(2) ?? "0.00";
//   const requiredRate = currentInnings?.requiredRunRate?.toFixed(2);

//   return (
//     <div className="fixed bottom-8 left-8 font-sans" style={{ width: 480 }}>
//       {/* Main Scorboard */}
//       <motion.div
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="relative overflow-hidden rounded-lg shadow-2xl"
//       >
//         {/* Top bar with colors */}
//         <div className="flx">
//           <div
//             className="flex-1 px-4 py-2.5 flex items-center gap-3"
//             style={{
//               background: `linear-gradient(135deg, ${
//                 battingTeam?.team?.primaryColor || "#1a56db"
//               }, ${battingTeam?.team?.secondaryColor || "#000"})`,
//             }}
//           >
//             <span className="text-white font-bold text-sm tracking-wider uppercase">
//               {battingTeam?.team?.shortName || "BAT"}
//             </span>
//             <div className="flex items-baseline gap-1 ml-auto">
//               <span className="text-white text-2xl font-bold">
//                 {score}/{wickets}
//               </span>
//               <span className="text-white/70 text-sm">
//                 ({oversDisplay})
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Info bar */}
//         <div className="bg-zinc-900/95 backdrop-blur px-4 py-2 flex items-center justify-between text-xs">
//           <div className="flex items-center gap-4">
//             <span className="text-zinc-400">
//               CRR: <span className="text-white font-semibold">run rate</span>
//             </span>

//             {target && requiredRate && (
//               <span className="text-zinc-400">
//                 RRR: {" "}
//                 <span className="text-amber-400 font-semibold">
//                   {requiredRate}
//                 </span>
//               </span>
//             )}

//             {
//               target && (
//                 <span className="text-zinc-400">
//                   Need: {" "}
//                   <span className="text-emerald-400 font-semibold">
//                     {Math.max(target - score, 0)} off {" "}
//                     {currentInnings?.ballsRemaining ?? "?"}
//                   </span>
//                 </span>
//               )
//             }
//           </div>
//           <span className="text-zinc-500 text-[10px]">
//             CRICKCAST
//           </span>
//         </div>
//       </motion.div>

//       {/* Last Ball Popup */}
//       <AnimatePresence>
//         {showLastBall && lastBall && (
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             className="absolute -top-16 right-0 bg-zinc-900/95 backdrop-blur border border-white/10 rounded-xl px-5 py-3 shadow-2xl"
//           >
//             <span
//               className={`text-3xl font-black ${
//                 lastBall.isWicket
//                   ? "text-red-500"
//                   : lastBall.runs === 4
//                   ? "text-blue-400"
//                   : lastBall.runs === 6
//                   ? "text-emerald-400"
//                   : "text-white"
//               }`}
//             >
//               {lastBall.isWicket
//                 ? "OUT!"
//                 : lastBall.runs === 0
//                 ? "•"
//                 : lastBall.runs}
//             </span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type TeamRef = {
  _id?: string;
  name?: string;
  shortName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logo?: string;
};

type OverlayTeamSide = {
  team?: TeamRef;          // populated team doc from Mongo
  playingXI?: any[];       // keep any[] for now (you can type later)
  score?: any;             // optional if you add more later
};

type OverlayInnings = {
  totalRuns?: number;
  totalWickets?: number;

  // You used these fields in UI; make them optional to avoid TS errors
  oversCompleted?: number;
  ballsInCurrentOver?: number;
  ballsRemaining?: number;

  currentRunRate?: number;
  requiredRunRate?: number;
};

interface OverlayData {
  teamA: OverlayTeamSide;
  teamB: OverlayTeamSide;
  innings: OverlayInnings[];
  currentInnings: number;
  status: string;
}

export default function OverlayPage() {
  const params = useParams();
  const matchId = params.matchId as string;

  const [data, setData] = useState<OverlayData | null>(null);
  const [lastBall, setLastBall] = useState<any>(null);
  const [showLastBall, setShowLastBall] = useState(false);

  useEffect(() => {
    if (!matchId) return;

    // Initial fetch
    fetch(`/api/overlay/${matchId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
      });

    // Socket connection for real time updates
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");

    socket.on("connect", () => {
      socket.emit("join-match", matchId);
    });

    socket.on("overlay-update", (update: OverlayData) => {
      setData(update);
    });

    socket.on("ball-logged", (ball: any) => {
      setLastBall(ball);
      setShowLastBall(true);
      setTimeout(() => setShowLastBall(false), 3000);
    });

    return () => {
      socket.disconnect();
    };
  }, [matchId]);

  if (!data) {
    return <div className="bg-transparent" />;
  }

  const currentInnings = data.innings?.[data.currentInnings];

  const battingTeam = data.currentInnings === 0 ? data.teamA : data.teamB;
  // const bowlingTeam = data.currentInnings === 0 ? data.teamB : data.teamA; // not used currently

  const score = currentInnings?.totalRuns ?? 0;
  const wickets = currentInnings?.totalWickets ?? 0;
  const overs = currentInnings?.oversCompleted ?? 0;
  const balls = currentInnings?.ballsInCurrentOver ?? 0;
  const oversDisplay = `${overs}.${balls}`;

  const target =
    data.currentInnings === 1 ? (data.innings?.[0]?.totalRuns ?? 0) + 1 : null;

  const runRate = currentInnings?.currentRunRate?.toFixed(2) ?? "0.00";
  const requiredRate = currentInnings?.requiredRunRate?.toFixed(2);

  return (
    <div className="fixed bottom-8 left-8 font-sans" style={{ width: 480 }}>
      {/* Main Scorboard */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden rounded-lg shadow-2xl"
      >
        {/* Top bar with colors */}
        <div className="flex">
          <div
            className="flex-1 px-4 py-2.5 flex items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${
                battingTeam?.team?.primaryColor || "#1a56db"
              }, ${battingTeam?.team?.secondaryColor || "#000"})`,
            }}
          >
            <span className="text-white font-bold text-sm tracking-wider uppercase">
              {battingTeam?.team?.shortName || "BAT"}
            </span>
            <div className="flex items-baseline gap-1 ml-auto">
              <span className="text-white text-2xl font-bold">
                {score}/{wickets}
              </span>
              <span className="text-white/70 text-sm">({oversDisplay})</span>
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="bg-zinc-900/95 backdrop-blur px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">
              CRR: <span className="text-white font-semibold">{runRate}</span>
            </span>

            {target && requiredRate && (
              <span className="text-zinc-400">
                RRR:{" "}
                <span className="text-amber-400 font-semibold">{requiredRate}</span>
              </span>
            )}

            {target && (
              <span className="text-zinc-400">
                Need:{" "}
                <span className="text-emerald-400 font-semibold">
                  {Math.max(target - score, 0)} off{" "}
                  {currentInnings?.ballsRemaining ?? "?"}
                </span>
              </span>
            )}
          </div>
          <span className="text-zinc-500 text-[10px]">CRICKCAST</span>
        </div>
      </motion.div>

      {/* Last Ball Popup */}
      <AnimatePresence>
        {showLastBall && lastBall && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-16 right-0 bg-zinc-900/95 backdrop-blur border border-white/10 rounded-xl px-5 py-3 shadow-2xl"
          >
            <span
              className={`text-3xl font-black ${
                lastBall.isWicket
                  ? "text-red-500"
                  : lastBall.runs === 4
                  ? "text-blue-400"
                  : lastBall.runs === 6
                  ? "text-emerald-400"
                  : "text-white"
              }`}
            >
              {lastBall.isWicket ? "OUT!" : lastBall.runs === 0 ? "•" : lastBall.runs}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
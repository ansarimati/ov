import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface BallEvent {
  ballNumber: number;
  overNumber: number;
  runs: number;
  isWicket: boolean;
  isExtra: boolean;
  extraType?: string;
  extraRuns?: number;
  batsmanId?: string;
  bowlerId?: string;
  dismissalType?: string;
  dismissedPlayerId?: string;
  fielderId?: string;
  commentary?: string;
  timestamp?: Date;
};

interface ScoringState {
  socket: Socket | null;
  isConnected: boolean;
  matchId: string | null;
  liveData: any | null;
  ballLog: BallEvent[];
  isUndoAvailable: boolean;

  connect: (matchId: string, token: string) => void;
  disconnect: () => void;
  sendBall: (event: Partial<BallEvent>) => void;
  undoLastBall: () => void;
  endOver: () => void;
  endInnings: () => void;
  swapBatsman: () => void;
  retireBatsman: (playerId: string, isHurt: boolean) => void;
  addNewBatsman: (playerId: string) => void;
  changeBowler: (playerId: string) => void;
  updateFieldPosition: (position: any) => void; 
};

export const useScoringStore = create<ScoringState>((set, get) => ({
  socket: null,
  isConnected: false,
  matchId: null,
  liveData: null,
  ballLog: [],
  isUndoAvailable: false,

  connect: (matchId, token) => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      auth: { token },
      query: { matchId }
    });

    socket.on("connect", () => {
      set({ isConnected: true });
      socket.emit("join-match", matchId);
    });

    socket.on("match-update", (data: any) => {
      set({ liveData: data });
    });

    socket.on("ball-logges", (ball: BallEvent) => {
      set((state) => ({
        ballLog: [...state.ballLog, ball],
        isUndoAvailable: true
      }));
    });

    socket.on("undo-success", (data: any) => {
      set({
        liveData: data,
        ballLog: data.ballLog,
        isUndoAvailable: data.ballLog.length > 0
      });
    });

    socket.on("disconnect", () => {
      set({ isConnected: false });
    });

    set({ socket, matchId });
  },

  disconnect: () => {
    const socket = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false, matchId: null, liveData: null, ballLog: [] });
    }
  },

  sendBall: (event) => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("ball-event", { matchId, ...event });
    }
  },

  undoLastBall: () => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("undo-ball", { matchId })
    }
  },

  endOver: () => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("end-over", { matchId })
    } 
  },

  endInnings: () => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("end-innings", { matchId })
    }
  },

  swapBatsman: () => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("swap-batsman", { matchId })
    }
  },

  retireBatsman: (playerId, isHurt) => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("retire-batsman", { matchId, playerId, isHurt });
    }
  },

  addNewBatsman: (playerId) => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("new-batsman", { matchId, playerId })
    }
  },

  changeBowler: (playerId) => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("change-bowler", { matchId, playerId })
    }
  },

  updateFieldPosition: (position) => {
    const { socket, matchId } = get();
    if (socket && matchId) {
      socket.emit("field-position", { matchId, position });
    }
  }
}))
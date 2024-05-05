import { range } from "@/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface addMoveProps {
  piece: string;
  from: Square;
  to: Square;
}

interface Square {
  rank: number;
  file: number;
}

type Store = {
  moves: string;
  addMoves: ({ from, piece, to }: addMoveProps) => void;
  tempMove: ({ from, to }: Pick<addMoveProps, "from" | "to">) => void;
  boardState: string[][];
  setFocusedSquare: (sqaure: Square | null) => void;
  focusedSquare: Square | null;
  canMove: ({ from, to, piece }: addMoveProps) => boolean;
  isBlocked: ({ from, to }: Pick<addMoveProps, "from" | "to">) => boolean;
  getPiece: ({ rank, file }: Square) => string;
  isAlly: (piece: string, otherPiece: string) => boolean;
  turn: "white" | "black";
  getPiecesBetween: ({
    square1,
    square2,
  }: {
    square1: Square;
    square2: Square;
  }) => string[];
};

export const useStore = create<Store>()(
  devtools((set, get) => ({
    moves: "",
    turn: "white",
    boardState: [
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", "p", "p", "p", "p", "p", "p", "p"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ],
    focusedSquare: null,

    addMoves: ({}) => {},
    tempMove: ({ from, to }) => {

      const piece = get().boardState[from.rank - 1][from.file - 1];
      const isCorrectPlayer = (get().turn === "white" && piece.toLowerCase() !== piece) || (get().turn === "black" && piece.toLowerCase() === piece);

      if(!isCorrectPlayer) return;
      console.log(get().canMove({ from, to, piece }), get().isBlocked({ from, to }));
      if (!get().canMove({ from, to, piece }) || get().isBlocked({ from, to }))
        return;

      set(() => {
        const board = structuredClone(get().boardState);
        board[to.rank - 1][to.file - 1] = board[from.rank - 1][from.file - 1];
        board[from.rank - 1][from.file - 1] = "";
        return { boardState: board, turn: get().turn === "white" ? "black" : "white"};
      });
    },
    setFocusedSquare: (square) => {
      set(() => ({ focusedSquare: square }));
    },

    canMove: ({ from, to, piece }) => {
      const rankDiff = to.rank - from.rank;
      const fileDiff = to.file - from.file;
      const rankDiffAbs = Math.abs(rankDiff);
      const fileDiffAbs = Math.abs(fileDiff);

      if (rankDiff === 0 && fileDiff === 0) return false;
      
      switch (piece) {
        // only one either rank or file could be same
        case "R":
        case "r": {
          return rankDiff === 0 || fileDiff === 0;
        }
        case "B":
        case "b": {
          return rankDiffAbs === fileDiffAbs;
        }
        case "Q":
        case "q": {
          return (
            rankDiff === 0 || fileDiff === 0 || rankDiffAbs === fileDiffAbs
          );
        }
        case "K":
        case "k": {
          return (
            (rankDiff === 0 && fileDiffAbs === 1) ||
            (fileDiff === 0 && rankDiffAbs === 1) ||
            (rankDiffAbs === fileDiffAbs &&
              rankDiffAbs === 1 &&
              fileDiffAbs === 1)
          );
        }

        case "N":
        case "n": {
          return (
            (fileDiffAbs === 1 && rankDiffAbs === 2) ||
            (rankDiffAbs === 1 && fileDiffAbs === 2)
          );
        }

        // Dash
        // Promotion
        // En passant
        // Capture
        case "P": {
          return rankDiff === -1 && fileDiff === 0;
        }
        case "p": {
          return rankDiff === 1 && fileDiff === 0;
        }
      }
      return false;
    },
    isBlocked: ({ from, to }) => {
      const boardState = get().boardState;
      const rankDiff = to.rank - from.rank;
      const fileDiff = to.file - from.file;

      if (rankDiff === 0 && fileDiff === 0) return false;

      const piece = get().getPiece(from);
      const pieces = get().getPiecesBetween({ square1: from, square2: to });
      console.log("🚀 ~ devtools ~ pieces:", pieces.slice(0, -1).some((piece) => piece !== ""), get().isAlly(get().getPiece(from), get().getPiece(to)))
      // TODOs
      return (
        pieces.slice(0, -1).some((piece) => piece !== "") ||
        get().isAlly(get().getPiece(from), get().getPiece(to))
      );
      switch (piece) {
        case "R": {
        }
      }
      return true;
    },

    getPiece({ rank, file }) {
      const board = get().boardState;
      return board[rank - 1][file - 1];
    },

    getPiecesBetween({ square1, square2 }) {
      const rankDiff = square2.rank - square1.rank;
      const fileDiff = square2.file - square1.file;

      if (rankDiff === 0 && fileDiff === 0) return [];
      if (
        rankDiff !== 0 &&
        fileDiff !== 0 &&
        Math.abs(rankDiff) !== Math.abs(fileDiff)
      )
        return [];

      const diff = Math.abs(rankDiff || fileDiff);

      const piecesInBetween = range(1, diff).map((i) =>
        get().getPiece({
          rank: square1.rank + (i * rankDiff) / diff,
          file: square1.file + (i * fileDiff) / diff,
        })
      );

      return piecesInBetween;
    },

    isAlly(piece, otherPiece) {
      if(!otherPiece) return false
      const t = piece + otherPiece;
      if(t.toLowerCase() === t) return true;
      if(t.toUpperCase() === t) return true;
      return false
    },
  }))
);

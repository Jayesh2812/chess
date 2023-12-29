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
  tempMove: ({ from, to }: Pick<addMoveProps, 'from' |'to'>) => void;
  boardState: string[][];
  setFocusedSquare: ({ rank, file }: Square) => void;
  focusedSquare: Square | null;
};

export const useStore = create<Store>()(
  devtools((set, get) => ({
    moves: "",
    boardState: [
      ["-R", "-N", "-B", "-Q", "-K", "-B", "-N", "-R"],
      ["-P", "-P", "-P", "-P", "-P", "-P", "-P", "-P"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ],
    addMoves: ({ from, to, piece }) => {},
    tempMove: ({ from, to }) => {
      set(() => {
        const board = structuredClone(get().boardState);
        board[to.rank - 1][to.file - 1] = board[from.rank - 1][from.file - 1];
        board[from.rank - 1][from.file - 1] = "";
        return { boardState: board };
      });
    },
    setFocusedSquare: (square) => {
      set(() => ({focusedSquare: square}))
    },
    focusedSquare: null,
  }))
);

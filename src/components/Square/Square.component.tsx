"use client";
import React from "react";
import styles from "./Square.module.css";
import { FILES, RANKS } from "@/constants";
import { File, Rank } from "@/types";
import { cx } from "@emotion/css";
import { useDrag, useDrop } from "react-dnd";
import Image from "next/image";
import { useStore } from "@/stores/global.store";

interface ISquareProps {
  rank: number;
  file: number;
  piece: string;
}

`
white chess king	♔
white chess queen	♕
white chess rook	♖
white chess bishop	♗
white chess knight	♘
white chess pawn	♙
black chess king	♚
black chess queen	♛
black chess rook	♜
black chess bishop	♝
black chess knight	♞
black chess pawn	♟︎
`;
const map = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟︎",
};

const iMap = {
  K: <img src={"/pieces/whiteKing.svg"} alt={"whiteKing"} />,
  Q: <img src={"/pieces/whiteQueen.svg"} alt={"whiteQueen"} />,
  R: <img src={"/pieces/whiteRook.svg"} alt={"whiteRook"} />,
  B: <img src={"/pieces/whiteBishop.svg"} alt={"whiteBishop"} />,
  N: <img src={"/pieces/whiteKnight.svg"} alt={"whiteKnight"} />,
  P: <img src={"/pieces/whitePawn.svg"} alt={"whitePawn"} />,
  k: <img src={"/pieces/blackKing.svg"} alt={"blackKing"} />,
  q: <img src={"/pieces/blackQueen.svg"} alt={"blackQueen"} />,
  r: <img src={"/pieces/blackRook.svg"} alt={"blackRook"} />,
  b: <img src={"/pieces/blackBishop.svg"} alt={"blackBishop"} />,
  n: <img src={"/pieces/blackKnight.svg"} alt={"blackKnight"} />,
  p: <img src={"/pieces/blackPawn.svg"} alt={"blackPawn"} />,
};

function Square({ file, rank, piece }: ISquareProps) {
  const tempMove = useStore((state) => state.tempMove);
  const setFocusedSquare = useStore((state) => state.setFocusedSquare);
  const focusedSquare = useStore((state) => state.focusedSquare);
  const getPiecesBetween = useStore((state) => state.getPiecesBetween);

  const isBlack = (rank + (file % 2)) % 2;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "K",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      piece,
      rank,
      file,
    },
  }));

  const [, drop] = useDrop<ISquareProps>(() => ({
    accept: "K",
    collect(monitor) {},
    drop: (item, monitor) => {
      console.log(item, file, rank);
      const from = { rank: item.rank, file: item.file };
      const to = { file, rank };
      
      tempMove({ from, to });
    },
  }));

  return (
    <div
      ref={drop}
      className={cx(styles.square, { [styles.white]: !isBlack })}
      onClick={() => {
        if (!focusedSquare) return;
        if (focusedSquare.rank === rank && focusedSquare.file === file) return;
        tempMove({ from: focusedSquare, to: { rank, file } });
        setFocusedSquare(null);
      }}
    >
      <span
        tabIndex={-1}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
          transform: "translate(0, 0)",
        }}
        onClick={(e) => {
          setFocusedSquare({ rank, file });
          e.stopPropagation();
        }}
        ref={drag}
      >
        {iMap[piece]}
      </span>
    </div>
  );
}

export default Square;

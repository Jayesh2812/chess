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
  rank: Rank;
  file: File;
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
  "-K": "♚",
  "-Q": "♛",
  "-R": "♜",
  "-B": "♝",
  "-N": "♞",
  "-P": "♟︎",
};

const iMap = {
  K: <img src={"/pieces/whiteKing.svg"} alt={"whiteKing"} />,
  Q: <img src={"/pieces/whiteQueen.svg"} alt={"whiteQueen"} />,
  R: <img src={"/pieces/whiteRook.svg"} alt={"whiteRook"} />,
  B: <img src={"/pieces/whiteBishop.svg"} alt={"whiteBishop"} />,
  N: <img src={"/pieces/whiteKnight.svg"} alt={"whiteKnight"} />,
  P: <img src={"/pieces/whitePawn.svg"} alt={"whitePawn"} />,
  "-K": <img src={"/pieces/blackKing.svg"} alt={"blackKing"} />,
  "-Q": <img src={"/pieces/blackQueen.svg"} alt={"blackQueen"} />,
  "-R": <img src={"/pieces/blackRook.svg"} alt={"blackRook"} />,
  "-B": <img src={"/pieces/blackBishop.svg"} alt={"blackBishop"} />,
  "-N": <img src={"/pieces/blackKnight.svg"} alt={"blackKnight"} />,
  "-P": <img src={"/pieces/blackPawn.svg"} alt={"blackPawn"} />,
};

function Square({ file, rank, piece }: ISquareProps) {
  const tempMove = useStore((state) => state.tempMove);
  const setFocusedSquare = useStore((state) => state.setFocusedSquare);
  const focusedSquare = useStore((state) => state.focusedSquare);

  const isBlack = (rank + (file % 2)) % 2;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "K",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      type: piece,
      rank,
      file,
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: "K",
    collect(monitor) {
      console.log(monitor.canDrop());
    },
    drop: (item, monitor) => {
      console.log(item, file, rank);
      tempMove({ from: { rank: item.rank, file: item.file }, to: {file, rank} });
    },
  }));

  return (
    <div ref={drop} className={cx(styles.square, { [styles.white]: !isBlack })} onClick={() => {
      if(!focusedSquare) return
      if(focusedSquare.rank === rank && focusedSquare.file === file) return
      tempMove({from: focusedSquare, to: {rank, file}})

    }}>
      <span tabIndex={-1}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
          transform: "translate(0, 0)",
        }}
        onClick={(e) => {setFocusedSquare({rank, file}); e.stopPropagation()}}
        ref={drag}
      >
        {iMap[piece]}
      </span>
    </div>
  );
}

export default Square;

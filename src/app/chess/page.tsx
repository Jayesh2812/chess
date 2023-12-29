"use client";
import React, { useEffect } from "react";
import Square from "@/components/Square/Square.component";
import { FILES } from "@/constants";
import File from "@/components/File/File.component";
import { useStore } from "@/stores/global.store";
import { useShallow } from "zustand/react/shallow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function Chess() {
  const moves = useStore((state) => state.moves);
  const boardState = useStore(state => state.boardState)

  useEffect(() => {
    console.log("🚀 ~ file: page.tsx:18 ~ useEffect ~ boardState:", boardState)
  }, [boardState])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={"chessboard"}>
        {/* {FILES.map((file) => (
        <File file={file} />
      ))} */}

        {boardState.map((row, rank) => {
          return (
            <div style={{ display: "flex" }}>
              {row.map((piece, file) => {
                return (
                  <Square
                    file={file + 1}
                    rank={rank + 1}
                    piece={piece}
                    
                    key={`${file}${piece}${rank}`}
                  ></Square>
                );
              })}
            </div>
          );
        })}
      </div>
    </DndProvider>
  );
}

export default Chess;

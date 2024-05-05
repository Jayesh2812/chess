import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <img src="./pieces/whitePawn.svg" alt="" />
      <img src="./pieces/whiteKing.svg" alt="" />
      <img src="./pieces/whiteQueen.svg" alt="" />
      <img src="./pieces/whiteRook.svg" alt="" />
      <img src="./pieces/whiteBishop.svg" alt="" />
      <img src="./pieces/whiteKnight.svg" alt="" />
      <img src="./pieces/whitePawn.svg" alt="" />

      <img src="./pieces/blackPawn.svg" alt="" />
      <img src="./pieces/blackKing.svg" alt="" />
      <img src="./pieces/blackQueen.svg" alt="" />
      <img src="./pieces/blackRook.svg" alt="" />
      <img src="./pieces/blackBishop.svg" alt="" />
      <img src="./pieces/blackKnight.svg" alt="" />
    </div>
  );
}

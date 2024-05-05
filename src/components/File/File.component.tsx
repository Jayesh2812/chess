import React from "react";
import Square from "../Square/Square.component";
import { RANKS } from "@/constants";
import { File } from "@/types";
import styles from './File.module.css'

interface IFileProps {
  file: File;
}
function File({ file }: IFileProps) {
  return (
    <div className={styles.file}>
    </div>
  );
}

export default File;

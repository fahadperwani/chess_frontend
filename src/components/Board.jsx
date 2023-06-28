import React, { useRef, useState } from "react";
import "../styles/Board.css";
import Piece from "./Piece";

function Board() {
  const [board, setBoard] = useState([
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pw", "pw", "pw", "pw", "pw", "pw", "pw", "pw"],
    ["rw", "nw", "bw", "qw", "kw", "bw", "nw", "rw"],
  ]);
  const moved = [];
  const refs = useRef([]);
  let curr = [];

  const possibleMoves = (piece, row, column) => {
    console.log(curr.length);
    for (let i = 0; i < curr.length; i++) {
      curr[i].classList.remove("move");
    }
    curr = [];
    if (piece == "") return;
    if (piece[0] == "p") {
      const moves = pawnmoves(piece, row, column);
      moves.forEach((move) => {
        const [r, c] = move;
        if (!(r < 0 || r > 7 || c < 0 || c > 7 || board[r][c] != "")) {
          refs.current[r][c].classList.add("move");
          curr.push(refs.current[r][c]);
        }
      });
    }
    if (piece[0] == "n") {
      const moves = knightmoves(row, column);
      moves.forEach((move) => {
        const [r, c] = move;
        if (!(r < 0 || r > 7 || c < 0 || c > 7 || board[r][c] != "")) {
          refs.current[r][c].classList.add("move");
          curr.push(refs.current[r][c]);
        }
      });
    }
    if (piece[0] == "b") {
      const moves = bishopmoves(row, column);
      moves.forEach((move) => {
        const [r, c] = move;
        if (!(r < 0 || r > 7 || c < 0 || c > 7 || board[r][c] != "")) {
          refs.current[r][c].classList.add("move");
          curr.push(refs.current[r][c]);
        }
      });
    }
    if (piece[0] == "r") {
      const moves = rookmoves(row, column);
      moves.forEach((move) => {
        const [r, c] = move;
        if (!(r < 0 || r > 7 || c < 0 || c > 7)) {
          refs.current[r][c].classList.add("move");
          curr.push(refs.current[r][c]);
        }
      });
    }
  };

  const pawnmoves = (piece, row, column) => {
    let moves = [];
    const isBlack = piece.indexOf("w") == -1;
    if (!refs.current[row][column].getAttribute("moved")) {
      if (isBlack) moves.push([row + 2, column]);
      else moves.push([row - 2, column]);
    }
    if (isBlack) moves.push([row + 1, column]);
    else moves.push([row - 1, column]);
    return moves;
  };

  const knightmoves = (row, column) => {
    return [
      [row + 1, column + 2],
      [row - 1, column + 2],
      [row + 1, column - 2],
      [row - 1, column - 2],
      [row + 2, column + 1],
      [row + 2, column - 1],
      [row - 2, column + 1],
      [row - 2, column - 1],
    ];
  };

  const bishopmoves = (row, column) => {
    let moves = [];
    for (let i = row + 1, j = column + 1; i < 8 && j < 8; i++, j++) {
      if (refs.current[i][j] != "") break;
      moves.push([i, j]);
    }
    for (let i = row + 1, j = column - 1; i < 8 && j >= 0; i++, j--) {
      if (refs.current[i][j] != "") break;

      moves.push([i, j]);
    }
    for (let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--) {
      if (refs.current[i][j] != "") break;

      moves.push([i, j]);
    }
    for (let i = row - 1, j = column + 1; i >= 0 && j < 8; i--, j++) {
      if (refs.current[i][j] != "") break;
      moves.push([i, j]);
    }
    return moves;
  };

  const rookmoves = (row, column) => {
    let moves = [];
    for (let i = row + 1; i < 8; i++) {
      moves.push([i, column]);
    }
    for (let i = column + 1; i < 8; i++) {
      moves.push([row, i]);
    }
    for (let i = row - 1; i >= 0; i--) {
      moves.push([i, column]);
    }
    for (let i = column - 1; i >= 0; i--) {
      moves.push([row, i]);
    }
    return moves;
  };

  const showMoves = (piece, row, colun) => {};

  return (
    <div>
      {board.map((row, i) => (
        <div className="row">
          {row.map((box, idx) => (
            <div
              className={"box " + ((idx + i) % 2 == 0 ? "white" : "black")}
              onClick={() => possibleMoves(box, i, idx)}
              key={`box${i}${idx}`}
              ref={(el) => {
                refs.current[i] = refs.current[i] ? refs.current[i] : [];
                refs.current[i][idx] = el;
              }}
            >
              {box && <Piece piece={box} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

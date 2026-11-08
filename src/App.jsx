import React, { useState } from "react";
import "./App.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

export default function App() {
  const [squares, setSquares] = useState(
    Array(9).fill(null)
  );

  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);

  const isDraw =
    !winner && squares.every((square) => square !== null);

  function handleClick(index) {
    if (squares[index] || winner) {
      return;
    }

    const newSquares = [...squares];

    newSquares[index] = isXNext ? "X" : "O";

    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  let status;

  if (winner) {
    status = `Победитель: ${winner}`;
  } else if (isDraw) {
    status = "Ничья!";
  } else {
    status = `Ход игрока: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-container">

        <h1>Крестики-нолики</h1>

        <p className="subtitle">
          Играй вместе с другом!
        </p>

        <h2 className="status">{status}</h2>

        <div className="board">
          {squares.map((square, index) => (
            <button
              className={`cell ${square === "X" ? "x" : "o"}`}
              key={index}
              onClick={() => handleClick(index)}
            >
              {square}
            </button>
          ))}
        </div>

        <button className="restart" onClick={restartGame}>
          Начать заново
        </button>

      </div>
    </div>
  );
}

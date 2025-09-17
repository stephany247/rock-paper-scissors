import { type FC } from "react";

interface ResultProps {
  winner: "player" | "house" | "draw" | null;
  onPlayAgain: () => void;
}

const Result: FC<ResultProps> = ({ winner, onPlayAgain }) => {
  if (!winner) return null;

  const getMessage = () => {
    switch (winner) {
      case "player":
        return "You win";
      case "house":
        return "You lose";
      case "draw":
        return "It's a draw!";
    }
  };

  return (
    <div
      className="result col-span-2 row-start-2  md:col-span-1 md:row-span-1 space-y-4 mt-auto md:my-auto flex flex-col items-center z-10"
    >
      <h2 className="text-5xl md:text-6xl text-white text-center">
        {getMessage()}
      </h2>
      <button
        onClick={onPlayAgain}
        className="uppercase bg-white w-56 p-3 rounded-lg hover:text-red-500 transition-colors duration-300 ease-in-out cursor-pointer"
      >
        Play Again
      </button>
    </div>
  );
};

export default Result;

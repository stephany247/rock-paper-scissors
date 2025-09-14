import type { FC } from "react";
import defaultImg from "../assets/images/logo.svg";
import bonusImg from "../assets/images/logo-bonus.svg";

interface ScoreboardProps {
  score: number;
  mode: "default" | "extended";
}

const Scoreboard: FC<ScoreboardProps> = ({ score, mode }) => {
  return (
    <div className="border-3 border-gray-600 rounded-lg p-3 flex justify-between max-h-30 max-w-3xl mx-auto">
      <img src={mode === "default" ? defaultImg : bonusImg} alt="game logo" className="p-2 max-w-2/5" />
      <div className="bg-white rounded py-3 w-2/5 max-w-28 h-auto flex flex-col items-center justify-center">
        <p className="text-lg text-blue-700 uppercase font-semibold">Score</p>
        <h1 className="text-5xl font-bold">{score}</h1>
      </div>
      {/* <h1>Score: {score}</h1> */}
    </div>
  );
};

export default Scoreboard;

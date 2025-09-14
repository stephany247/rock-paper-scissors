import type { FC } from "react";
import Choice from "./Choice";
// import triangleBg from "../assets/images/bg-triangle.svg";
// import pentagonBg from "../assets/images/bg-pentagon.svg";

interface BoardProps {
  mode: "default" | "extended";
  onPick: (choice: string) => void;
}

const Board: FC<BoardProps> = ({ mode, onPick }) => {
  return mode === "default" ? (
    // Triangle layout
    <div
      className="relative w-80 sm:w-92 h-80 sm:h-92 my-24 mx-auto bg-[url(/bg-triangle.svg)] bg-no-repeat bg-center"
    >
      <div className="player-choice absolute -top-6 right-0">
        <Choice type="scissors" onPick={onPick} />
      </div>
      <div className="player-choice absolute -top-6 left-0">
        <Choice type="paper" onPick={onPick} />
      </div>
      <div className="player-choice absolute bottom-8 left-1/2 -translate-x-1/2">
        <Choice type="rock" onPick={onPick} />
      </div>
    </div>
  ) : (
    // Pentagon layout
    <div
      className="relative w-100 h-100 my-24 mx-auto bg-[url(/bg-pentagon.svg)] bg-no-repeat bg-center"
    >
      <div className="player-choice absolute -top-4 left-1/2 -translate-x-1/2">
        <Choice type="scissors" onPick={onPick} extended />
      </div>
      <div className="player-choice absolute top-1/5 -right-4">
        <Choice type="paper" onPick={onPick} extended />
      </div>
      <div className="player-choice absolute top-1/5 -left-4">
        <Choice type="spock" onPick={onPick} extended />
      </div>
      <div className="player-choice absolute bottom-0 right-1/12">
        <Choice type="rock" onPick={onPick} extended />
      </div>
      <div className="player-choice absolute bottom-0 left-1/12">
        <Choice type="lizard" onPick={onPick} extended />
      </div>
    </div>
  );
};

export default Board;

import type { FC } from "react";
import Choice from "./Choice";

interface BoardProps {
  mode: "default" | "extended";
  onPick: (choice: string) => void;
}

const Board: FC<BoardProps> = ({ mode, onPick }) => {
  return mode === "default" ? (
    // Triangle layout
    <div className="grid grid-cols-3 grid-rows-3 w-80 h-80 sm:w-92 sm:h-92 md:w-120 md:h-120 my-24 mx-auto bg-[url(/bg-triangle.svg)] bg-no-repeat bg-center bg-size-[90%]">
      {/* scissors */}
      <div className="flex items-center justify-center col-start-3 row-start-1">
        <Choice type="scissors" onPick={onPick} />
      </div>

      {/* paper */}
      <div className="flex items-center justify-center col-start-1 row-start-1">
        <Choice type="paper" onPick={onPick} />
      </div>

      {/* rock */}
      <div className="flex items-center justify-center col-start-2 row-start-3">
        <Choice type="rock" onPick={onPick} />
      </div>
    </div>
  ) : (
    // Pentagon layout
    <div className="relative w-78 h-78 sm:w-100 sm:h-100 my-24 mx-auto bg-[url(/bg-pentagon.svg)] bg-no-repeat bg-center">
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

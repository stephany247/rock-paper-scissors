import type { FC } from "react";
import rockImg from "../assets/images/icon-rock.svg";
import paperImg from "../assets/images/icon-paper.svg";
import scissorsImg from "../assets/images/icon-scissors.svg";
import lizardImg from "../assets/images/icon-lizard.svg";
import spockImg from "../assets/images/icon-spock.svg";

interface ChoiceProps {
  type: "rock" | "paper" | "scissors" | "lizard" | "spock";
  onPick?: (choice: string) => void;
  extended?: boolean;
}

const images = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
  lizard: lizardImg,
  spock: spockImg,
};

const Choice: FC<ChoiceProps> = ({ type, onPick, extended }) => {
  const sizeClasses = extended
    ? "w-28 h-28 sm:w-32 sm:h-32 border-12" // smaller for bonus mode
    : `${onPick ? "w-full h-full" : "w-34 h-34 sm:w-40 sm:h-40 lg:w-60 lg:h-60"}  border-16 lg:border-24`; // default mode

  return (
    <button
      className={`${sizeClasses} rounded-full flex items-center justify-center bg-white ${onPick ? "cursor-pointer inset-shadow-md" : "inner-shadow-sm"} ${
        type === "rock"
          ? "border-red-600 shadow-red"
          : type === "paper"
          ? "border-blue-500 shadow-blue"
          : type === "scissors"
          ? "border-gold-500 shadow-gold"
          : type === "spock"
          ? "border-light-blue-400 shadow-light-blue"
          : "border-purple-600 shadow-purple"
      }`}
      onClick={() => onPick?.(type)}
      data-flip-id={type}
    //   title={type}
    >
      <img src={images[type]} alt={type} className={`${extended ? "w-12 h-12":"w-1/2 h-1/2"}`} />
    </button>
  );
};

export default Choice;

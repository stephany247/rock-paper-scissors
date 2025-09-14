import { type FC, useEffect, useRef } from "react";
// import gsap from "gsap";

interface ResultProps {
  winner: "player" | "house" | "draw" | null;
  onPlayAgain: () => void;
}

const Result: FC<ResultProps> = ({ winner, onPlayAgain }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     if (winner && resultRef.current) {
  //       // 🔥 Animate result popping in
  //       gsap.from(resultRef.current, {
  //         opacity: 0,
  //         scale: 0.8,
  //         duration: 0.6,
  //         ease: "back.out(1.7)"
  //       });
  //     }
  //   }, [winner]);

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
    <div ref={resultRef} className="space-y-4 my-12  flex flex-col items-center">
      <h2 className="text-5xl text-white">{getMessage()}</h2>
      <button
        onClick={onPlayAgain}
        className="uppercase bg-white w-60 p-4 rounded-lg hover:text-red-500 transition-colors duration-300 ease-in-out"
      >
        Play Again
      </button>
    </div>
  );
};

export default Result;

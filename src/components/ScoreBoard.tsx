import { useEffect, useState, type FC } from "react";
import defaultImg from "../assets/images/logo.svg";
import bonusImg from "../assets/images/logo-bonus.svg";
import gsap from "gsap";
import reloadIcon from "../assets/images/tabler--reload.png";

interface ScoreboardProps {
  score: number;
  mode: "default" | "extended";
  onReset: () => void;
}

const Scoreboard: FC<ScoreboardProps> = ({ score, mode, onReset }) => {
  const [prevScore, setPrevScore] = useState(score);
  const [displayScore, setDisplayScore] = useState(score);
  const [showIncrement, setShowIncrement] = useState(false);

  useEffect(() => {
    if (score > prevScore) {
      setShowIncrement(true);

      // animate +1 floating up
      // gsap.fromTo(
      //   ".score-increment",
      //   { y: 0, opacity: 1, scale: 1.8 },
      //   {
      //     y: -40,
      //     opacity: 0,
      //     scale: 0,
      //     duration: 0.6,
      //     ease: "power2.inOut",
      //     onComplete: () => setShowIncrement(false),
      //   }
      // );

      // animate new score bouncing in
      // gsap.fromTo(
      //   ".score-value",
      //   { scale: 1.6, opacity: 0.5 },
      //   { scale: 1, opacity: 1, delay: 0.1, duration: 0.6, ease: "bounce.inOut" }
      // );

      const tl = gsap.timeline();

      tl.fromTo(
        ".score-increment",
        { y: 0, opacity: 0, scale: 0.8, transformOrigin: "center center" },
        {
          y: -30,
          opacity: 1,
          scale: 1.8,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(".score-increment", {
              scale: 1, // pop back in
              opacity: 0, // fade away
              duration: 0.3,
              ease: "back.in(2)",
              onComplete: () => setShowIncrement(false),
            });
          },
        }
      );

      tl.fromTo(
        ".score-value",
        { scale: 1, opacity: 1, transformOrigin: "center center" },
        {
          scale: 1.6,
          opacity: 0,
          duration: 0.3,
          ease: "back.in(2)",
          onComplete: () => {
            setDisplayScore(score); // update AFTER old animates out
            gsap.fromTo(
              ".score-value",
              { scale: 1.6, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
            );
          },
        },
        "+=0.1" // start a bit before the +1 finishes
      );
    }

    setPrevScore(score);
  }, [score]);

  useEffect(() => {
  // score changed
  gsap.fromTo(
    ".score-value",
    { scale: 1.4, opacity: 0.6 },
    { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
  );
}, [score]);


  return (
    <header className="border-3 border-gray-600 rounded-lg p-3 flex justify-between max-h-30 max-w-3xl w-full mx-auto">
      <img
        src={mode === "default" ? defaultImg : bonusImg}
        alt="game logo"
        className="p-2 max-w-2/5"
      />
      <div className="bg-white rounded py-3 w-2/5 max-w-28 h-auto flex flex-col items-center justify-center">
        <p className="text-lg text-blue-700 uppercase font-semibold">Score</p>
        <div className="relative w-full text-center">
          <span className="score-value inline-block text-5xl font-bold">
            {displayScore}
          </span>
          {showIncrement && (
            <span className="score-increment inline-block absolute -right-2 top-1 -translate-x-1/2 -translate-y-1/2 font-bold text-gray-500 text-3xl">
              +1
            </span>
          )}
          {/* 👇 reset button */}
          {score > 0 && (
            <button
              onClick={() => {
                onReset();
                setDisplayScore(0);
                setPrevScore(0);
                setShowIncrement(false);
              }}
              className="mt-2 p-2 bg-gray-300/80 rounded-full hover:bg-gray-300 absolute -bottom-1 -right-0 cursor-pointer transition-all duration-200 hover:scale-110 hover:rotate-90"
            >
              {/* Reset */}
              <img src={reloadIcon} alt="reload icon" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Scoreboard;

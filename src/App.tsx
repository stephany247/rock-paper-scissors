import { useEffect, useState } from "react";
import Scoreboard from "./components/ScoreBoard";
import RulesModal from "./components/RulesModal";
import Choice from "./components/Choice";
import Result from "./components/Result";
import Board from "./components/Board";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [mode, setMode] = useState<"default" | "extended">("default");
  const [score, setScore] = useState(0);
  const [winner, setWinner] = useState<"player" | "house" | "draw" | null>(
    null
  );
  const [rulesOpen, setRulesOpen] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [houseChoice, setHouseChoice] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const choices =
    mode === "default"
      ? ["rock", "paper", "scissors"]
      : ["rock", "paper", "scissors", "lizard", "spock"];

  const handlePick = (choice: string) => {
    setPlayerChoice(choice);
    setStep(2);

    const house = choices[Math.floor(Math.random() * choices.length)];

    const tl = gsap.timeline();

    // after 1s, reveal house
    tl.to(
      {},
      {
        duration: 1,
        onComplete: () => {
          setHouseChoice(house);
          setStep(3);
        },
      }
    );

    // after another 1s, decide winner
    tl.to(
      {},
      {
        duration: 1,
        onComplete: () => {
          if (choice === house) {
            setWinner("draw");
          } else {
            const rules: Record<string, string[]> = {
              rock: ["scissors", "lizard"],
              paper: ["rock", "spock"],
              scissors: ["paper", "lizard"],
              lizard: ["spock", "paper"],
              spock: ["scissors", "rock"],
            };

            if (rules[choice].includes(house)) {
              setWinner("player");
              setScore((prev) => prev + 1);
            } else {
              setWinner("house");
            }
          }
          setStep(4);
        },
      }
    );
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setHouseChoice(null);
    setWinner(null);
    setStep(1);
  };

  useEffect(() => {
    if (step === 2 && playerChoice) {
      gsap.fromTo(
        ".player-choice",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [step, playerChoice]);

  useEffect(() => {
    if (step === 3 && houseChoice) {
      const tl = gsap.timeline();
      // const isMobile = window.innerWidth < 768;

      // House scales/fades in
      tl.fromTo(
        ".house-choice",
        { opacity: 0.4, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );

      // Fade in Result (text block with "You Win/You Lose")
      tl.fromTo(
        ".result",
        { opacity: 0, scale: 0.9, y: 80 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power1.out" }
      );
      // Slide circles in with ease
      tl.to(
        [".house-choice", ".player-choice"],
        {
          x: (i) => (i === 0 ? 20 : -20), // house +10, player -10

          duration: 0.3,
          ease: "power1.inOut",
        },
        "<"
      );

      // Slide texts in without ease (linear)
      tl.to(
        [".house-choice-block h2", ".player-choice-block h2"],
        {
          x: (i) => (i === 0 ? 20 : -20),
          // x: (i) => {
          //   if (isMobile) {
          //     // mobile
          //     return i === 0 ? 10 : -10;
          //   } else {
          //     // desktop
          //     return i === 0 ? 20 : -20;
          //   }
          // },
          duration: 0.3,
          ease: "none",
        },
        "<" // run at same time as circles
      );
    }
  }, [step, houseChoice]);

  useEffect(() => {
    if (step === 4 && winner) {
      gsap.fromTo(
        ".ring-a",
        { scale: 0.8, opacity: 0 },
        { scale: 1.4, opacity: 0.2, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        ".ring-b",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1.8,
          opacity: 0.1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ".ring-c",
        { scale: 0.8, opacity: 0 },
        {
          scale: 2.2,
          opacity: 0.05,
          duration: 1,
          delay: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [step, winner]);

  return (
    <main className="overflow-x-hidden">
      <Analytics />
      <section className="min-h-screen flex flex-col items-center p-6 mx-auto">
        <Scoreboard score={score} mode={mode} onReset={() => setScore(0)} />
        {step === 1 && <Board mode={mode} onPick={handlePick} />}
        {step >= 2 && (
          <div className="m-auto grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-3 items-start max-w-4xl w-full mx-auto">
            {/* Player pick */}
            <div className="player-choice-block flex flex-col md:flex-col-reverse items-center justify-center gap-8 md:gap-10">
              <div className="player-choice relative">
                {playerChoice && (
                  <>
                    <Choice type={playerChoice as any} />
                    {winner === "player" && (
                      <div className="absolute inset-0 flex items-center justify-center -z-20">
                        <span className="ring-element ring-a opacity-40" />
                        <span className="ring-element ring-b opacity-25" />
                        <span className="ring-element ring-c opacity-15" />
                      </div>
                    )}
                  </>
                )}
              </div>
              <h2 className="who-picked">You Picked</h2>
              {/* <h2 className="block md:hidden who-picked">You Picked</h2> */}
            </div>
            {step === 4 && <Result winner={winner} onPlayAgain={resetGame} />}

            {/* House pick */}
            <div className="house-choice-block col-start-2 md:col-start-3 flex flex-col md:flex-col-reverse items-center justify-center gap-8 md:gap-10">
              {step >= 3 ? (
                <div className="house-choice relative">
                  {houseChoice && (
                    <>
                      <Choice type={houseChoice as any} />
                      {winner === "house" && (
                        <div className="absolute inset-0 flex items-center justify-center -z-20">
                          <span className="ring-element ring-a opacity-40" />
                          <span className="ring-element ring-b opacity-25" />
                          <span className="ring-element ring-c opacity-15" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="w-34 h-34 sm:w-40 sm:h-40 lg:w-60 lg:h-60 bg-darker-blue/20 rounded-full" /> // placeholder before reveal
              )}
              <h2 className="who-picked text-nowrap">The House Picked</h2>
            </div>
          </div>
        )}

        {/* Rules button */}
        <div className="mt-auto flex justify-between w-full">
          <button
            className="border-2 border-white/60 text-white/80 hover:text-white hover:border-white hover:scale-105 transition-all duration-300 ease-in-out w-40 md:w-44 py-2 rounded-xl uppercase cursor-pointer"
            onClick={() => {
              setMode(mode === "default" ? "extended" : "default");
              resetGame();
            }}
            title={`Switch to ${
              mode === "default" ? "extended" : "default"
            } mode`}
          >
            {mode === "default" ? "Extended" : "Default"} Mode
          </button>

          <button
            className="border-2 border-white/60 hover:text-white hover:border-white hover:scale-105 transition-all duration-300 ease-in-out w-36 py-2 rounded-xl text-white/80 uppercase tracking-widest cursor-pointer"
            onClick={() => setRulesOpen(true)}
            title="Rules of the game"
          >
            Rules
          </button>
        </div>

        {/* Rules Modal */}
        <RulesModal
          open={rulesOpen}
          mode={mode}
          onClose={() => setRulesOpen(false)}
        />
      </section>
    </main>
  );
}

export default App;

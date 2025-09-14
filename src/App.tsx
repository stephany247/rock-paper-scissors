import { useEffect, useState } from "react";
import "./App.css";
import Scoreboard from "./components/ScoreBoard";
import RulesModal from "./components/RulesModal";
import Choice from "./components/Choice";
import Result from "./components/Result";
import Board from "./components/Board";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

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
    // Capture current position of the choice element
    // const state = Flip.getState(".player-choice");
      const state = Flip.getState(`[data-flip-id="${choice}"]`);

    setStep(2); // go to step 2 (player picked)

    // Animate from previous to new position
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 1.8,
        ease: "power3.inOut",
        scale: true,
      });
    });

    const house = choices[Math.floor(Math.random() * choices.length)];

    // after 1 second → show house pick
    setTimeout(() => {
      setHouseChoice(house);
      setStep(3);

      // after another 1 second → calculate winner
      setTimeout(() => {
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

        setStep(4); // show result
      }, 1000);
    }, 1000);
  };

  // const resetGame = () => {
  //   setWinner(null);
  // };

  const resetGame = () => {
    setPlayerChoice(null);
    setHouseChoice(null);
    setWinner(null);
    setStep(1);
  };

  // let score = 12;

  // useEffect(() => {
  //   if (step === 2 && playerChoice) {
  //     gsap.fromTo(
  //       ".player-choice",
  //       { scale: 0, opacity: 0 },
  //       { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
  //     );
  //   }
  // }, [step, playerChoice]);

  // useEffect(() => {
  //   if (step === 2 && playerChoice) {
  //     gsap.fromTo(
  //       ".player-choice",
  //       { x: -300, y: 200, scale: 1, opacity: 0 }, // starting offset (adjust these)
  //       { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  //     );
  //   }
  // }, [step, playerChoice]);

  return (
    <>
      <Scoreboard score={score} mode={mode} />

      {/* {!winner && (
        <div className="choices">
          {choices.map((choice) => (
            <Choice key={choice} type={choice as any} onPick={handlePick} />
          ))}
        </div>
      )} */}

      {step === 1 && <Board mode={mode} onPick={handlePick} />}
      {step >= 2 && (
        <div className="flex justify-between items-center mt-10 max-w-3xl mx-auto">
          {/* Player pick */}
          <div className="flex flex-col items-center justify-center gap-8">
            <h2 className="hidden md:block who-picked">You Picked</h2>
            <div className="player-choice">
              {playerChoice && <Choice type={playerChoice as any} />}
            </div>
            <h2 className="block md:hidden who-picked">You Picked</h2>
          </div>

          {/* House pick */}
          <div className="house-choice flex flex-col items-center justify-center gap-8">
            <h2 className="hidden md:block who-picked">The House Picked</h2>
            {step >= 3 ? (
              <Choice type={houseChoice as any} />
            ) : (
              <div className="w-32 h-32 bg-black/20 rounded-full" /> // placeholder before reveal
            )}
            <h2 className="block md:hidden who-picked">The House Picked</h2>
          </div>
        </div>
      )}

      {step === 4 && <Result winner={winner} onPlayAgain={resetGame} />}

      {/* Rules button */}
      {step === 1 && (
        <div className="mt-6 flex justify-between">
          <button
            className="bg-white w-40 py-2 rounded-xl uppercase"
            onClick={() => setMode(mode === "default" ? "extended" : "default")}
            title={`Switch to ${
              mode === "default" ? "extended" : "default"
            } mode`}
          >
            {mode === "default" ? "Extended" : "Default"} Mode
          </button>

          <button
            className="border-2 border-white/60 w-36 py-2 rounded-xl text-white/80 uppercase tracking-widest"
            onClick={() => setRulesOpen(true)}
            title="Rules of the game"
          >
            Rules
          </button>
        </div>
      )}

      {/* Rules Modal */}
      <RulesModal
        open={rulesOpen}
        mode={mode}
        onClose={() => setRulesOpen(false)}
      />
    </>
  );
}

export default App;

import { useRef, useEffect, type FC } from "react";
// import gsap from "gsap";
import rulesDefault from "../assets/images/image-rules.svg";
import rulesBonus from "../assets/images/image-rules-bonus.svg";
import iconClose from "../assets/images/icon-close.svg";

interface RulesModalProps {
  open: boolean;
  mode: "default" | "extended";
  onClose: () => void;
}

const RulesModal: FC<RulesModalProps> = ({ open, mode, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     if (open && modalRef.current) {
  //       gsap.fromTo(
  //         modalRef.current,
  //         { opacity: 0, scale: 0.8 },
  //         { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
  //       );
  //     }
  //   }, [open]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // cleanup when modal unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-white sm:bg-black/50 py-12 flex flex-col justify-between sm:flex-row items-center sm:justify-center"
      onClick={onClose} // click backdrop closes
    >
      <h2 className="sm:hidden text-2xl font-bold uppercase">Rules</h2>

      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click
        className="bg-white p-6 rounded-lg text-center relative sm:max-w-sm w-full space-y-6"
      >
        <div className="hidden sm:flex items-center justify-between">
          <h2 className="text-2xl font-bold uppercase">Rules</h2>
          <button
            // className="absolute top-2 right-2 text-2xl font-bold"
            className="cursor-pointer"
            onClick={onClose}
          >
            <img src={iconClose} alt="close modal" className="size-4" />
          </button>
        </div>
        <img
          src={mode === "default" ? rulesDefault : rulesBonus}
          alt="Rules"
          className={`mx-auto mb-1 ${mode === "default" ? "mb-1" : "mb-4"}`}
        />
      </div>
      <button
        // className="absolute top-2 right-2 text-2xl font-bold"
        className="cursor-pointer"
        onClick={onClose}
      >
        <img src={iconClose} alt="close modal" className="size-4" />
      </button>
    </div>
  );
};

export default RulesModal;

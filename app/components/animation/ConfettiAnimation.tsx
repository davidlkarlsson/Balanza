import Confetti from "react-confetti";
import styles from "~/components/animation/ConfettiAnimation.module.css";

type ConfettiAnimationProps = {
  numberOfPieces?: number; // ? gör den valfri
};

const ConfettiAnimation = ({ numberOfPieces }: ConfettiAnimationProps) => {
  return (
    <div className={styles.confettiContainer}>
      <Confetti numberOfPieces={numberOfPieces} />
    </div>
  );
};

export default ConfettiAnimation;

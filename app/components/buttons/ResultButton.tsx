import { CustomButton } from "./CustomButton";
import styles from "~/components/buttons/ResultButton.module.css";
import LockWhite from "../../images/lockWhite.svg";

interface ResultButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function ResultButton({ onClick, disabled = false }: ResultButtonProps) {
  const todayIndex = new Date().getDay(); // 0 = Söndag, 6 = Lördag
  const isWeekend = todayIndex === 0 || todayIndex >= 5; // Kolla om det är fredag, lördag eller söndag

  return (
    <div className={styles.resultContainer}>
      <CustomButton
        className={styles.resultButton}
        buttonText="Resultat"
        onClick={onClick}
        icon={LockWhite}
        disabled={disabled} // Inaktivera knappen om det inte är fredag, lördag eller söndag
      />
    </div>
  );
}

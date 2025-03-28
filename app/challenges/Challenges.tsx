import { MultiColorButtons } from "~/components/buttons/MultiColorButtons";
import styles from "~/challenges/Challenges.module.css";

export function Challenges() {
  return (
    <main>
      <div className={styles.challengesContainer}>
        <h2>No spend-week</h2>
        <p>
          Har du spenderat något denna vecka?
          <br /> 🟢 = Inte spenderat
          <br /> 🔴 = Spenderat
        </p>
      </div>
      
        <MultiColorButtons />
      
    </main>
  );
}

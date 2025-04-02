import { MultiColorButtons } from "~/components/buttons/MultiColorButtons";
import styles from "~/challenges/Challenges.module.css";
import { StickyButton } from "~/components/buttons/StickyButton";
import { useState } from "react";
import Modal from "~/components/modal/modal";
import { ResultButton } from "~/components/buttons/ResultButton";
import ChallengeSelector from "~/components/cards/ChallengeSelector";

export function Challenges() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  return (
    <main>
      <div className={styles.challengesContainer}>
        <h2>No spend-week</h2>

        {/* Visa vald utmaning om en finns, annars visa ChallengeSelector */}
        {selectedChallenge ? (
          <div className={styles.weekChallenge}>
            <h3>Veckans utmaning 🌟</h3>
            <p>{selectedChallenge}</p>
            <button
              onClick={() => setSelectedChallenge(null)}
              className={styles.changeChallengeButton}
            >
              Välj en annan utmaning 🔄
            </button>
          </div>
        ) : (
          <ChallengeSelector onSelectChallenge={setSelectedChallenge} />
        )}
      </div>

      <MultiColorButtons />
      <ResultButton />

      <StickyButton
        buttonText={"?"}
        onClick={() => setIsModalOpen(true)}
        style={{ backgroundColor: "white" }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hur funkar det? 🤔</h2>
        <p>
          För varje dag låses en ny knapp upp och du får två val - antingen har
          du spenderat pengar eller inte.
          <br />
          <br />
          <li>
            För icke spenderat trycker du en gång på dagens knapp så att den
            blir grön 🟢
          </li>
          <li>Vid två tryck blir knappen röd 🔴</li>
          <br />
          <br />
          När du gjort hela veckan får du resultatet.
          <br />
          <br />
          Du kan sedan gå in i resultat och se din utveckling!
        </p>
      </Modal>
    </main>
  );
}

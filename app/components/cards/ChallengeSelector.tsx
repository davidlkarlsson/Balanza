import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./ChallengeSelector.module.css";

interface ChallengeSelectorProps {
  onSelectChallenge: (challenge: string) => void;
}

export default function ChallengeSelector({ onSelectChallenge }: ChallengeSelectorProps) {
  const [challenges, setChallenges] = useState<string[]>([
    "Ingen kaffe ute på en vecka",
    "Använd endast kontanter",
    "Köp inget onödigt i 7 dagar"
  ]);
  const [newChallenge, setNewChallenge] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const addChallenge = () => {
    if (newChallenge.trim() !== "") {
      setChallenges([...challenges, newChallenge]);
      setNewChallenge("");
      setCurrentIndex(challenges.length); // Gå till den nya utmaningen
    }
  };

  const removeChallenge = (index: number) => {
    if (window.confirm("Är du säker på att du vill ta bort denna utmaning?")) {
      const updatedChallenges = challenges.filter((_, i) => i !== index);
      setChallenges(updatedChallenges);
      setCurrentIndex(0);
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingText(challenges[index]);
  };

  const saveEdit = (index: number) => {
    const updatedChallenges = [...challenges];
    updatedChallenges[index] = editingText;
    setChallenges(updatedChallenges);
    setEditingIndex(null);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % challenges.length),
    onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length)
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Välj en utmaning</h2>
      <div {...handlers} className={styles.challengeCard}>
        {editingIndex === currentIndex ? (
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className={styles.input}
          />
        ) : (
          <p className={styles.challengeText}>{challenges[currentIndex]}</p>
        )}
        <div className={styles.buttonGroup}>
          {editingIndex === currentIndex ? (
            <button onClick={() => saveEdit(currentIndex)} className={styles.saveButton}>Spara</button>
          ) : (
            <button onClick={() => startEditing(currentIndex)} className={styles.editButton}>Redigera</button>
          )}
          <button onClick={() => removeChallenge(currentIndex)} className={styles.deleteButton}>Ta bort</button>
        </div>
      </div>
      <div className={styles.navigation}>
        <button onClick={() => setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length)}>⬅️</button>
        <span>{currentIndex + 1} / {challenges.length}</span>
        <button onClick={() => setCurrentIndex((prev) => (prev + 1) % challenges.length)}>➡️</button>
      </div>
      <button onClick={() => onSelectChallenge(challenges[currentIndex])} className={styles.selectButton}>
        Välj denna utmaning ✅
      </button>
      <input
        type="text"
        value={newChallenge}
        onChange={(e) => setNewChallenge(e.target.value)}
        className={styles.input}
        placeholder="Skriv din egen utmaning"
      />
      <button onClick={addChallenge} className={styles.addButton}>Lägg till utmaning</button>
    </div>
  );
}

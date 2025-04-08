import { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";
import styles from "~/components/buttons/MultiColorButtons.module.css";
import LockNavy from "../../images/lockNavy.svg";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "../utilities/localStorageUtils";

interface Props {
  weekDone: boolean;
  resetTrigger: number;
};

const weekDays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

export function MultiColorButtons( {weekDone, resetTrigger}: Props ) {
  const [colors, setColors] = useState<string[]>([]);

  const todayIndex = new Date().getDay(); // 0 = Söndag, 6 = Lördag

  useEffect(() => {
    // Hämta lagrade färger från localStorage
    const storedColors = loadFromLocalStorage("weekColors");
  
    // Kontrollera om antalet lagrade dagar inte stämmer överens med aktuella dagar
    if (storedColors && storedColors.length !== weekDays.length) {
      // Om de inte matchar, ta bort den gamla datan
      removeFromLocalStorage("weekColors");
  
      // Skapa en ny array med färger för alla dagar i weekDays
      const newColors = Array(weekDays.length).fill("#fffdf6");
      setColors(newColors);
      saveToLocalStorage("weekColors", newColors);
    } else if (storedColors) {
      // Annars, om datan är korrekt, sätt färgerna från localStorage
      setColors(storedColors);
    } else {
      // Om inget finns lagrat, skapa en ny array med standardfärger
      const newColors = Array(weekDays.length).fill("#fffdf6");
      setColors(newColors);
      saveToLocalStorage("weekColors", newColors);
    }
  }, [resetTrigger, weekDays.length]);  // Lägg till weekDays.length som dependency
  

  
  useEffect(() => {
    if (colors.length > 0) {
      saveToLocalStorage("weekColors", colors);
    }
  }, [colors]);
  

  function changeColor(index: number) {
    
    setColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] =
        newColors[index] === "#fffdf6"
          ? "#c5fcc3"
          : newColors[index] === "#c5fcc3"
          ? "#ffa2a2"
          : "#fffdf6";

      return newColors;
    });
  }

  return (
    <div className={styles.multiColorContainer}>
      {weekDays.map((day, index) => {
        const isFutureDay = index +1 > todayIndex;
        const isDisabled = weekDone //|| isFutureDay;

        return (
          <CustomButton
            key={day}
            buttonText={day}
            onClick={() => changeColor(index)}
            style={{ backgroundColor: colors[index] }}
            disabled={isDisabled}
            icon={LockNavy}
          />
        );
      })}
    </div>
  );
}

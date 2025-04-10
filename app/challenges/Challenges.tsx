import { useEffect, useState } from "react"
import { MultiColorButtons } from "~/components/buttons/MultiColorButtons"
import styles from "~/challenges/Challenges.module.css"
import { StickyButton } from "~/components/buttons/StickyButton"
import Modal from "~/components/modal/modal"
import { ResultButton } from "~/components/buttons/ResultButton"
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "~/components/utilities/localStorageUtils"
import { getWeekNumber } from "~/components/utilities/dateUtils"
import type { HistoryObject } from "~/types/HistoryObject"
import ChaoticStackAnimation from "~/components/animation/ChaoticStackAnimation"
import ConfettiAnimation from "~/components/animation/ConfettiAnimation"

export function Challenges() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<
    "info" | "result" | "warning" | "confirmation"
  >("info")
  const [completedDays, setCompletedDays] = useState<number>(0)
  const [totalDays, setTotalDays] = useState<number>(0)
  const [historyList, setHistoryList] = useState<HistoryObject[]>([
    {
      week: 0,
      daysCompleted: 0,
      daysTotal: 0,
    },
  ])

  const [weekDone, setWeekDone] = useState<boolean>(
    loadFromLocalStorage("weekDone") || false
  )

  const [resetTrigger, setResetTrigger] = useState(0)
  const [weekColors, setWeekColors] = useState<string[]>([])

  const todayIndex = new Date().getDay()
  const weekNumber = getWeekNumber()

  useEffect(() => {
    // Återställ vecka varje måndag
    if (todayIndex === 1) {
      setWeekDone(false)
      saveToLocalStorage("weekDone", false)
    }
  }, [todayIndex])

  const handleOpenModal = (
    content: "info" | "result" | "warning" | "confirmation",
    completed: number,
    total: number
  ) => {
    setModalContent(content)
    setIsModalOpen(true)
    setCompletedDays(completed)
    setTotalDays(total)
  }

  const checkAllDaysCompleted = () => {
    const colors = loadFromLocalStorage("weekColors") || []
    const allDaysCompleted = colors.every(
      (color: string) => color === "#c5fcc3" || color === "#ffa2a2"
    )
    return allDaysCompleted
  }

  const handleResultButtonClick = () => {
    const colors = loadFromLocalStorage("weekColors") || []
    // Räkna antalet gröna (icke spenderade) eller röda (spenderade) dagar
    const completed = colors.filter(
      (color: string) => color === "#c5fcc3"
    ).length
    setCompletedDays(completed)
    const total = colors.length
    setTotalDays(total)
    if (!checkAllDaysCompleted()) {
      // Om alla dagar inte är markerade, visa varning
      handleOpenModal("warning", completed, total)
    } else {
      // Om alla dagar är markerade, visa bekräftelse
      handleOpenModal("confirmation", completed, total)
    }
  }

  const saveHistory = () => {
    const weeklyHistory: HistoryObject = {
      week: getWeekNumber(),
      daysCompleted: completedDays,
      daysTotal: totalDays,
    }

    // Hämta tidigare historik
    const existingHistory: HistoryObject[] =
      loadFromLocalStorage("history") || []

    // Lägg till ny vecka i historiken
    const updatedHistoryList = [...existingHistory, weeklyHistory]

    // Uppdatera state + spara i localStorage
    setHistoryList(updatedHistoryList)
    saveToLocalStorage("history", updatedHistoryList)

    // ✅ Lås veckan efter resultat
    //saveToLocalStorage("weekDone", true);
    // setWeekDone(true);

    // ✅ Hämta weekColors innan de tas bort
    const colors = loadFromLocalStorage("weekColors") || []
    setWeekColors(colors) // Spara weekColors till state

    // 👉 Rensa veckan om du vill börja på ny sen
    removeFromLocalStorage("weekColors")

    // ✅ Rensa även knapparna direkt i state
    setResetTrigger((prev) => prev + 1)
  }

  const figmaPositions = [
    { x: 0, y: 0, rotate: 0 }, // dag 1
    { x: -5, y: -32, rotate: 0 }, // dag 2
    { x: 0, y: -64, rotate: 0 }, // dag 3
    { x: -5, y: -96, rotate: 0 }, // dag 4
    { x: 5, y: -130, rotate: 15 }, // dag 5
  ]

  return (
    <div className={styles.challengesContainer}>
      <h4>v.{weekNumber}</h4>
      <h2>
        No Spend Week
        <StickyButton
          buttonText={"?"}
          onClick={() => handleOpenModal("info", 0, 0)}
        />
      </h2>

      <MultiColorButtons weekDone={weekDone} resetTrigger={resetTrigger} />
      <ResultButton onClick={handleResultButtonClick} disabled={weekDone} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent === "info" && (
          <div>
            <h2>Hur går det till? 🤔</h2>
            <p>Varje dag får du en ny chans att hålla dig till utmaningen:</p>
            <p className={styles.bold}>1 tryck 🟢</p>
            <p className={styles.italic}>
              Du klarade dagen utan att köpa något onödigt - snyggt jobbat!
            </p>
            <p className={styles.bold}>2 tryck 🔴</p>
            <p className={styles.italic}>
              Du råkade spendera... sånt som händer!
            </p>
            <p>När du klickat i alla dagar kan du hämta resultatet!</p>
          </div>
        )}
        {modalContent === "warning" && (
          <div>
            <h2>Vänligen markera alla dagar först! ⚠️</h2>
            <p>
              För att kunna visa ditt resultat måste alla dagar vara markerade
              som 'avklarade' eller 'inte avklarade'.
            </p>
            <button
              className={styles.confirmButton}
              onClick={() => setIsModalOpen(false)}
            >
              Gå tillbaka
            </button>
          </div>
        )}
        {modalContent === "confirmation" && (
          <div>
            <h2>Är du säker på att du är klar? ✅</h2>
            <p>
              När du klickar på 'Ja' avslutar du denna veckas utmaning och har
              inte möjlighet att ändra dina val.
            </p>
            <div className={styles.confirmButtonContainer}>
              <button
                className={styles.confirmButton}
                onClick={() => {
                  saveHistory()

                  // 👉 Visa resultat
                  handleOpenModal("result", completedDays, totalDays)
                }}
              >
                Ja
              </button>

              <button
                className={styles.confirmButton}
                onClick={() => setIsModalOpen(false)}
              >
                Nej
              </button>
            </div>
          </div>
        )}
        {modalContent === "result" && (
          <div className={styles.resultContainer}>
            <h2>Ditt resultat 📊</h2>
            {completedDays === 0 ? (
              <p>Bättre lycka nästa gång! 😞</p>
            ) : (
              <>
                <ConfettiAnimation numberOfPieces={800} />
                <p>
                  Du klarade {completedDays} av {totalDays} dagar, bra jobbat!
                </p>
                <ChaoticStackAnimation colors={weekColors} />
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

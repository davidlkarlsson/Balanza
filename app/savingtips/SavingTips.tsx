import { useEffect, useState } from "react"
import type { SavingTip } from "types/SavingTip"
import { CustomCard } from "~/components/cards/CustomCard"
import styles from "./SavingTips.module.css"
import { getWeekNumber } from "~/components/utilities/dateUtils"

export function SavingTips() {
  const [tipList, setTipList] = useState<SavingTip[]>([])
  const [weekNumber, setWeekNumber] = useState<number>(0)
  const [tipIndex, setTipIndex] = useState<number>(0)

  // ✅ Hämta data + sätt vecka
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(
          "https://balanza-savingtips-api.onrender.com/api/savingtips"
        )
        const tips: SavingTip[] = await result.json()
        setTipList(tips)
      } catch (error) {
        console.error("Fel vid hämtning:", error)
      }
    }

    setWeekNumber(getWeekNumber())
    fetchData()
  }, [])

  // ✅ Räkna ut rätt tips när både vecka och data finns
  useEffect(() => {
    if (tipList.length === 0 || weekNumber === 0) return

    const today = new Date()
    const weekday = today.getDay() // 0-6 (söndag till lördag)
    const isEvenWeek = weekNumber % 2 === 0

    let index = isEvenWeek ? weekday + 7 : weekday

    // ✅ Om index > antal tips, börja om
    if (index >= tipList.length) {
      index = index % tipList.length
    }

    setTipIndex(index)
  }, [weekNumber, tipList])

  return (
    <div className={styles.savingTipsContainer}>
      {tipList.length > 0 ? (
        <CustomCard
          title={tipList[tipIndex].title}
          description={tipList[tipIndex].description}
          id={tipList[tipIndex].id}
        />
      ) : (
        <CustomCard title="Laddar tips..." description="" id={0} />
      )}
    </div>
  )
}

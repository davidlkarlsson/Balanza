import { useEffect, useState } from "react"
import type { SavingTip } from "types/SavingTip"
import { CustomCard } from "~/components/cards/CustomCard"
import styles from "./SavingTips.module.css"
import { getWeekNumber } from "~/components/utilities/dateUtils"

export function SavingTips() {
  const [tipList, setTipList] = useState<SavingTip[]>([
    {
      id: 0,
      title: "",
      description: "",
    },
  ])

  const [weekNumber, setWeekNumber] = useState<number>(0)
  const [tipIndex, setTipIndex] = useState<number>(0)

  function getTodaysTip(): number {
    setWeekNumber(getWeekNumber)
    const today = new Date()
    const weekday = today.getDay() // ger ett nummer 0-6 beroende på vilken veckodag det är, 0 = söndag, 1 = måndag osv

    const isEvenWeek = weekNumber % 2 === 0
    return isEvenWeek ? weekday : weekday + 7
  }

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

    fetchData()

    setTipIndex(getTodaysTip())
  }, [])

  return (
    <div className={styles.savingTipsContainer}>
      {tipList.length > 1 ? (
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

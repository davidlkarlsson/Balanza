import { CustomCard } from "~/components/cards/CustomCard"
import { loadFromLocalStorage } from "~/components/utilities/localStorageUtils"
import styles from "./History.module.css"

const history = loadFromLocalStorage("history") || []

console.log(history)

export function History() {
  return (
    <div className={styles.container}>
      <CustomCard id={0} title="Historik" description={""} />
    </div>
  )
}

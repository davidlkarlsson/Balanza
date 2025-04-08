import styles from "~/components/buttons/StickyButton.module.css"
import React from "react"

interface StickyButtonProps {
  buttonText: string
  onClick: () => void
}

export function StickyButton({ buttonText, onClick }: StickyButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      <p className={styles.btnText}>{buttonText}</p>
    </button>
  )
}

import { motion } from "motion/react"
import styles from "~/components/animation/ChaoticStackAnimation.module.css"

interface ChaoticStackProps {
  colors: string[] // Mottar färger som props
}

const ChaoticStackAnimation = ({ colors }: ChaoticStackProps) => {
  const stackPositions = [
    { x: 0, y: 0, rotate: 0 }, // Dag 1
    { x: -5, y: -32, rotate: 0 }, // Dag 2
    { x: 0, y: -64, rotate: 0 }, // Dag 3
    { x: -5, y: -96, rotate: 0 }, // Dag 4
    { x: 5, y: -130, rotate: 15 }, // Dag 5
  ]

  return (
    <div className={styles.chaoticStackContainer}>
      {colors.map((color, index) => {
        const position = stackPositions[index] || { x: 0, y: 0, rotate: 0 }
        const delay = index * 0.4

        return (
          <motion.div
            key={index}
            initial={{ y: -170, opacity: 0 }}
            animate={{
              y: position.y,
              x: position.x,
              rotate: position.rotate,
              opacity: 1,
            }}
            transition={{
              delay: delay,
              type: "tween",
              ease: "easeOut",
              duration: 1,
            }}
            style={{
              backgroundColor: color,
              position: "absolute",
              bottom: 0,
              width: "30px",
              height: "30px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              border: "2px solid rgba(0,0,0,0.1)",
              zIndex: index,
            }}
          />
        )
      })}
    </div>
  )
}

export default ChaoticStackAnimation

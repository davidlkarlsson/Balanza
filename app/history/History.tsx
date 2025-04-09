import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./History.module.css";
import ChaoticStackAnimation from "~/components/animation/ChaoticStackAnimation";
import { loadFromLocalStorage } from "~/components/utilities/localStorageUtils";

const history = loadFromLocalStorage("history") || [];

const colors = ["#12263a", "#12263a", "#12263a", "#12263a", "#12263a"];

export function History() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

  const groupedHistory = [];
  for (let i = 0; i < history.length; i += 2) {
    groupedHistory.push(history.slice(i, i + 2));
  }

  return (
    <div className={styles.sliderWrapper}>
      <h1 className={styles.myResult}>Mina resultat</h1>
      <div ref={sliderRef} className="keen-slider">
        {groupedHistory.map((group, index) => (
          <div key={index} className={`keen-slider__slide ${styles.slide}`}>
            <div className={styles.weekCard}>
              {group.map((weekHistory: any, i: number) => (
                <div key={i} className={styles.card}>
                  <ChaoticStackAnimation
                    colors={(weekHistory.colors || colors).slice(
                      0,
                      weekHistory.daysCompleted
                    )}
                  />
                  <p className={styles.daysCompleted}>
                    {weekHistory.daysCompleted} av {weekHistory.daysTotal}
                  </p>
                  <p>v.{weekHistory.week}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

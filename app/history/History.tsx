import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./History.module.css";
import ChaoticStackAnimation from "~/components/animation/ChaoticStackAnimation";
import { loadFromLocalStorage } from "~/components/utilities/localStorageUtils";
import arrowLeft from "~/images/arrow_left.svg";
import arrowRight from "~/images/arrow_right.svg";
import { useEffect, useState } from "react";
import type { HistoryObject } from "~/types/HistoryObject";
import { div } from "motion/react-client";

export function History() {
  const [history, setHistory] = useState<HistoryObject[]>([]);

  const colors = ["#12263a", "#12263a", "#12263a", "#12263a", "#12263a"];

  useEffect(() => {
    const storedHistory = loadFromLocalStorage("history") || [];
    const reversedHistory = [...storedHistory].reverse();

    setHistory(reversedHistory);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);


  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 10,
          origin: 'center',
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
  

  const groupedHistory = [];
  for (let i = 0; i < history.length; i += 2) {
    groupedHistory.push(history.slice(i, i + 2));
  }

  return (
    <div className={styles.sliderWrapper}>
      <h1 className={styles.myResult}>Mina resultat</h1>
      <p className={styles.description}>
        Antalet boxar representerar dina avklarade dagar för den angivna veckan.
      </p>

      {groupedHistory.length === 0 ? (
        <div className={styles.noHistoryContainer}>
        <p className={styles.noHistory}>Du har inga resultat att visa ännu. </p>
        <p className={styles.noHistory}>Avsluta en <span className={styles.bold}>No Spend Week</span> för att se dina resultat.</p>
        </div>
      ) : (
        <div className={styles.sliderContainer}>

          {currentSlide > 0 && (
            <button
              onClick={() => instanceRef.current?.prev()}
              className={styles.arrowButton}
              aria-label="Föregående kort"
            >
              <img src={arrowLeft} alt="Vänsterpil-ikon" />
            </button>
          )}

          <div ref={sliderRef} className={`keen-slider ${styles.slides}`}>
            {groupedHistory.map((group, index) => (
              <div key={index} className={`keen-slider__slide ${styles.slide}`}>
                <div className={styles.weekCard}>
                  {group.map((weekHistory: any, i: number) => (
                    <div key={i} className={styles.card}>
                      <ChaoticStackAnimation
                        colors={colors.slice(0, weekHistory.daysCompleted)}
                      />
                      <p className={styles.daysCompleted}>
                        {weekHistory.daysCompleted} av {weekHistory.daysTotal}
                      </p>
                      <p className={styles.weekNumber}>v.{weekHistory.week}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {currentSlide < groupedHistory.length - 1 && (
            <button
              onClick={() => instanceRef.current?.next()}
              className={styles.arrowButton}
              aria-label="Nästa kort"
            >
              <img src={arrowRight} alt="Högerpil-ikon" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

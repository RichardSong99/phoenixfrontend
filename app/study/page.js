
import StudyMain from "./studyMain";
import styles from "./study.module.css";

export default function Study() {
    return (
      <div>
            <div className={styles.selectorHeader}>
                <h1>Start Practicing!</h1>
            </div>
        <StudyMain/>
      </div>
    );
  }
  
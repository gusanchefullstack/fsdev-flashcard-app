import type { StudyStats } from '../../types';
import styles from './StudyStatistics.module.css';

interface StudyStatisticsProps {
  stats: StudyStats;
}

export default function StudyStatistics({ stats }: StudyStatisticsProps) {
  return (
    <aside className={styles.aside} aria-label="Study statistics">
      <h2 className={styles.title}>Study Statistics</h2>

      <ul className={styles.statsList}>
        <li className={`${styles.statCard} ${styles.total}`}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Cards</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
          <div className={styles.statIcon} aria-hidden="true">
            <img src="/images/icon-stats-total.svg" alt="" />
          </div>
        </li>

        <li className={`${styles.statCard} ${styles.mastered}`}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Mastered</span>
            <span className={styles.statValue}>{stats.mastered}</span>
          </div>
          <div className={styles.statIcon} aria-hidden="true">
            <img src="/images/icon-stats-mastered.svg" alt="" />
          </div>
        </li>

        <li className={`${styles.statCard} ${styles.inProgress}`}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>In Progress</span>
            <span className={styles.statValue}>{stats.inProgress}</span>
          </div>
          <div className={styles.statIcon} aria-hidden="true">
            <img src="/images/icon-stats-in-progress.svg" alt="" />
          </div>
        </li>

        <li className={`${styles.statCard} ${styles.notStarted}`}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Not Started</span>
            <span className={styles.statValue}>{stats.notStarted}</span>
          </div>
          <div className={styles.statIcon} aria-hidden="true">
            <img src="/images/icon-stats-not-started.svg" alt="" />
          </div>
        </li>
      </ul>
    </aside>
  );
}

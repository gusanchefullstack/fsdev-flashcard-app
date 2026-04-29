import type { StudyStats } from '../../types';
import styles from './StudyStatistics.module.css';

interface StudyStatisticsProps {
  stats: StudyStats;
}

export default function StudyStatistics({ stats }: StudyStatisticsProps) {
  return (
    <aside className={styles.aside} aria-label="Study statistics">
      <h2 className={styles.title}>Study Statistics</h2>

      <dl>
        <div className={`${styles.statCard} ${styles.total}`}>
          <div className={styles.statInfo}>
            <dt className={styles.statLabel}>Total Cards</dt>
            <dd className={styles.statValue}>{stats.total}</dd>
          </div>
          <div className={styles.statIcon} aria-hidden="true">
            <img src="/images/icon-stats-total.svg" alt="" />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.mastered}`}>
          <div className={styles.statInfo}>
            <dt className={styles.statLabel}>Mastered</dt>
            <dd className={styles.statValue}>{stats.mastered}</dd>
          </div>
          <div className={styles.statIcon} aria-hidden="true">
            <img src="/images/icon-stats-mastered.svg" alt="" />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.inProgress}`}>
          <div className={styles.statInfo}>
            <dt className={styles.statLabel}>In Progress</dt>
            <dd className={styles.statValue}>{stats.inProgress}</dd>
          </div>
          <div className={styles.statIcon} aria-hidden="true">
            <img src="/images/icon-stats-in-progress.svg" alt="" />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.notStarted}`}>
          <div className={styles.statInfo}>
            <dt className={styles.statLabel}>Not Started</dt>
            <dd className={styles.statValue}>{stats.notStarted}</dd>
          </div>
          <div className={styles.statIcon} aria-hidden="true">
            <img src="/images/icon-stats-not-started.svg" alt="" />
          </div>
        </div>
      </dl>
    </aside>
  );
}

import type { AppView } from '../../types';
import styles from './Header.module.css';

interface HeaderProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

export default function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <a href="#main-content" className={styles.logo} aria-label="Flashcard App home">
        <img src="/images/logo-small.svg" alt="" width={32} height={32} />
        <span className={styles.logoText}>Flashcard</span>
      </a>

      <nav aria-label="App navigation">
        <div className={styles.nav} role="tablist">
          <button
            role="tab"
            aria-selected={activeView === 'study'}
            aria-controls="study-panel"
            className={`${styles.navBtn} ${activeView === 'study' ? styles.active : ''}`}
            onClick={() => onViewChange('study')}
          >
            Study Mode
          </button>
          <button
            role="tab"
            aria-selected={activeView === 'all-cards'}
            aria-controls="all-cards-panel"
            className={`${styles.navBtn} ${activeView === 'all-cards' ? styles.active : ''}`}
            onClick={() => onViewChange('all-cards')}
          >
            All Cards
          </button>
        </div>
      </nav>
    </header>
  );
}

import { useRef } from 'react';
import type { AppView } from '../../types';
import styles from './Header.module.css';

interface HeaderProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const VIEWS: AppView[] = ['study', 'all-cards'];

export default function Header({ activeView, onViewChange }: HeaderProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIdx = VIEWS.indexOf(activeView);
    let nextIdx: number | null = null;

    if (e.key === 'ArrowRight') {
      nextIdx = (currentIdx + 1) % VIEWS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIdx = (currentIdx - 1 + VIEWS.length) % VIEWS.length;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = VIEWS.length - 1;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      onViewChange(VIEWS[nextIdx]);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <header className={styles.header}>
      <h1 className="sr-only">Flashcard App</h1>
      <a href="#main-content" className={styles.logo} aria-label="Flashcard App home">
        <img src="/images/logo-small.svg" alt="" width={32} height={32} />
        <span className={styles.logoText}>Flashcard</span>
      </a>

      <nav aria-label="App navigation">
        <div className={styles.nav} role="tablist" onKeyDown={handleKeyDown}>
          <button
            ref={(el) => { tabRefs.current[0] = el; }}
            id="tab-study"
            type="button"
            role="tab"
            aria-selected={activeView === 'study'}
            aria-controls="study-panel"
            tabIndex={activeView === 'study' ? 0 : -1}
            className={`${styles.navBtn} ${activeView === 'study' ? styles.active : ''}`}
            onClick={() => onViewChange('study')}
          >
            Study Mode
          </button>
          <button
            ref={(el) => { tabRefs.current[1] = el; }}
            id="tab-all-cards"
            type="button"
            role="tab"
            aria-selected={activeView === 'all-cards'}
            aria-controls="all-cards-panel"
            tabIndex={activeView === 'all-cards' ? 0 : -1}
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

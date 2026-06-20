import styles from './ErrorBanner.module.css';

export function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className={`${styles.banner} animate-scale-in`} role="alert">
      <span className={styles.icon}>⚠</span>
      <p className={styles.text}>{message}</p>
      <button className={styles.close} onClick={onDismiss} aria-label="Dismiss error">✕</button>
    </div>
  );
}

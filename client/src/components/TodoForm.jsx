import { useState } from 'react';
import styles from './TodoForm.module.css';

export function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!title.trim()) {
      setTitleError('Please enter a title for your task.');
      return false;
    }
    if (title.trim().length > 200) {
      setTitleError('Title must be under 200 characters.');
      return false;
    }
    setTitleError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    } catch (_) {
      // error handled by hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <h2 className={styles.heading}>New Task</h2>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="title">
          Title <span className={styles.required}>*</span>
        </label>
        <input
          id="title"
          type="text"
          className={`${styles.input} ${titleError ? styles.inputError : ''}`}
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => { setTitle(e.target.value); if (titleError) setTitleError(''); }}
          maxLength={200}
          disabled={submitting}
        />
        {titleError && <p className={styles.errorMsg}>{titleError}</p>}
        <span className={styles.charCount}>{title.length}/200</span>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="description">
          Description <span className={styles.optional}>(optional)</span>
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          placeholder="Add some details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
          rows={3}
          disabled={submitting}
        />
        <span className={styles.charCount}>{description.length}/1000</span>
      </div>

      <button type="submit" className={styles.btn} disabled={submitting || !title.trim()}>
        {submitting ? (
          <span className={styles.spinner} />
        ) : (
          <>
            <span className={styles.plus}>+</span>
            Add Task
          </>
        )}
      </button>
    </form>
  );
}

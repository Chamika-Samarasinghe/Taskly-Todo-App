import { useState } from 'react';
import styles from './TodoItem.module.css';

export function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');
  const [titleError, setTitleError] = useState('');
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
    setTitleError('');
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setTitleError('');
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setTitleError('Title cannot be empty.');
      return;
    }
    setSaving(true);
    try {
      await onUpdate(todo._id, editTitle.trim(), editDesc.trim());
      setEditing(false);
    } catch (_) {
      // error surfaced by hook
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEdit(); }
    if (e.key === 'Escape') cancelEdit();
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`${styles.item} ${todo.done ? styles.done : ''} animate-slide-in`}>
      {/* Done toggle */}
      <button
        className={`${styles.checkBtn} ${todo.done ? styles.checked : ''}`}
        onClick={() => onToggle(todo._id)}
        aria-label={todo.done ? 'Mark as undone' : 'Mark as done'}
        title={todo.done ? 'Mark as undone' : 'Mark as done'}
      >
        {todo.done && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Content */}
      <div className={styles.content}>
        {editing ? (
          <div className={styles.editForm}>
            <input
              autoFocus
              className={`${styles.editInput} ${titleError ? styles.inputError : ''}`}
              value={editTitle}
              onChange={(e) => { setEditTitle(e.target.value); if (titleError) setTitleError(''); }}
              onKeyDown={handleKeyDown}
              maxLength={200}
              placeholder="Task title"
              disabled={saving}
            />
            {titleError && <p className={styles.errorMsg}>{titleError}</p>}
            <textarea
              className={styles.editTextarea}
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={1000}
              placeholder="Description (optional)"
              rows={2}
              disabled={saving}
            />
            <div className={styles.editActions}>
              <button className={styles.saveBtn} onClick={saveEdit} disabled={saving}>
                {saving ? <span className={styles.spinner} /> : 'Save'}
              </button>
              <button className={styles.cancelBtn} onClick={cancelEdit} disabled={saving}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <p className={styles.title}>{todo.title}</p>
            {todo.description && <p className={styles.description}>{todo.description}</p>}
            <p className={styles.date}>{formatDate(todo.createdAt)}</p>
          </>
        )}
      </div>

      {/* Actions */}
      {!editing && (
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={startEdit} title="Edit task" aria-label="Edit task">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className={styles.deleteBtn} onClick={() => onDelete(todo._id)} title="Delete task" aria-label="Delete task">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

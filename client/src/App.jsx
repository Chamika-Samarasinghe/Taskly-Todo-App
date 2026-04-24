import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { ErrorBanner } from './components/ErrorBanner';
import styles from './App.module.css';

const FILTERS = ['All', 'Active', 'Done'];

export default function App() {
  const { todos, loading, error, clearError, createTodo, updateTodo, toggleDone, deleteTodo } = useTodos();
  const [filter, setFilter] = useState('All');

  const filtered = todos.filter((t) => {
    if (filter === 'Active') return !t.done;
    if (filter === 'Done') return t.done;
    return true;
  });

  const counts = {
    All: todos.length,
    Active: todos.filter((t) => !t.done).length,
    Done: todos.filter((t) => t.done).length,
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoDot} />
            <span className={styles.logoName}>Taskly</span>
          </div>
          <p className={styles.tagline}>A place for your tasks.</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          {/* Left: Form */}
          <aside className={styles.sidebar}>
            <TodoForm onAdd={createTodo} />
          </aside>

          {/* Right: List */}
          <section className={styles.listSection}>
            <ErrorBanner message={error} onDismiss={clearError} />

            {/* Filter tabs */}
            <div className={styles.filters}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  <span className={styles.badge}>{counts[f]}</span>
                </button>
              ))}
            </div>

            {/* Loading skeleton */}
            {loading && (
              <div className={styles.skeletons}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={styles.skeleton} style={{ animationDelay: `${i * 80}ms` }} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>{filter === 'Done' ? '✓' : '○'}</span>
                <p className={styles.emptyTitle}>
                  {filter === 'Done' ? 'Nothing completed yet.' : filter === 'Active' ? 'All caught up!' : 'No tasks yet.'}
                </p>
                <p className={styles.emptyHint}>
                  {filter === 'All' ? 'Add your first task using the form.' : `Switch to "All" to see everything.`}
                </p>
              </div>
            )}

            {/* Todo list */}
            {!loading && filtered.length > 0 && (
              <ul className={styles.list}>
                {filtered.map((todo) => (
                  <li key={todo._id}>
                    <TodoItem
                      todo={todo}
                      onToggle={toggleDone}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  </li>
                ))}
              </ul>
            )}

            {/* Footer count */}
            {!loading && todos.length > 0 && (
              <p className={styles.footerCount}>
                {counts.Active} task{counts.Active !== 1 ? 's' : ''} remaining
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

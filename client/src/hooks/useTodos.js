import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/api';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  // Create 
  const createTodo = useCallback(async (title, description) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic = { _id: tempId, title, description, done: false, createdAt: new Date().toISOString() };
    setTodos((prev) => [optimistic, ...prev]);

    try {
      const saved = await todoService.create({ title, description });
      setTodos((prev) => prev.map((t) => (t._id === tempId ? saved : t)));
      return saved;
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t._id !== tempId));
      setError(err.message);
      throw err;
    }
  }, []);

  // Update 
  const updateTodo = useCallback(async (id, title, description) => {
    const prev_todos = [...todos];
    setTodos((prev) => prev.map((t) => t._id === id ? { ...t, title, description } : t));

    try {
      const updated = await todoService.update(id, { title, description });
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setTodos(prev_todos);
      setError(err.message);
      throw err;
    }
  }, [todos]);

  // Toggle done 
  const toggleDone = useCallback(async (id) => {
    setTodos((prev) => prev.map((t) => t._id === id ? { ...t, done: !t.done } : t));

    try {
      const updated = await todoService.toggleDone(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      // revert
      setTodos((prev) => prev.map((t) => t._id === id ? { ...t, done: !t.done } : t));
      setError(err.message);
    }
  }, []);

  // Delete 
  const deleteTodo = useCallback(async (id) => {
    const prev_todos = [...todos];
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await todoService.remove(id);
    } catch (err) {
      setTodos(prev_todos);
      setError(err.message);
    }
  }, [todos]);

  return {
    todos,
    loading,
    error,
    clearError,
    createTodo,
    updateTodo,
    toggleDone,
    deleteTodo,
    refetch: fetchTodos,
  };
}

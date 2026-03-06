/**
 * @module LoginForm
 * Компонент формы входа.
 */
import React, { useState } from 'react';
import { useLogin } from '@/services/hooks/authHooks/useLogin';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Получаем всё необходимое из нашего хука
  const { mutate, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      mutate({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <h2>Login</h2>
      
      {/* Отображение ошибки, если она есть */}
      {isError && (
        <div style={{ color: 'red', fontSize: '0.8rem' }}>
          {error instanceof Error ? error.message : 'Login failed'}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
        required
      />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};
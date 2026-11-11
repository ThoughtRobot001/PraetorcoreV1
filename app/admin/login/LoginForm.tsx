'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, LoginState } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button className="admin-button admin-button-primary" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>;
}

export function LoginForm({ initialError }: { initialError: string | null }) {
  const [state, action] = useActionState(loginAction, { error: initialError } satisfies LoginState);
  return (
    <form action={action} className="admin-login-form">
      <label htmlFor="admin-email">Email</label>
      <input id="admin-email" name="email" type="email" autoComplete="username" required maxLength={320} />
      <label htmlFor="admin-password">Password</label>
      <input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={200} />
      {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
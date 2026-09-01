import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './login.css';

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode,    setMode]    = useState('login');   // 'login' | 'register'
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [apiErr,  setApiErr]  = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const validate = () => {
    const e = {};
    if (isRegister && !form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email)                     e.email = 'Please enter your Apple ID.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password)                  e.password = 'Please enter your password.';
    else if (isRegister && form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiErr) setApiErr('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setApiErr('');
    try {
      if (isRegister) {
        await register(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate('/');
    } catch (err) {
      setApiErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setErrors({});
    setApiErr('');
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <div className="login-page">
      {/* Apple Logo */}
      <Link to="/" className="login-page__logo" aria-label="Apple Home">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" width="44" height="54" fill="#1d1d1f">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 672.4 0 541.2 0 426.6c0-175.2 114.4-267.8 226.7-267.8 60 0 109.7 40.4 147.2 40.4 35.7 0 92-43 161.6-43 25.8 0 108.2 2.6 168.6 71.9zm-209.7-144.5c31.4-37 54.4-88.2 54.4-139.4 0-7.1-.6-14.3-1.9-20.1-51.5 2-112.5 34.5-149.5 76.7-28.5 32-56.4 83.1-56.4 135.1 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 46.4 0 102.5-31.1 138-71.7z"/>
        </svg>
      </Link>

      <div className="login-card" role="main">
        <h1 className="login-card__title">
          {isRegister ? 'Create your Apple ID' : 'Sign in with your Apple ID'}
        </h1>
        <p className="login-card__sub">
          {isRegister
            ? 'One Apple ID is all you need for all your Apple devices and services.'
            : 'Your Apple ID is the account you use for all Apple services.'}
        </p>

        {/* API Error Banner */}
        {apiErr && (
          <div className="login-card__error-banner" role="alert" aria-live="assertive">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            {apiErr}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Name (register only) */}
          {isRegister && (
            <div className={`login-form__group ${errors.name ? 'login-form__group--error' : ''}`}>
              <label htmlFor="login-name" className="login-form__label">Full Name</label>
              <input
                id="login-name" type="text" name="name"
                className="login-form__input" placeholder="Your full name"
                value={form.name} onChange={handleChange} autoComplete="name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="login-form__error" role="alert">{errors.name}</p>}
            </div>
          )}

          {/* Email */}
          <div className={`login-form__group ${errors.email ? 'login-form__group--error' : ''}`}>
            <label htmlFor="login-email" className="login-form__label">Apple ID</label>
            <input
              id="login-email" type="email" name="email"
              className="login-form__input" placeholder="you@example.com"
              value={form.email} onChange={handleChange} autoComplete="email"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="login-form__error" role="alert">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={`login-form__group ${errors.password ? 'login-form__group--error' : ''}`}>
            <label htmlFor="login-password" className="login-form__label">Password</label>
            <input
              id="login-password" type="password" name="password"
              className="login-form__input" placeholder="Password"
              value={form.password} onChange={handleChange} autoComplete={isRegister ? 'new-password' : 'current-password'}
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="login-form__error" role="alert">{errors.password}</p>}
          </div>

          {/* Forgot (login only) */}
          {!isRegister && (
            <div className="login-form__forgot">
              <a href="#" id="forgot-password-link">Forgot Apple ID or password?</a>
            </div>
          )}

          {/* Submit */}
          <button id="signin-btn" type="submit" className="login-form__submit" disabled={loading} aria-busy={loading}>
            {loading
              ? <span className="login-form__spinner" aria-label={isRegister ? 'Creating account…' : 'Signing in…'} />
              : (isRegister ? 'Create Apple ID' : 'Sign in')
            }
          </button>
        </form>

        {/* Divider */}
        <div className="login-card__divider"><span>or</span></div>

        {/* Toggle mode */}
        <div className="login-card__create">
          <p>{isRegister ? 'Already have an Apple ID?' : "Don't have an Apple ID?"}</p>
          <button id="toggle-auth-mode-btn" className="login-card__create-link" onClick={switchMode}>
            {isRegister ? 'Sign in instead \u203a' : 'Create yours now \u203a'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="login-page__footer">
        <Link to="/" className="login-page__back">&lsaquo; Back to apple.com/in/</Link>
        <p className="login-page__privacy">
          Your Apple ID information is used to allow you to sign in securely and access your data.{' '}
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

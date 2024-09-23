import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase';

const Exercise15 = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login realizado com sucesso!');
    } catch (err) {
      setError('Erro ao fazer login: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Exercise 15 - Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Entrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Exercise15;

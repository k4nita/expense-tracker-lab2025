import axios from 'axios';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('Token:', res.data.token);
      // Ruaje token-in në localStorage ose state
    } catch (err) {
      console.error('Gabim gjatë logimit:', err.response?.data?.error || err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;

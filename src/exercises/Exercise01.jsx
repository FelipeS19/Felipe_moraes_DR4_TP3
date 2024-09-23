import { useState } from 'react';

const Exercise01 = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ name, phone });
  };

  return (
    <div>
      <h1>Exercise 01</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>

      {submittedData && (
        <div>
          <h2>Dados Submetidos:</h2>
          <p>Nome: {submittedData.name}</p>
          <p>Telefone: {submittedData.phone}</p>
        </div>
      )}
    </div>
  );
};

export default Exercise01;

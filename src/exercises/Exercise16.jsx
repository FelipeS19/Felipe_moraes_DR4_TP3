import { useState } from 'react';

const Exercise16 = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState('');

  const handleFetchAddress = async (e) => {
    e.preventDefault();
    setError('');
    setAddress(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }
      const data = await response.json();
      setAddress(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Exercise 16 - Consulta de CEP</h1>
      <form onSubmit={handleFetchAddress}>
        <label>
          CEP:
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </label>
        <button type="submit">Buscar Endereço</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {address && (
        <div>
          <h2>Endereço Encontrado:</h2>
          <p>Rua: {address.logradouro}</p>
          <p>Bairro: {address.bairro}</p>
          <p>Cidade: {address.localidade}</p>
          <p>Estado: {address.uf}</p>
        </div>
      )}
    </div>
  );
};

export default Exercise16;

import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Exercise04 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div>
      <h1>Exercise 04</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nome:
          <input {...register('name', { required: true })} />
        </label>
        {errors.name && <p style={{ color: 'red' }}>Nome é obrigatório.</p>}
        
        <label>
          Telefone:
          <input {...register('phone', { required: true })} />
        </label>
        {errors.phone && <p style={{ color: 'red' }}>Telefone é obrigatório.</p>}
        
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

export default Exercise04;

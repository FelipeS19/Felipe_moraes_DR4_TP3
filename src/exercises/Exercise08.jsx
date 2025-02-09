import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Exercise08 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div>
      <h1>Exercise 08</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nome:
          <input {...register('name', { required: true })} />
        </label>
        {errors.name && <p style={{ color: 'red' }}>Nome é obrigatório.</p>}

        <label>
          Email:
          <input
            type="email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Email inválido.',
              },
            })}
          />
        </label>
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

        <label>
          Telefone:
          <input
            {...register('phone', {
              required: true,
              pattern: {
                value: /^[0-9]+$/,
                message: 'O telefone deve conter apenas números.',
              },
            })}
          />
        </label>
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}

        <button type="submit">Enviar</button>
      </form>

      {submittedData && (
        <div>
          <h2>Dados Submetidos:</h2>
          <p>Nome: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Telefone: {submittedData.phone}</p>
        </div>
      )}
    </div>
  );
};

export default Exercise08;

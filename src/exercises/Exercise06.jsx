import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Exercise06 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(JSON.stringify(data, null, 2)); 
  };

  return (
    <div>
      <h1>Exercise 06</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nome:
          <input {...register('name', { required: true })} />
        </label>
        {errors.name && <p style={{ color: 'red' }}>Nome é obrigatório.</p>}
        
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
          <pre>{submittedData}</pre> 
        </div>
      )}
    </div>
  );
};

export default Exercise06;

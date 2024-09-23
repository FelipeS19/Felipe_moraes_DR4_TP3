import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import app from '../../firebase'; 

const Exercise10 = () => {
  const db = getFirestore(app);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dataList, setDataList] = useState([]);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'contacts'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDataList(data);
  }, [db]);

  const onSubmit = async (data) => {
    await addDoc(collection(db, 'contacts'), data);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h1>Exercise 10</h1>
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

      <h2>Dados Salvos:</h2>
      <ul>
        {dataList.map(item => (
          <li key={item.id}>{item.name} - {item.email} - {item.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default Exercise10;

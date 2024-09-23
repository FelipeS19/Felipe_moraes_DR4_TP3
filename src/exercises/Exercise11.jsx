import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import app from '../../firebase';
import DataTable from 'react-data-table-component';

const Exercise11 = () => {
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

  const columns = [
    { name: 'Nome', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Telefone', selector: row => row.phone, sortable: true },
  ];

  return (
    <div>
      <h1>Exercise 11</h1>
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
      <DataTable
        columns={columns}
        data={dataList}
        pagination
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default Exercise11;

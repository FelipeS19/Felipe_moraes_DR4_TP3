import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import app from '../../firebase';
import DataTable from 'react-data-table-component';

const Exercise13 = () => {
  const db = getFirestore(app);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [dataList, setDataList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'contacts'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDataList(data);
  }, [db]);

  const onSubmit = async (data) => {
    if (selectedId) {
      const contactRef = doc(db, 'contacts', selectedId);
      await setDoc(contactRef, data);
    } else {
      await addDoc(collection(db, 'contacts'), data);
    }
    fetchData();
    resetForm();
  };

  const resetForm = () => {
    setValue('name', '');
    setValue('email', '');
    setValue('phone', '');
    setSelectedId(null);
  };

  const handleRowSelected = (row) => {
    setSelectedId(row.id);
    setValue('name', row.name);
    setValue('email', row.email);
    setValue('phone', row.phone);
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteDoc(doc(db, 'contacts', selectedId));
      fetchData();
      resetForm();
    }
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
      <h1>Exercise 13</h1>
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

        <button type="submit">{selectedId ? 'Atualizar' : 'Enviar'}</button>
      </form>

      <button onClick={handleDelete} disabled={!selectedId}>
        Excluir
      </button>

      <h2>Dados Salvos:</h2>
      <DataTable
        columns={columns}
        data={dataList}
        pagination
        highlightOnHover
        pointerOnHover
        onRowClicked={handleRowSelected} 
      />
    </div>
  );
};

export default Exercise13;

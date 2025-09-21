import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import CardsComponent from '../../components/CardsComponent/CardsComponent';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

export default function publications() {
  const email = localStorage.getItem('email');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/user/view-order`, {
      method: 'post',
      body: JSON.stringify({
        Mail: localStorage.getItem('email')
      })
    })
      .then((resp) => resp.json())
      .then((rData) => {
        console.log(rData);
        const newData = [];
        for (let item of rData || []) {
          newData.push({
            name: item.title,
            address: item.adress,
            imagesURL: item.image_url,
            date: item.Created_at,
            number: item.phone,
            description: item.description,
            price: item.price,
            id: item.id
          });
        }
        setData(newData);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '25px' }}>Ваши публикации</h1>
        <Button
          onClick={() => {
            navigate('/add_publication');
          }}
          variant="contained"
          sx={{ fontSize: '15px' }}
        >
          Добавить публикацию
        </Button>
      </div>
      <CardsComponent data={data}></CardsComponent>
    </>
  );
}

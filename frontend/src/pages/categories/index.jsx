import { useParams } from 'react-router';
import CardsComponent from '../../components/CardsComponent/CardsComponent';
import { useEffect, useState } from 'react';

import Loader from 'components/Loader';
import categories from '../../menu-items/categories';

export default function Categories() {
  const params = useParams();
  const category = params.category;
  const [data, setData] = useState([]);

  const [isLoading, setLoading] = useState(true);

  let categoryRu;
  for (let item of categories.children) {
    if (item.id == category) {
      categoryRu = item.title;
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/user/view-category`, {
      method: 'post',
      body: JSON.stringify({
        Category: categoryRu
      })
    })
      .then((resp) => resp.json())
      .then((rData) => {
        console.log(rData);
        const newData = [];
        const rnData = rData || [];
        console.log(rnData);

        for (let item of rnData) {
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
  }, [category]);

  if (isLoading) return <Loader></Loader>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '25px' }}>{categoryRu}</h1>
      </div>
      <CardsComponent data={data}></CardsComponent>
    </>
  );
}

// material-ui
import { Heart } from 'lucide-react';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

import { Grid } from '@mui/material';
import { Link } from 'react-router';
import numberWithCommas from '../../api/numberWithCommas';
import getCity from '../../api/getCity';
import formatDateToRussian from '../../api/formatDate';

function Item({ children }) {
  return (
    <Link
      onClick={() => {
        sessionStorage.setItem('currentItem', JSON.stringify(children));
      }}
      style={{ position: 'relative', textDecoration: 'none' }}
      to={`/item/${children.id}`}
    >
      <MainCard
        sx={{
          height: '200px',
          background: `url(${children.imagesURL[0]})`,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#fafafb'
        }}
      ></MainCard>
      <Typography sx={{ color: 'black', fontSize: '20px', padding: '3px' }}>{numberWithCommas(children.price, 'c.')}</Typography>
      <Typography sx={{ marginTop: '-8px', color: 'black', padding: '3px' }}>{children.name}</Typography>

      <div>
        <Typography sx={{ marginTop: '-8px', padding: '3px', fontSize: '13px', color: 'rgba(0, 0, 0, .6)', display: 'inline-block' }}>
          {formatDateToRussian(children.date)}
        </Typography>
        <span style={{ color: 'rgba(0, 0, 0, .7)' }}>{' | '}</span>
        <Typography sx={{ marginTop: '-8px', padding: '3px', fontSize: '13px', color: 'rgba(0, 0, 0, .6)', display: 'inline-block' }}>
          {getCity(children.address)}
        </Typography>
      </div>
      <Heart className="like_icon"></Heart>
    </Link>
  );
}

export default function CardsComponent({ data }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: '1rem'
      }}
    >
      {data.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
    </div>
  );
}

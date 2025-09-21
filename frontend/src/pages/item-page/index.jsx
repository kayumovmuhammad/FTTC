// import { Box, Button } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
// import Loader from 'components/Loader';

// import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';
// import './styles.css';

// export default function ItemPage() {
//   const params = useParams();
//   const id = params.id;

//   const item = JSON.parse(sessionStorage.getItem('currentItem'));

//   const images = [];

//   for (let image of item.imagesURL) {
//     console.log(image);

//     images.push({ original: image, thumbnail: image });
//   }

//   return (
//     <div style={{ width: '95%', margin: 'auto' }}>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <h2 style={{ fontSize: '40px', width: '70%' }}>{item.name}</h2>
//         <div>
//           <a href={`tel:${item.number.split(' ').join('')}`}>
//             <Button sx={{ fontSize: '20px' }} variant="contained">
//               {item.number}
//             </Button>
//           </a>
//           <Button sx={{ fontSize: '20px' }} variant="contained">
//             {item.price}
//           </Button>
//         </div>
//       </div>
//       <ImageGallery
//         showBullets={true}
//         items={images}
//         showThumbnails={false}
//         thumbnailPosition="bottom"
//         showFullscreenButton={false}
//         showPlayButton={false}
//       />
//       <p style={{ marginTop: '60px' }}>{item.description}</p>
//     </div>
//   );
// }

// index.jsx
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Loader from 'components/Loader';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './styles.css';
import { MapPin, Calendar, Clock, FileText } from 'lucide-react';
import formatDateToRussian from '../../api/formatDate';
import numberWithCommas from '../../api/numberWithCommas';
import { Heart } from 'lucide-react';

export default function ItemPage() {
  const params = useParams();
  const id = params.id;
  const item = JSON.parse(sessionStorage.getItem('currentItem'));
  const images = [];

  for (let image of item.imagesURL) {
    console.log(image);
    images.push({ original: image, thumbnail: image });
  }

  const address = item.address;
  const date = formatDateToRussian(item.date);
  const time = item.date.slice(11, 16);

  return (
    <div className="item-container">
      <div className="item-content">
        <div className="item-info">
          <h2 className="item-title">{item.name}</h2>
          <div className="item-actions">
            <a href={`tel:${item.number.split(' ').join('')}`} className="phone-link">
              <Button className="contact-button phone-button" variant="outlined">
                {item.number}
              </Button>
            </a>
            <Button className="contact-button price-button" variant="contained">
              {numberWithCommas(item.price, 'с.')}
            </Button>
          </div>
        </div>

        <div className="gallery-section">
          <ImageGallery
            showBullets={true}
            items={images}
            showThumbnails={false}
            thumbnailPosition="bottom"
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>

        <div className="mt-5 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">Адрес</p>
                <p className="text-sm text-gray-600 break-words">{address}</p>
              </div>
            </div>

            <div className="border-t border-gray-100"></div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{date}</p>
                </div>
              </div>

              {time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{time}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              <h3 className="text-sm font-medium text-gray-900">{'Описание'}</h3>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

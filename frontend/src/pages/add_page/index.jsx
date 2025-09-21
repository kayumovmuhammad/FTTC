import { Backdrop, Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useCallback, useRef, useState, useEffect, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import classes from './style.module.css';
import categories from '../../menu-items/categories';
import CancelIcon from '@mui/icons-material/Cancel';
import { MuiTelInput } from 'mui-tel-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useNavigate } from 'react-router';

const imagePreviewSize = '150px';

const MapAddressSelector = ({ setAddressError, addressError, selectedAddress, setSelectedAddress }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState([38.573, 68.786]);

  useEffect(() => {
    window.ymaps.ready(() => {
      const newMap = new window.ymaps.Map(mapRef.current, {
        center: coordinates,
        zoom: 12,
        behaviors: ['default', 'drag']
      });
      newMap.behaviors.disable(['scrollZoom']);

      newMap.events.add('click', async (e) => {
        const clickedCoords = e.get('coords');
        setCoordinates(clickedCoords);

        newMap.geoObjects.removeAll();
        const marker = new window.ymaps.Placemark(clickedCoords);
        newMap.geoObjects.add(marker);

        if (!clickedCoords || clickedCoords.some(isNaN)) {
          setSelectedAddress('Невалидные координаты');
          setAddressError('Выберите точку на карте');
          return;
        }

        try {
          const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?geocode=${clickedCoords[1]},${clickedCoords[0]}&format=json&apikey=d6cd6610-1c47-469b-a0a8-d3837c41887f&results=1`
          );
          const data = await response.json();
          const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
          if (geoObject) {
            const address = geoObject.metaDataProperty.GeocoderMetaData.Address.Components.slice(1)
              .map((p) => p.name)
              .join(', ');
            setSelectedAddress(address);
            setAddressError('');
          } else {
            setSelectedAddress('Адрес не найден');
            setAddressError('Адрес не найден для этих координат');
          }
        } catch (error) {
          console.error('Ошибка HTTP геокодирования:', error);
          setSelectedAddress('Ошибка получения адреса');
          setAddressError('Не удалось получить адрес. Проверьте консоль.');
        }
      });

      setMap(newMap);

      return () => {
        newMap.destroy();
      };
    });
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
          border: `1px solid ${!addressError ? 'rgba(0, 0, 0, 0.1)' : '#ff4d4f'}`,
          borderRadius: '5px',
          overflow: 'hidden'
        }}
      />
      {selectedAddress && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <strong>Выбранный адрес:</strong> {selectedAddress}
        </div>
      )}
      <span style={{ color: '#ff4d4f' }}>{addressError}</span>
    </div>
  );
};

function Image({ url, index, deleteImage }) {
  const [isHover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{ position: 'relative', width: imagePreviewSize, height: imagePreviewSize }}
    >
      <img
        src={url}
        alt=""
        style={{ width: imagePreviewSize, height: imagePreviewSize, borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.1)' }}
      />
      {isHover && (
        <CancelIcon
          onClick={() => {
            deleteImage(index);
          }}
          sx={{ position: 'absolute', top: '5px', right: '5px', '&:hover': { cursor: 'pointer' } }}
        ></CancelIcon>
      )}
    </div>
  );
}

export default function AddPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const navigate = useNavigate();

  const handleChangePhone = (newPhone, info) => {
    setPhone(newPhone);

    if (newPhone) {
      try {
        const phoneNumber = parsePhoneNumberFromString(newPhone, info.countryCode);
        if (phoneNumber && phoneNumber.isValid()) {
          setError('');
        } else {
          setError('*Введите корректный номер телефона');
        }
      } catch (err) {
        setError('*Ошибка при обработке номера телефона');
      }
    } else {
      setError('*Введите корректный номер телефона');
    }
  };
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  const [imageURLs, setImageURLs] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    let urls = [];
    let images = [];
    for (let file of acceptedFiles) {
      if (file.type.startsWith('image/')) {
        urls.push(URL.createObjectURL(file));
        images.push(file);
      }
    }
    setImageURLs((preImageURLs) => {
      return [...preImageURLs, ...urls];
    });
    setImagesList((preImagesList) => {
      return [...preImagesList, ...images];
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (event) => {
    setCategory(event.target.value);
    setCategoryError('');
  };

  const deleteImage = (index) => {
    const prImages = [...imageURLs];
    prImages.splice(index, 1);
    setImageURLs(prImages);
  };

  const handleSubmit = async () => {
    let isError = false;
    if (!category) {
      isError = true;
      setCategoryError(true);
    }
    if (!selectedAddress || selectedAddress == 'Ошибка получения адреса' || selectedAddress == 'Адрес не найден') {
      isError = true;
      setAddressError('*Выберите корректный адрес');
    }
    if (!title) {
      isError = true;
      setTitleError('*Название не может быть пустым');
    }
    if (!phone) {
      isError = true;
      setError('*Введите корректный номер телефона');
    }
    const valueNumber = Number(price);
    if (!valueNumber && price != '0') {
      setPriceError('*Введите корректное число');
    }
    if (!!titleError) {
      isError = true;
    }
    if (!!error) {
      isError = true;
    }
    if (isError) {
      return;
    }
    setLoading(true);
    const images = [];

    const sendImage = async (image) => {
      const formData = new FormData();
      formData.append('image', image);
      await fetch(`https://api.imageban.ru/v1`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer Ub1QNJrS74L5r9ugyv2rtsNjQNgPCWEO7fT'
        },
        body: formData
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          images.push(data.data.link);
        });
    };

    for (let image of imagesList) {
      await sendImage(image);
    }

    fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/user/create-order`, {
      method: 'POST',
      body: JSON.stringify({
        Price: +price,
        Description: description,
        Title: title,
        Created_at: '',
        Phone: phone,
        Adress: selectedAddress,
        Email: localStorage.getItem('email'),
        Category: category,
        Image_url: images,
        Payment: 0
      })
    }).then((resp) => {
      setLoading(false);
      navigate('/publications');
    });
  };

  return (
    <>
      <Box sx={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <TextField
            error={!!titleError}
            helperText={titleError}
            sx={{ flex: '1', minWidth: '200px' }}
            id="outlined-basic"
            label="Название"
            variant="outlined"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (event.target.value == '') {
                setTitleError('*Название не может быть пустым');
              } else {
                setTitleError('');
              }
            }}
          />
          <TextField
            sx={{ flex: '1', minWidth: '200px' }}
            id="outlined-basic"
            label="Цена"
            value={price}
            error={!!priceError}
            helperText={priceError}
            onChange={(event) => {
              const newValue = event.target.value;
              setPrice(newValue);
              const valueNumber = Number(newValue);
              if (!valueNumber && newValue != '' && newValue != '0') {
                setPriceError('*Введите корректное число');
              } else {
                setPriceError('');
              }
            }}
            variant="outlined"
          />
          <FormControl sx={{ flex: '1', minWidth: '200px' }}>
            <InputLabel error={categoryError} id="demo-simple-select-label">
              Категория
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              error={categoryError}
              onChange={handleChange}
            >
              {categories.children.map((item) => (
                <MenuItem value={item.title}>{item.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <MuiTelInput
          sx={{ maxWidth: '100%', marginTop: '20px', width: '100%' }}
          value={phone}
          onChange={handleChangePhone}
          label="Номер телефона"
          defaultCountry="TJ"
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error}
          inputProps={{ inputMode: 'tel' }}
          focusOnSelectCountry
        />
        <TextField
          sx={{ maxWidth: '100%', marginTop: '20px', width: '100%' }}
          id="outlined-multiline-static"
          label="Описание"
          multiline
          rows={6}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <h3 style={{ marginBottom: 0, marginTop: '10px', fontWeight: 'normal', color: '#595959' }}>Выберите изображения</h3>
        <ul
          style={{
            display: 'flex',
            listStyleType: 'none',
            width: '100%',
            gap: '10px',
            overflow: 'auto',
            padding: '10px',
            paddingLeft: 0,
            marginTop: 0,
            marginBottom: '0'
          }}
        >
          <li>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={classes.add_button}>
                <AddCircleIcon sx={{ height: '30px', width: '30px' }} />
              </div>
            </div>
          </li>
          {imageURLs.map((url, index) => {
            return (
              <li key={index}>
                <Image url={url} index={index} deleteImage={deleteImage}></Image>
              </li>
            );
          })}
        </ul>
        <h3 style={{ marginBottom: '5px', marginTop: '0', fontWeight: 'normal', color: !addressError ? '#595959' : '#ff4d4f' }}>
          Выберите адрес
        </h3>
        <MapAddressSelector
          setAddressError={setAddressError}
          addressError={addressError}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        ></MapAddressSelector>
        <Button onClick={handleSubmit} sx={{ fontSize: '16px', marginTop: '30px' }} variant="contained">
          Опубликовать
        </Button>
      </Box>
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1
        })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

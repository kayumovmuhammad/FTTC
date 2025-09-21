import { useEffect, useRef, useState } from 'react';
import classes from './Login.module.css';
import login, { signOut } from 'api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

export default function LoginPage() {
  const mailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    signOut();
  }, []);

  console.log(isLoading);

  return (
    <>
      <main className={classes.main}>
        <div className={classes.card}>
          <h1 className={classes.login_heading}>Вход в аккаунт</h1>
          <div className={classes.input_wrapper}>
            <input ref={mailRef} className={classes.input} type="text" placeholder="Электронная почта" />
            <input ref={passwordRef} className={classes.input} type="password" placeholder="Пароль" />

            <div className={classes.error}>{error}</div>
          </div>
          <div className={classes.signUp}>
            У вас нет аккаунта <Link to={'/register'}>Зарегистрироваться!</Link>
          </div>

          <div className={classes.container_button}>
            <button
              onClick={() => {
                setIsLoading(true);
                login({
                  mail: mailRef.current.value,
                  password: passwordRef.current.value,
                  navigate,
                  setError,
                  setIsLoading
                });
              }}
              className={classes.btn}
            >
              Войти
            </button>
          </div>
        </div>
        <Backdrop
          sx={(theme) => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
          })}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    </>
  );
}

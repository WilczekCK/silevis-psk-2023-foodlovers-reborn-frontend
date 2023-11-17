import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);

  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('s022222@student.tu.kielce.pl');

  async function onSubmit() {
    try {
      setIsLoading(true);
      
      await axios({
        url: `/api/user/${userEmail}`
      }).then(response => {
        const {data} = response;
        console.log(data);

        if (data) {
          setCookie(__cookieName, data);
          redirect('/');
        }

        setIsLoading(false);
      })
    } catch (error) {
      setIsLoading(false);
    }
  }

  function onChange({target}) {
    const {value} = target;
    setUserEmail(value);
  }

  return (
      isCookieAvailable
      ? <Navigate replace to="/" />
      : (
        <div class="login__container">
          {isLoading && "Trwa ładowanie"}
          {userEmail}

          <label style={{display: 'flex', flexDirection: 'column'}}> Wpisz adres e-mail:
          <input type="name" onChange={onChange} placeholder="Wpisz powiązany adres email z USOS"/>
          </label>
          <button onClick={onSubmit}>Zaloguj się!</button>
        </div>
      )
  );
}
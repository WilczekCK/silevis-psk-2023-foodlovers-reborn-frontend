import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);
  const [userEmail, setUserEmail] = useState('');

  //s022222@student.tu.kielce.pl
  async function onSubmit() {
    if(!userEmail) {
      return alert("Pole e-mail nie moze byc puste!");
    }
    
    await axios({
      url: `/api/user/${userEmail}`
    }).then(response => {
      const {data} = response;

      if (data) {
        setCookie(__cookieName, data);
        redirect('/');
      }
    }).catch(error => {
      alert("Sprawdź poprawność danych, jeśli dalej jest coś nie tak, skontaktuj się z dziekanatem");
    })
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
          <label style={{display: 'flex', flexDirection: 'column'}}> Wpisz adres e-mail:
          <input type="name" onChange={onChange} placeholder="Wpisz powiązany adres email z USOS"/>
          </label>
          <button onClick={onSubmit}>Zaloguj się!</button>
        </div>
      )
  );
}
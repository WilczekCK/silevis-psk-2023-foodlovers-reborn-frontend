import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const [userId, setUserId]  = useState('');

  async function onSubmit() {
    try {
      const response = await axios.get("s022222@student.tu.kielce.pl");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function setCokies(){
    setCookie(__cookieName, {
      id: 21,
      name: 'pawel'
    });
    redirect('/');
  }

  function onChange({target}) {
    const {value} = target;
    setUserId(value);
  }

  return (
    cookies[__cookieName].name
      ? <Navigate replace to="/" />
      : (
        <div class="login__container">
          {userId}

          <label style={{display: 'flex', flexDirection: 'column'}}> Numer indeksu:
          <input type="name" onChange={onChange} />
          </label>
          <button onClick={onSubmit}>Zaloguj się!</button>
        </div>
      )
  );
}
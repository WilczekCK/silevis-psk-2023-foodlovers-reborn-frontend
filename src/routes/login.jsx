import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";


export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const [userId, setUserId]  = useCookies('');

  function onSubmit() {
    setCookie(__cookieName, 'test');
  }

  return (
    cookies
      ? <Navigate replace to="/" />
      : <button onClick={onSubmit}>Login</button>
  );
}
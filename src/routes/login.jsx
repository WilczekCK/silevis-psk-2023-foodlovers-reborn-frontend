import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";


export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const [userId, setUserId]  = useCookies('');

  function onSubmit() {
    setCookie(__cookieName, {
      id: 21,
      name: 'pawel'
    });
    redirect('/');
  }

  return (
    cookies[__cookieName].name
      ? <Navigate replace to="/" />
      : <button onClick={onSubmit}>Login</button>
  );
}
import { Outlet, Link, useLoaderData, redirect, useNavigation, Route, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


export async function loader({ params }) {
//   const contacts = await getContacts();
//   return { contacts };
return [
    {id: 1, name: 'test'}
];
}

export default function Root() {
    const navigation = useNavigation();
    const { contacts } = useLoaderData();
    const [cookies, removeCookie] = useCookies([__cookieName]);

    function logout(){
        removeCookie(__cookieName);
        redirect('/login');
    }

    return (
        (!cookies || !cookies[__cookieName] || !cookies[__cookieName].name)
            ? <Navigate replace to="/login" />
            : (
                <>
                    <h2>Witaj {cookies[__cookieName].name}!</h2>
                    <button onClick={logout}>Logout</button>
                </>
            )
        
    )
    
}
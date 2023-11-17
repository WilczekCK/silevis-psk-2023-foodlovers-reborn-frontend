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
    const [cookies, setCookie] = useCookies([__cookieName]);

    return (
        !cookies
            ? <Navigate replace to="/login" />
            : <>DASHBOARD</> 
        
    )
    
}
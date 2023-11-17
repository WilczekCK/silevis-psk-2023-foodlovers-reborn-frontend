import { Outlet, Link, useLoaderData, redirect, useNavigation } from "react-router-dom";
import { useCookies } from 'react-cookie';


export async function loader({ params }) {
//   const contacts = await getContacts();
//   return { contacts };
console.log(params);

return [
    {id: 1, name: 'test'}
];
}

export default function Root() {
    const navigation = useNavigation();
    const { contacts } = useLoaderData();

    const [cookies, setCookie] = useCookies(['name']);

    function onChange() {
      setCookie('name', 'test');
    }

    return (
    <>
        <button onClick={onChange}>Cookie set!</button>
        hello worrld
    </>
    );
  }
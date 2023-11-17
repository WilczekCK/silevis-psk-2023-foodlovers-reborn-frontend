import { Outlet, Link, useLoaderData, redirect, useNavigation } from "react-router-dom";

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

    console.log(contacts);

    return (
    <>
        hello worrld
    </>
    );
  }
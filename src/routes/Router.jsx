import ErrorPage from './error-page';
import Login from './login.jsx';
import Informations from './informations.jsx';
import Applications from './applications.jsx';
import ApplicationsAdmin from './applicationsAdmin.jsx';
import PdfDocuments from './pdfDocuments.jsx';
import Root, { loader as rootLoader } from "./root";

export default function superrouter(createBrowserRouter){
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
        },
        {
            path: "login",
            element: <Login />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
        },
        {
            path: "pdfDocuments",
            element: <PdfDocuments />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
        },
        {
            path: "informations",
            element: <Informations />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
        },
        {
            path: "applications",
            element: <Applications />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
        },
        {
            path: "applicationsAdmin",
            element: <ApplicationsAdmin />,
            errorElement: <ErrorPage />,
            loader: rootLoader,
        },
        ]);

    return router;
}

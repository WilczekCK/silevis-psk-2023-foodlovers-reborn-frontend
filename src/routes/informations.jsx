import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";

export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const { t, i18n } = useTranslation();

  return (
    <>
        <Header />
        Super partia
    </>
  );
}
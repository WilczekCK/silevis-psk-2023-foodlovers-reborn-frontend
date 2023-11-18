import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import { Divider } from 'antd';
import { Button } from 'antd';
import HeadingWithInfo from '../components/HeadingWithInfo';
import ModalDate from '../components/ModalDate';
import ModalCompany from '../components/ModalCompany';
import { Modal } from 'antd';
import axios from 'axios'


export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);
  const { t, i18n } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModal, setIsSelectedModal] = useState(false);
    const [details, setDetails] = useState(false);

    async function fetchStudentInfo(id){
        const user = getItemById(id);
        setIsSelected(user);
        setDetailsLoading(true);
        setIsStudentSelected(false);
    
        await axios({
          url: `http://10.5.5.208:5158/api/Internship/GetByStudentId?id=${id}`
        }).then(async response => {
          
          if (response) {
            setIsStudentSelected(response.data)
    
            // Dla efektu :)
            setTimeout(function(){
              setDetailsLoading(false)
            }, 1500);
          }
          
        })
      }

    const handleSelectedModal = ({target}) => {
        let {name} = target.offsetParent;
        if(!name) name = target.name;

        console.log(name);
        setIsSelectedModal(name);
        showModal();
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (
    !isCookieAvailable || cookies[__cookieName].staffStatus > 0
        ? <Navigate replace to="/" />
        : <>
        <Header />
        <>
            <Modal width={'700px'} title={selectedModal == 'date' ? 'Wyślij prośbę o zmianę terminu' : 'Dodaj firme'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
                {selectedModal === 'date' && <ModalDate />}
                {selectedModal === 'company' && <ModalCompany />}
            </Modal>
        </>
        <div class="student__informations__container">
            <div class="student__informations__container__half">
                <h3>Dane studenta</h3>
                
                <Divider />

                <h4>Dane z uczelni</h4>
                
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Numer albumu" 
                        content={cookies[__cookieName].studentNumber} 
                    />

                    <HeadingWithInfo 
                        title="Kierunek" 
                        content={cookies[__cookieName].studentProgrammes[0].programme} 
                    />
                </div>

                <Divider />

                <h4>Dane osobowe</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Imię" 
                        content={cookies[__cookieName].firstName} 
                    />

                    <HeadingWithInfo 
                        title="Nazwisko" 
                        content={cookies[__cookieName].lastName} 
                    />

                    <HeadingWithInfo 
                        title="Adres e-mail" 
                        content={cookies[__cookieName].email} 
                    />
                </div>
            </div>

            <div class="student__informations__container__half">
                <h3>Dane praktyki zawodowej</h3>
                <Divider />

                <h4>Dane firmy</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Nazwa firmy" 
                        content="PLACEHOLDER"
                    />

                    <HeadingWithInfo 
                        title="Adres firmy" 
                        content="ul. PLACEHOLDEROWA 404"
                    />

                    <HeadingWithInfo 
                        title="Telefon kontaktowy" 
                        content="123 456 789"
                    />
                </div>

                <Divider />
                <h4>Dane firmy</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo title="Miesiąc praktyk" content="PLACEHOLDER"> 
                        <Button 
                            type="primary"
                            size="regular"
                            onClick={handleSelectedModal}
                            name="date"
                        >
                            Chcę zmienić termin 
                        </Button>
                    </HeadingWithInfo>

                    <HeadingWithInfo 
                        title="Termin praktyk" 
                        content="01.07 - 28.07"
                    />
                </div>

                <Divider />

                <HeadingWithInfo 
                        title="Status zaliczenia" 
                        content="W trakcie"
                />

                <Divider />

                <HeadingWithInfo 
                        title="Inna firma" 
                        content="Posiadasz doświadczenie zawodowe z innej firmy?"
                >
                    <Button 
                        type="primary"
                        size="regular"
                        onClick={handleSelectedModal}
                        name="company"
                    >
                        Dodaj firmę
                    </Button>
                </HeadingWithInfo>
            </div>
        </div>
    </>
  );
}
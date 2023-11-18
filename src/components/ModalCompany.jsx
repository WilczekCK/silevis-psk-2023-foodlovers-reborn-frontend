import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';

export default function ModalCompany(){
    const [cookie, setCookie, removeCookie] = useCookies([__cookieName]);
    const { t, i18n } = useTranslation();

    const [nip, setNip] = useState('');
    const [regon, setRegon] = useState('');
    const [krs, setKrs] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    
    return (
        <div className="company__modal">
            <p>W przypadku posiadania już doświadczenia zawodowego z własnej firmy, dodaj informację na jej temat. Wypełnij wniosek dokładnie.</p>

            <label>
              NIP:
              <Input type="number" min="0" placeholder="" value={nip} onChange={(e) => setNip(e.target.value)}/>
            </label>
            
            <Button type="primary">Spróbuj uzupełnić po NIP</Button>
            <label>
            Regon
            <Input type="number" min="0" placeholder="" value={regon} onChange={(e) => setRegon(e.target.value)} />
            </label>
            
            <label>
              KRS
              <Input type="number" min="0" placeholder="" value={krs} onChange={(e) => setKrs(e.target.value)} />
            </label>
            
            <label>
              Nazwa firmy
              <Input placeholder="" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
            </label>
            
            <label>
              Adres firmy
              <Input placeholder="" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)}/>
            </label>

            <Button type="primary">Wyślij</Button>
        </div>
    )
}
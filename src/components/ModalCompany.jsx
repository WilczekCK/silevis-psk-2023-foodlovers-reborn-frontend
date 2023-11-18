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

    const [value, setValue] = useState(() => dayjs('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  
    const onSelect = (newValue) => {
      setValue(newValue);
      setSelectedValue(newValue);
    };
  
    const onPanelChange = (newValue) => {
      setValue(newValue);
    };
    
    return (
        <div className="company__modal">
            <p>W przypadku posiadania już doświadczenia zawodowego z własnej firmy, dodaj informację na jej temat. Wypełnij wniosek dokładnie.</p>

            <label>
              NIP:
              <Input placeholder="" />
            </label>
            
            <Button type="primary">Spróbuj uzupełnić po NIP</Button>
            <label>
            Regon
            <Input placeholder="" />
            </label>
            
            <label>
              KRS
              <Input placeholder="" />
            </label>
            
            <label>
              Nazwa firmy
              <Input placeholder="" />
            </label>
            
            <label>
              Nazwa firmy
              <Input placeholder="" />
            </label>

            <Button type="primary">Wyślij</Button>
        </div>
    )
}
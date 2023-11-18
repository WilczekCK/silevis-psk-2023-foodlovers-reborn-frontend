import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import { Button } from 'antd';

export default function ModalDate(){
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
        <>
            <p>Wybierz odpowiadający Tobie termin i wyślij prośbę do Kierownika o zmianę dat odbywania praktyk.</p>
            
            <div style={{display:'flex', flexDirection:'row', gap:'20px'}}>
                <Button type="primary" size="regular"> Wybierz od </Button>
                <Button type="primary" size="regular"> Wybierz do </Button>
            </div>

            <Calendar style={{width:'40%'}} fullscreen={false} onPanelChange={onPanelChange} />
        </>
    )
}
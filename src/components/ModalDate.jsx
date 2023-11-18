import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import { Button } from 'antd';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { InputNumber, Space } from 'antd';
import { DatePicker } from 'antd';
import axios from 'axios'
const { RangePicker } = DatePicker;

export default function ModalDate(props){
    const [cookie, setCookie, removeCookie] = useCookies([__cookieName]);
    const { t, i18n } = useTranslation();
  
    const onSelect = (newValue) => {
      setValue(newValue);
      setSelectedValue(newValue);
    };
  
    const onPanelChange = (newValue) => {
      setValue(newValue);
    };

    const [dateFrom, setDateFrom] = useState(false);
    const [dateTo, setDateTo] = useState(false);
    function saveDate(k){
      setDateFrom(dayjs(k[0]['$d']).format('YYYY-MM-DD'));
      setDateTo(dayjs(k[1]['$d']).format('YYYY-MM-DD'));
    }

    function sendDelay(){
        axios({
          url: `http://10.5.5.208:5158/api/DelayRequest/Add`,
          method: "POST",
          data: {
            id: props.company.id,
            studentId: parseInt(cookie[__cookieName].id),
            requestedDateStart: dateFrom,
            requestedDateEnd: dateTo,
            approved: true
          }
        }).then(async response => {
          alert('sent!');
        })
    }
    
    return (
        <>
            <p>Wybierz odpowiadający Tobie termin i wyślij prośbę do Kierownika o zmianę dat odbywania praktyk.</p>
            
            <div style={{display:'flex', flexDirection:'row', gap:'20px', marginBottom: '20px'}}>
              <RangePicker showTime onChange={saveDate}/>
            </div>

            <Button onClick={sendDelay} type="primary">Wyślij</Button>
        </>
    )
}
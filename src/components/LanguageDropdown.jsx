import { useTranslation } from 'react-i18next';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Image } from 'antd';

import plFlag from '../assets/images/plFlag.png';
import enFlag from '../assets/images/enFlag.png';

export default function LanguageDropdown(){
    const { t, i18n } = useTranslation();
    
    const changeLanguageHandler = ({target}) =>
    {
      const {lang} = target;
      i18n.changeLanguage(lang)
    }

    const items = [
        {
          key: '1',
          label: (
            <a onClick={changeLanguageHandler} lang={"en"} style={{display: 'flex', alignItems: 'baseline'}}>
                <Image 
                  width="16px"
                  preview={false}
                  src={enFlag} 
                  style={{marginTop: '-3px'}}
                />
              <div style={{marginLeft: '5px'}}>{t('English')}</div>
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick={changeLanguageHandler} lang={"pl"} style={{display: 'flex', alignItems: 'baseline'}}>
                <Image 
                  width="16px"
                  preview={false}
                  src={plFlag} 
                  style={{marginTop: '-3px'}}
                />
              <div style={{marginLeft: '5px'}}>{t('Polish')}</div>
            </a>
          )
        },
      ];

    return (
        <Dropdown
        className="language_dropdown"
        menu={{ items }}
        trigger={['click']}  
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {t('SelectLanguage')}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    )
}
import { useTranslation } from 'react-i18next';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const items = [
    {
      key: '1',
      label: (
        <a>
          EN
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a>
          PL
        </a>
      ),
      disabled: true,
    },
  ];

export default function LanguageDropdown(){
    const { i18n } = useTranslation();
    
    const changeLanguageHandler = ({target}) =>
    {
      const {lang} = target;
      i18n.changeLanguage(lang)
    }

    return (
        <Dropdown
        className="language_dropdown"
        menu={{ items }}
        trigger={['click']}  
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    )
}
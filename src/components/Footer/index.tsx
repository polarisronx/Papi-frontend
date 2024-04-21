import { SHU_LINK } from '@/constants';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '上海大学智能设计实验室出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Shanghai University',
          title: 'SHU',
          href: SHU_LINK,
          blankTarget: true,
        },
        {
          key: 'github@polarisronx',
          title: <GithubOutlined />,
          href: 'https://github.com/polarisronx',
          blankTarget: true,
        },
        {
          key: 'School of Mechatronic Engineering and Automation',
          title: 'SMEA',
          href: 'https://auto.shu.edu.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

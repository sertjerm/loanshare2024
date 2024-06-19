// import React from 'react';
import { Button, Space, Menu, Dropdown, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const ResponsiveButtonGroup = ({ buttons }) => {
  buttons = ["Button 1", "Button 2", "Button 3", "Button 4", "Button 5", "Button 6"];
  const menu = (
    <Menu>
      {buttons.slice(4).map((button, index) => (
        <Menu.Item key={index + 4}>{button}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Space wrap>
      {buttons.slice(0, 4).map((button, index) => (
        <Tag key={index} type="primary">{button}</Tag>
      ))}
      {buttons.length > 4 && (
        <Dropdown overlay={menu} placement="bottomCenter">
          <Tag type="primary">
            ... <DownOutlined />
          </Tag>
        </Dropdown>
      )}
    </Space>
  );
};

export default ResponsiveButtonGroup;

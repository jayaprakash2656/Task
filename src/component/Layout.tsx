import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import Task from '../page/Task'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import './common.css'

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo off-logo">
            <span>{this.state.collapsed ? 'C' : 'Company Name'}</span>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Tasks
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Contact Us
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Task />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
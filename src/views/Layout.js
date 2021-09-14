import styles from './Layout.module.css';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Icon, Breadcrumb } from 'antd';
import Menu from '@/views/common/menu';

const { Header, Content, Sider } = Layout;
const DEFAULT_TITLE = 'React Learning';

export default function(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const history = useHistory();
  const location = useLocation();

  // 面包屑
  const subMenuTitle = location.state && location.state.subMenuName ? location.state.subMenuName : DEFAULT_TITLE;
  const itemTitle = location.state && location.state.itemName ? location.state.itemName : '';

  // 点击 Logo 回到首页
  const go = (path) => {
    history.push(path, { itemName: '', subMenuName: '' });
  };

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} breakpoint="lg" collapsedWidth="0" collapsed={isCollapsed} width="250">
        <div className={styles.logo} onClick={() => go('/')} />
        <Menu />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Icon
            className={styles.trigger}
            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => setIsCollapsed(!isCollapsed)}
          ></Icon>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>{subMenuTitle}</Breadcrumb.Item>
            <Breadcrumb.Item>{itemTitle}</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}

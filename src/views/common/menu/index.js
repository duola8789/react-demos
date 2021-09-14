/**
 * Created by zh on 2019/11/20.
 */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUrlToMenu } from '@/utils/hooks';
import { Menu, Icon } from 'antd';
import { menus } from '@/router';

// 一级菜单的 key 值
const rootSubmenuKeys = menus.map((menu) => !menu.hiddenInSider && menu.path);

export default function() {
  const config = {
    mode: 'inline',
    theme: 'dark'
  };

  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const history = useHistory();
  const routeToMenu = useUrlToMenu();

  // 点击菜单，收起其他展开的所有菜单
  const openChange = (openedKeys) => {
    const lastOpenKey = openedKeys.find((key) => !openKeys.includes(key));
    if (!rootSubmenuKeys.includes(lastOpenKey)) {
      setOpenKeys(openedKeys);
    } else {
      setOpenKeys(lastOpenKey ? [lastOpenKey] : []);
    }
  };

  // 根据 url 设定 导航栏状态
  useEffect(() => {
    const [submenuKey, selectedKeys] = routeToMenu;
    if (submenuKey) {
      setOpenKeys([submenuKey]);
      setSelectedKeys([selectedKeys]);
    }
  }, [routeToMenu]);

  // 点击跳转路由
  const changeRoute = ({ key: path, keyPath }) => {
    const menu = menus.find((menu) => menu.path === keyPath[1]);
    const item = menu.children.find((item) => item.path === keyPath[0]);
    history.push(path, { itemName: item.name, subMenuName: menu.name });
  };

  return (
    <Menu
      theme={config.theme}
      mode={config.mode}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={openChange}
      onClick={changeRoute}
    >
      {menus.map((menu) => {
        // 一级菜单标题
        const subMenuTitle = (
          <span>
            <Icon type={menu.icon} />
            <span>{menu.name}</span>
          </span>
        );

        // 二级菜单
        const Items = Array.isArray(menu.children)
          ? menu.children.map((item) => (
            <Menu.Item key={item.path}>
              <Icon type={item.icon || menu.icon} />
              {item.name}
            </Menu.Item>
          ))
          : null;

        return (
          <Menu.SubMenu key={menu.path} title={subMenuTitle}>
            {Items}
          </Menu.SubMenu>
        );
      })}
    </Menu>
  );
}

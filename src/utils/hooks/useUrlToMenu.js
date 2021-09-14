/**
 * 根据路由获得当前导航的一级菜单的 key 和二级菜单的 key
 * Created by zh on 2019/11/21.
 */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function() {
  const { pathname } = useLocation();
  const [menuObject, setMenuObject] = useState([]);

  useEffect(() => {
    const submenuKey = pathname.replace(/^(\/.+)\/.*$/, '$1');
    setMenuObject([submenuKey, pathname]);
  }, [pathname]);

  return menuObject;
}

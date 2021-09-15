/**
 * Created by zh on 2019/11/20.
 */
import Index from '@/views/common/Index';
import NotFound from '@/views/common/404';

import React16 from '@/views/Uncategorized/React16';
import Communication from '@/views/Uncategorized/Communication';
import RenderProps from '@/views/Uncategorized/RenderProps';
import ContextApi from '@/views/Uncategorized/ContextApi';

import Concepts from '@/views/Redux/Concepts';
import Middleware from '@/views/Redux/Middleware';
import ReactRedux from '@/views/Redux/React-Redux';
import CountDemoBySaga from '@/views/Redux/Redux-Saga/CountDemo';

import FetchAndRefresh from '@/views/HOC/FetchAndRefresh';
import CursorPosition from '@/views/HOC/CursorPosition';

import CountDemo from '@/views/Hooks/CountDemo';
import UseEffect from '@/views/Hooks/UseEffect';
import SnapshotOfUseEffect from '@/views/Hooks/SnapshotOfUseEffect';
import UseRef from '@/views/Hooks/UseRef';
import UseReducer from '@/views/Hooks/UseReducer';
import UseCallback from '@/views/Hooks/UseCallback';
import UseContext from '@/views/Hooks/UseContext';

import DexieTodoList from '@/views/Uncategorized/DexieTodoList';

import Dva from '@/views/Dva';

// 路由列表，一级目录的 path 用作 key
const fullRoutes = [
  {
    name: '未分类',
    icon: 'github',
    path: '/uncategorized',
    children: [
      {
        name: 'React 16',
        path: '/uncategorized/react16',
        component: React16
      },
      {
        name: '组件间通信',
        path: '/uncategorized/communication',
        component: Communication
      },
      {
        name: 'Render Props',
        path: '/uncategorized/render-props',
        component: RenderProps
      },
      {
        name: 'Context API',
        path: '/uncategorized/context-api',
        component: ContextApi
      },
      {
        name: 'Dexie Todo List',
        path: '/uncategorized/dexie-todo-list',
        component: DexieTodoList
      }
    ]
  },
  {
    name: 'Redux',
    icon: 'android',
    path: '/redux',
    children: [
      {
        name: '基本概念',
        path: '/redux/concepts',
        component: Concepts
      },
      {
        name: '中间件和异步操作',
        path: '/redux/middleware',
        component: Middleware
      },
      {
        name: 'React-Redux',
        path: '/redux/react-redux',
        component: ReactRedux
      },
      {
        name: 'Redux-Saga',
        path: '/redux/count-demo-saga',
        component: CountDemoBySaga
      }
    ]
  },
  {
    name: 'HOC',
    icon: 'apple',
    path: '/hoc',
    children: [
      {
        name: '获取数据和刷新',
        path: '/hoc/fetch-and-refresh',
        component: FetchAndRefresh
      },
      {
        name: '显示鼠标位置',
        path: '/hoc/cursor-position',
        component: CursorPosition
      }
    ]
  },
  {
    name: 'Hooks',
    icon: 'chrome',
    path: '/hooks',
    children: [
      {
        name: '计数器',
        path: '/hooks/count-demo',
        component: CountDemo
      },
      {
        name: 'useEffect',
        path: '/hooks/use-effect',
        component: UseEffect
      },
      {
        name: 'useEffect快照',
        path: '/hooks/snapshot-use-effect',
        component: SnapshotOfUseEffect
      },
      {
        name: 'useRef',
        path: '/hooks/use-ref',
        component: UseRef
      },
      {
        name: 'useReducer',
        path: '/hooks/use-reducer',
        component: UseReducer
      },
      {
        name: 'useCallback',
        path: '/hooks/use-callback',
        component: UseCallback
      },
      {
        name: 'useContext',
        path: '/hooks/use-context',
        component: UseContext
      }
    ]
  },
  {
    name: 'Dva',
    icon: 'qq',
    path: '/Dva',
    children: [
      {
        name: '基本概念',
        path: '/Dva/concepts',
        component: Dva
      }
    ]
  },
  {
    name: 'HOME',
    path: '/',
    component: Index,
    hiddenInSider: true
  },
  {
    name: 'NotFound',
    path: '*',
    component: NotFound,
    hiddenInSider: true
  }
];

// 用于侧边栏
const menus = fullRoutes.filter((route) => !route.hiddenInSider);

// 用于注册路由
const routes = fullRoutes.reduce((total, current) => {
  let route = [];
  if (current.children) {
    route = current.children.map((child) => ({
      path: child.path,
      component: child.component
    }));
  }
  if (current.path && current.component) {
    route.push({
      path: current.path,
      component: current.component
    });
  }
  return total.concat(route);
}, []);

export { menus, routes };

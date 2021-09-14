/**
 * Created By zh on 2019-03-19
 */
import React, { useState, useContext } from 'react';

// 创建一个 context 对象
const MyContext = React.createContext();

// Provider
const Provider = ({ children }) => {
  const [msg, setMsg] = useState('Hello Child');

  return (
    <MyContext.Provider value={{ msg, setMsg }}>
      <h2>Parent -- {msg}</h2>
      {children}
    </MyContext.Provider>
  );
};

// 不使用 useContext
// const Consumer  = MyContext.Consumer;
// const Child = () => {
//   return (
//     <Consumer>
//       {({ msg, setMsg }) => (
//         <button onClick={() => setMsg('Hello Parent')}>Child -- {msg}</button>
//       )}
//     </Consumer>
//   );
// };

// 使用 useContext
const Child = () => {
  const { msg, setMsg } = useContext(MyContext);

  return <button onClick={() => setMsg('Hello Parent')}>Child -- {msg}</button>;
};

export default function() {
  return (
    <Provider>
      <Child />
    </Provider>
  );
}

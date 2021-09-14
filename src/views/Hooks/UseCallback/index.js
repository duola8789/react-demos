/**
 * Created By zh on 2019-03-19
 */
import React, { useState, useEffect, useCallback } from 'react';

// 不使用 useCallback
// export default function () {
//   const [count1, setCount1] = useState(0);
//   const [count2, setCount2] = useState(100);
//
//   function fetch() {
//     console.log('fetch');
//     return count1 + 1000;
//   }
//
//   useEffect(() => {
//     console.log(fetch());
//   });
//
//   return (
//     <div>
//       <button onClick={() => setCount1(count1 + 1)}>Add Count1</button>
//       <button onClick={() => setCount2(count2 + 1)}>Add Count2</button>
//     </div>
//   );
// }

// 使用 useCallback + useMemo
export default function() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(100);

  const memoizedValue = count1 + 10;

  const fetch = useCallback(() => {
    console.log('fetch');
    return count1 + 1000;
  }, [count1]);

  useEffect(() => {
    fetch();
  }, [fetch, count1, count2]);

  return (
    <div>
      <h2>MemoizedValue {memoizedValue}</h2>
      <button onClick={() => setCount1(count1 + 1)}>Add Count1</button>
      <button onClick={() => setCount2(count2 + 1)}>Add Count2</button>
    </div>
  );
}

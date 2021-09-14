/**
 * Created By zh on 2019-03-19
 */
import React, { useState, useEffect } from 'react';

export default function() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // useEffect1
  useEffect(() => {
    setCount1(100);
    console.log(count1, 'useEffect1');
  }, [count1, count2]);

  // useEffect2
  useEffect(() => {
    if (count1 < 0) {
      setCount1(count1 + 1);
    }
    console.log(count1, 'useEffect2');
  }, [count1, count2]);

  return (
    <div>
      <p>{count1}</p>
      <button onClick={() => setCount2(count1 + 1)}>Add Count2</button>
    </div>
  );
}

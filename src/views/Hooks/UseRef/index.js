/**
 * Created By zh on 2019-03-19
 */
import React, { useEffect, useRef } from 'react';

export default function() {
  const count = useRef(1);

  // useEffect1
  useEffect(() => {
    // 赋值
    count.current = 100;
    console.log(count, 'useEffect1');
  });

  // useEffect2
  useEffect(() => {
    // 赋值
    count.current = 200;
    console.log(count, 'useEffect2');
  });

  return (
    <div>
      <p>{count.current}</p>
    </div>
  );
}

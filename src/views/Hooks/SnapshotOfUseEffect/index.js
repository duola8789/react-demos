/**
 * Created By zh on 2019-03-19
 */
import React, { useState } from 'react';

export default function() {
  const [count, setCount] = useState(1);

  const log = () => {
    setTimeout(() => {
      console.log(count);
    }, 3000);
  };

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          log();
          setCount(100);
        }}
      >
        Set future count
      </button>
    </div>
  );
}

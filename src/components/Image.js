/**
 * Created by zh on 2019/12/19.
 */
import React, { useEffect, useState } from 'react';
import defaultImage from '@/assets/images/default.jpg';
import { Spin } from 'antd';

export default function({ image, fetching }) {
  const [loading, setLoading] = useState(false);
  const src = image ? image : defaultImage;

  useEffect(() => {
    if (image) {
      setLoading(true);
    }
  }, [image]);

  const onload = () => {
    setLoading(false);
  };

  return (
    <Spin spinning={fetching || loading}>
      <img alt="" onLoad={onload} onError={onload} src={src} />
    </Spin>
  );
}

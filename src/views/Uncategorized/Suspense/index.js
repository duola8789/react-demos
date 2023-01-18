/**
 * Created by zh on 2022/9/8.
 */
import React, { Suspense } from 'react';
import { Spin } from 'antd';

const LazyComp = React.lazy(() => import('./remoteComp'));

export default function SuspenseComponent() {
  return (
    <Suspense fallback={<Spin />}>
      <LazyComp />
    </Suspense>
  );
}

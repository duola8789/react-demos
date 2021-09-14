/**
 * Created by zh on 2019/11/21.
 */
import React from 'react';
import notFoundImg from '@/assets/images/404.png';

const containerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center'
};

export default function NotFound() {
  return (
    <div style={containerStyle}>
      <img src={notFoundImg} alt="404" style={{ maxWidth: '600px' }} />
    </div>
  );
}

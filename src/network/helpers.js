/**
 * Created by zh on 2019/3/6.
 */
import { message } from 'antd';

export const get = (url, init) => {
  const config = {
    method: 'GET',
    ...init
  };
  return fetch(url, config)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('response status: ' + res.status);
    })
    .catch((e) => {
      message.error(e.message);
    });
};

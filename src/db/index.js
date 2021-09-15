/**
 * Created by zh on 2021/9/15.
 */
import Dexie from 'dexie';

const db = new Dexie('todo_db');

db.version(1).stores({
  items: '++id, content, done, updatedTime'
});

export default db;

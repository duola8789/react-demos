/**
 * Created by zh on 2019/10/22.
 */
export class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, cb) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(cb);
  }

  emit(name, ...params) {
    if (!this.events[name]) {
      return;
    }
    this.events[name].forEach((cb) => cb(...params));
  }

  off(name) {
    if (!this.events[name]) {
      return;
    }
    this.events[name] = [];
  }
}

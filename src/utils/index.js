/**
 * Created by zh on 2019/10/22.
 */
import { EventEmitter } from './EventEmitter';
const EventEmitter3 = require('eventemitter3');

const event = new EventEmitter();
const event3 = new EventEmitter3();

const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export { event, event3, delay };

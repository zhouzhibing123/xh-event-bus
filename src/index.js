/*
 * @Author: xingzhonghe
 * @Date: 2022-11-10 09:54:28
 * @LastEditTime: 2022-11-10 11:39:42
 * @FilePath: \learn_class_componentsd:\学习东东\my package\npm package\xh-event-bus\src\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by ZhouZhiBing123 3030639099@QQ.COM, All Rights Reserved. 
 */
class _EventBus {
    constructor() {
        // Event Bus
        this.listeners = {}
    }

    type(target, type) {
        if (typeof target === type) return true
        return false
    }

    throwError(err = 'Incoming parameter error') {
        throw new TypeError(err);
    }

    getCurrentEvents(eventName) {
        return Reflect.get(this.listeners, eventName);
    }

    addEventToBus(eventName, callBack, once) {
        const { type } = this
        let events = this.getCurrentEvents(eventName);

        // Judge whether the event bus exists
        if (type(events, 'undefined')) {
            this.listeners[eventName] = new Array({ callBack, once });
        } else {
            this.listeners[eventName].push({ callBack, once })
        }
    }

    $on(eventName, callBack) {
        const { type } = this
        // Boundary judgement
        if (!type(eventName, 'string') || !type(callBack, 'function')) this.throwError();

        this.addEventToBus(eventName, callBack, false);
    }

    $once(eventName, callBack) {
        const { type } = this
        // Boundary judgement
        if (!type(eventName, 'string') || !type(callBack, 'function')) this.throwError();

        this.addEventToBus(eventName, callBack, true);
    }

    $emit(eventName, ...arg) {
        const { type } = this;
        // Boundary judgement
        if (!type(eventName, 'string')) this.throwError();

        const events = this.getCurrentEvents(eventName);

        if (type(events, 'undefined')) this.throwError('The current event does not have any callbacks that can be executed. I think you should not use $on to add an event?');

        arg === undefined ? arg = [] : arg

        // Trigger time
        events.forEach((item, index) => {
            item.callBack(...arg)
            if (item.once) events.splice(index, 1)
        });
    }

    $off(eventName, callBack) {
        const { type } = this
        // Judge whether there are parameters
        if (type(eventName, 'undefined') && type(callBack, 'undefined')) {
            this.listeners = {} // 移除所有事件
            return false
        }

        if (!type(eventName, 'undefined' && type(callBack, 'undefined'))) {
            delete this.listeners[eventName]
            return false;
        }

        const events = this.getCurrentEvents(eventName);
        events.forEach((item, index) => {
            if (item.callBack === callBack) this.listeners[eventName].splice(index, 1)
        })
    }
}

module.exports = {
    _EventBus
}
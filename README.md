# XH-EVENT-BUS

#### description：Simulate the event bus implemented by vue2. You can use it just like using the event bus of vue! And there is no need to introduce vue dependency package!

### Useing

1、install

- npm install xh-event-bus -D（recommend）
- yarn add xh-event-bus
- cnpm install xh-event-bus -D

1、require xh-event-bus

```javascript
const { _EventBus } = require('xh-event-bus')
// or:
import { _EventBus } from 'xh-event-bus'
```

2、

```javascript
// Add an event callback to the event bus named T
e.$on('T', function(...arg) {
    console.log(arg)
}) 

// Add an event callback to the event bus named T, but the event will be destroyed after it is triggered once
e.$once('T', function(...arg) {
    console.log(arg, 'once')
})

// Both callbacks are called
e.$emit('T', 123, 3)
// The callback added by once will not be called
e.$emit('T', 123, 3)

// off classification:
// 1、No parameters are passed in, destroy all event buses
// 2、The eventName is passed in, and all event callbacks of the current event are destroyed
// 3、The eventName and callback are passed in to destroy the current callback of the current event
e.$off('T')

//An error is reported because all events have been uninstalled
e.$emit('T')
```

Because this library is completed against the event bus of vue2, you can click https://v2.cn.vuejs.org/v2/api/#vm-on for more information

You can also use it in multiple javascript modules, just point your reference to the same instance
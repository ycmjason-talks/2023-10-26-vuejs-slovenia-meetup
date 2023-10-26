import { reactive, watchEffect } from './reactivity.js';

const counter = reactive({ x: 0 });

watchEffect(() => {
  console.log(counter.x);
});

setInterval(() => {
  counter.x += 1;
}, 1000);

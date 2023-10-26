import { reactive, ref, computed, watchEffect } from './reactivity.js';

const counter = reactive({ x: 0 });
const counter2 = ref(0); // { value: 0 }
const double = computed(() => counter.x * 2); // { value: counter.x * 2 }

watchEffect(() => {
  console.log('counter:', counter.x);
});

watchEffect(() => {
  console.log('double:', double.value);
});

watchEffect(() => {
  console.log('counter2:', counter2.value);
});

setInterval(() => {
  counter.x += 1;
}, 1000);

setInterval(() => {
  counter2.value += 1;
}, 500);

# VueJS-Slovenia: Recreating Vue’s Reactivity System

This talk was given on 26 Oct 2023 at Vue.js Slovenia meetup hosted in Ljublyana.

## Live-coding link

## Description

- This aims to demonstrate how we could use proxy to build functionality similar to `reactive`, `ref`, `watchEffect` and `computed` in Vue.
- The current implementation is incomplete and differs to Vue's reactivity:
  - current implementation only has shallow reactivity
  - current implementation's `watchEffect` will not update dependencies after the first run
  - current implementation's `computed`'s ref is mutable
  - many more...

## Author

Jason Yu

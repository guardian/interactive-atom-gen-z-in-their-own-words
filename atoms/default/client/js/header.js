let animatableAll = document.querySelectorAll('.animatable-grid-el');
let delays = [0, 3200, 5900, 5600, 3600, 6200, 7700, 10900];
animatableAll.forEach((el, i) => {

  const interval = 14000;
  const delay = delays[i] + 3000;
  console.log(el, delay);

  el.dataset.delay = delay;
  el.dataset.interval = interval;

  switchMode(el);
  setTimeout(() => {
    switchMode(el);
  }, delay);

  setInterval(() => {
    setTimeout(() => {
      switchMode(el);
    }, delay);
  }, interval);

});


function switchMode(el) {
  if (el.dataset.state == 'photo-1') {
    console.log('switching to 2');
    el.dataset.state = 'photo-2';
  } else {
    el.dataset.state = 'photo-1';
  }
}

let animatableAll = document.querySelectorAll('.animatable-grid-el');
let delays = [1200, 4500, 4800, 6800, 7100, 7400, 8900, 10200];
animatableAll.forEach((el, i) => {

  const interval = 12000;
  const delay = delays[i];
  console.log(el, delay);

  el.dataset.delay = delay;
  el.dataset.interval = interval;

  switchMode(el);
  setTimeout(() => {
    switchMode(el);
    setInterval(() => {
      switchMode(el);
    }, interval);
  }, delay);

});


function switchMode(el) {
  if (el.dataset.state == 'photo-1') {
    console.log('switching to 2');
    el.dataset.state = 'photo-2';
  } else {
    el.dataset.state = 'photo-1';
  }
}

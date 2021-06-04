let filterBtnAll = document.querySelectorAll('[data-toggles]');
let iRoot = document.querySelector('.europe-gen-z__document');

filterBtnAll.forEach((filterBtn) => {
  filterBtn.addEventListener('click', () => {
    if (filterBtn.classList.contains('scroll-to-top')) {
      scrollToStart();
    }
    let topic = filterBtn.dataset.toggles;
    let activeTopic = iRoot.dataset.topic;
    if (topic == activeTopic) {
      iRoot.dataset.topic = 'all';
    } else {
      iRoot.dataset.topic = topic;
    }
  });
})

document.querySelector('.europe-gen-z__filters__scroll-to-top').addEventListener('click', () => {
  scrollToStart();
})

function scrollToStart() {
  let t = document.querySelector('.europe-gen-z__filters').offsetTop;
  window.scrollTo({ top: t, behavior: 'smooth' })
}

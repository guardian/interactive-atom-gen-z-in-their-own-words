let filterBtnAll = document.querySelectorAll('[data-toggles]');
let iRoot = document.querySelector('.europe-gen-z__document');

filterBtnAll.forEach((filterBtn) => {
  filterBtn.addEventListener('click', () => {
    let topic = filterBtn.dataset.toggles;
    let activeTopic = iRoot.dataset.topic;
    if (topic == activeTopic) {
      iRoot.dataset.topic = 'all';
    } else {
      iRoot.dataset.topic = topic;
    }
  });
})

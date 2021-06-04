let audioSetupInterval = setInterval(() => {
  if (document.body.classList.contains('gen-z__loaded')) {
    clearInterval(audioSetupInterval);
    setupAudio();
  }
}, 10);

function setupAudio() {
  const audioAll = document.querySelectorAll('.entry__audio:not(.empty)');
  audioAll.forEach((aEl) => {
    const audioSrcEl = aEl.querySelector('audio');
    const nowEl = aEl.querySelector('.entry__audio__duration');

    aEl.addEventListener('click', () => {
      togglePlay(aEl);
    });
    audioSrcEl.addEventListener('loadedmetadata', () => {
      updateTimestamp(aEl, audioSrcEl);
    });
    audioSrcEl.addEventListener('timeupdate', () => {
      // let d = audioSrcEl.duration;
      // let c = audioSrcEl.currentTime;
      // let r = c / d * 100;
      // nowEl.style.left = `${r}%`
      updateTimestamp(aEl, audioSrcEl);
    });
    audioSrcEl.addEventListener('ended', () => {
      nowEl.style.left = `0`
      aEl.classList.remove('playing')
      updateTimestamp(aEl, audioSrcEl);
    })
  })
}

function updateTimestamp(aEl, audioSrcEl) {
  const timeEl = aEl.querySelector('.entry__audio__duration');
  let stamp;
  if (audioSrcEl.currentTime > 0) {
    stamp = toAudioTimestamp(audioSrcEl.currentTime);
  } else {
    stamp = toAudioTimestamp(audioSrcEl.duration);
  }
  timeEl.innerText = stamp;
}

function togglePlay(aEl) {
  const aAudioEl = aEl.querySelector('audio');
  if (aEl.classList.contains('playing')) {
    aAudioEl.pause();
    aEl.classList.remove('playing');
  } else {
    aAudioEl.play();
    aEl.classList.add('playing');
  }
};

function toAudioTimestamp(t) {
  const full = Math.round(t);
  const m = Math.floor(t / 60);
  let s = full - m * 60;
  s = (s > 9 ? s : `0${s}`);
  return `${m}:${s}`;
}

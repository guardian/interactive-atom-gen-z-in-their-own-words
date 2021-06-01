updateContent("https://interactive.guim.co.uk/docsdata-test/1CTRE2s_pAl-GbvyF0TTyLg6fmGP11AKoVJQHSzBMtxs.json");


function updateContent(jsonLink, tabName = 'Sheet1') {

  loadJSON(jsonLink, function (rawData) {
    let data = rawData.sheets[tabName];
    data = data.filter((d) => {
      return (d.Name !== '');
    });

    const contentRoot = document.querySelector('.europe-gen-z__content');
    const entryPrototype = contentRoot.querySelector('.europe-gen-z__content__entry')

    data.forEach((d) => {
      makeEntry(d, entryPrototype, contentRoot);
    });

  });

}

function makeEntry(data, ePrototype, cRoot) {
  let e = document.createElement('div');
  e.classList.add('entry');
  e.classList.add('europe-gen-z__content__entry');
  e.innerHTML = ePrototype.innerHTML;

  // Name
  e.querySelector('.entry__name-age').innerText = data.Name;

  // Age
  if (data.Age) {
    e.querySelector('.entry__name-age').innerText += `, ${data.Age}`;
  }

  // First-line
  if (data['First-line']) {
    e.querySelector('.entry__occupation').innerText = data['First-line'];
  }

  // Quote
  if (data['Quote']) {
    e.querySelector('.entry__quote').innerText = data['Quote'];
  }

  // Intro
  if (data['Intro']) {
    e.querySelector('.entry__intro').innerText = data['Intro'];
  }


  // Continuation





  // Categories
  // to-do

  cRoot.appendChild(e);
}

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success)
          success(JSON.parse(xhr.responseText));
      } else {
        if (error)
          error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}


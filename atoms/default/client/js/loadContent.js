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

    document.body.classList.add('gen-z__loaded');

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
    e.querySelector('.entry__quote').classList.remove('empty');
  }

  // Intro
  if (data['Intro']) {
    e.querySelector('.entry__intro').innerText = data['Intro'];
  }

  // Continuation
  if (data['Continuation']) {
    let cText = data['Continuation'];
    cText = cText.trim();
    cText = cText.split('\n\n').join('\n');
    cText = cText.split('\n').join('</p><p>');
    cText = `<p>${cText}</p>`;
    e.querySelector('.entry__more__continuation').innerHTML = cText;
  }

  if (data['Photo']) {
    let iEl = document.createElement('img');
    const iUrl = data['Photo'].trim();
    const iUrlHi = iUrl.split('.jpg').join('@2x.jpg');
    iEl.setAttribute('loading', 'lazy');
    iEl.setAttribute('src', iUrl);
    iEl.setAttribute('srcset', `${iUrl} 220w, ${iUrlHi} 440w`);
    e.querySelector('.entry__photo').appendChild(iEl);
    e.querySelector('.entry__photo').classList.remove('empty');
  }

  // Big on desktop
  if (data['Boosted'] === 'TRUE') {
    e.classList.add('boosted')
  }

  // Optimistic about the future
  if (data['Optimistic'] === 'TRUE') {
    e.querySelector('.entry__optimistic .response').innerText = 'Yes';
  } else if (data['Optimistic'] === 'FALSE') {
    e.querySelector('.entry__optimistic .response').innerText = 'No';
  }

  // Categories
  if (data['Psychological'] === 'TRUE') {
    e.classList.add('psychological');
  }
  if (data['Education-jobs'] === 'TRUE') {
    e.classList.add('education');
  }
  if (data['Relationships'] === 'TRUE') {
    e.classList.add('relationships');
  }
  if (data['Big-issues'] === 'TRUE') {
    e.classList.add('issues');
  }
  if (data['GenZ-solutions'] === 'TRUE') {
    e.classList.add('solutions');
  }

  // Audio
  if (data['AudioFile']) {
    const aUrl = data['AudioFile'].trim();
    if (aUrl.indexOf('http') == 0 && aUrl.endsWith('.mp3')) {
      let aWrapper = e.querySelector('.entry__audio');
      aWrapper.classList.remove('empty');
      aWrapper.querySelector('.name').innerText = data['Name'];

      let aEl = document.createElement('div');
      aEl.classList.add('.entry__audio__audio-el');
      aEl.innerHTML = `<audio autobuffer preload="metadata"><source src='${aUrl}' type='audio/mpeg'></audio>`;
      aWrapper.appendChild(aEl);
    }

  }

  cRoot.appendChild(e);

  allowExpand(e);
}


function allowExpand(e) {
  let btn = e.querySelector('.entry__more__control');
  btn.addEventListener('click', () => {
    e.classList.toggle('expanded');
  })
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



const tmpPhotos = ['https://uploads.guim.co.uk/2021/06/01/Abigail-Taylor.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Alba-Fernandez.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Alex.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Alexander-Young.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Alexis-Kay.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Alfie-Robinson.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Ali-Mohammad-Azimi.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Alina-Dieth.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Andrea-Carta.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Andrea-Coghe.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Anete-Strupule.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Angela-Cucovei.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Anthony-Pansard.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Antje-Fischbach.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Astrid-Robertson.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Ava-Ayala-Rosenbaum.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Ben-Morris.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Cameron-Dorling.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Chloe-Lassel.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Cinzia-Sargheddu.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Clara-Gonzalez-Espelt.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Daniel-Pye.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Darragh-Nolan.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Debbie-Curtius.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Elina-Dibtseva.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Eloise-Queally.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Emil-Biese.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Emilia-Mason.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Giorgos-Stamatis.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Giulia.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Gwendolyn-Amey.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Heather-Storgaard.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Ingrid-Oja.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Isabell-Koch.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Jamina.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Josep-Montserrat.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Katie-Quirk.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Kunsh-Puranit.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Lev-Pavlovski.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Lukas-Chalupa.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Luqman-Wadood.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Marie-Antonietta.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Mariska-Faasen.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Mark-Lehman.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Mathias-Montesano.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Merel-Hol.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Mounir.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Nabrissa-Badu.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Nick-Davids.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Nicoleta-Ghita.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Olivia-Grace-Smith.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Osker.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Patrizia-Buosi.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Ruaidhri-O-Conaill.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Sabini-Bebcakova.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Saga-Jonsson.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Sam-OSullivan.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Sara-Besme-Shabib.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Shashank-Palety.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Simone.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Sunaina-Mathapati.jpg',
  'https://uploads.guim.co.uk/2021/06/01/Vova.jpg']

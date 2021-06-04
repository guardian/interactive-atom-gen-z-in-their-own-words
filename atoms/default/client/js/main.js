
setTimeout(() => {
  if (window.resize) {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    html.style.overflow = 'hidden'
    html.style.margin = '0px'
    html.style.padding = '0px'

    body.style.overflow = 'hidden'
    body.style.margin = '0px'
    body.style.padding = '0px'

    window.resize()
  }
}, 100)

const scriptAll = ['loadContent', 'filter', 'audio'];
scriptAll.forEach((sName) => {
  var el = document.createElement('script');
  el.src = `<%= atomPath %>/${sName}.js`;
  document.body.appendChild(el);
})


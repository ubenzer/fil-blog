import offset from 'document-offset'

const mainContentDOM = document.querySelector('.main-container')
const mainContentTop = offset(mainContentDOM).top

const appBarDOM = document.querySelector('.app-bar')
const appBarHeight = appBarDOM.clientHeight

let isOpaque = false

const checkAndMakeOpaque = () => {
  const shouldBeOpaque = window.scrollY > mainContentTop - appBarHeight
  if (shouldBeOpaque && !isOpaque) {
    window.requestAnimationFrame(() => {
      appBarDOM.classList.add('app-bar_opaque')
      isOpaque = true
    })
  }

  if (!shouldBeOpaque && isOpaque) {
    window.requestAnimationFrame(() => {
      appBarDOM.classList.remove('app-bar_opaque')
      isOpaque = false
    })
  }
}

const initAppBarOpacity = () => {
  window.addEventListener('scroll', checkAndMakeOpaque)
}

export {initAppBarOpacity}

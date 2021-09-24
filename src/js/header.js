function initMenu() {
  const menu = document.querySelector('.js-menu')
  const button = menu.querySelector('.js-opener')
  const content = menu.querySelector('.js-content')
  const overlay = menu.querySelector('.js-overlay')

  let isOpen = false

  button.addEventListener('click', open)
  overlay.addEventListener('click', close)
  content.addEventListener('click', closeAfterInnerClick)
  window.addEventListener('resize', closeAfterResize)

  function open() {
    isOpen = true

    addShowClasses()
    addNoScroll()
  }

  function close() {
    isOpen = false

    addHideClasses()
    removeShowClasses()

    content.addEventListener('animationend', removeClasses)

    function removeClasses() {
      removeHideClasses()
      removeNoScroll()
      content.removeEventListener('animationend', removeClasses)
    }
  }

  function closeAfterInnerClick(event) {
    const target = event.target

    if (target.closest('a') && content.contains(target)) {
      close()
    }
  }

  function closeAfterResize(event) {
    const target = event.target

    if (target.innerWidth > 991 && isOpen) {
      isOpen = false

      removeShowClasses()
      removeHideClasses()
      removeNoScroll()
    }
  }

  function addShowClasses() {
    content.classList.add('header__menu-content_visible')
    overlay.classList.add('header__menu-overlay_visible')
  }

  function removeShowClasses() {
    content.classList.remove('header__menu-content_visible')
    overlay.classList.remove('header__menu-overlay_visible')
  }

  function addHideClasses() {
    content.classList.add('header__menu-content_hidden')
    overlay.classList.add('header__menu-overlay_hidden')
  }

  function removeHideClasses() {
    content.classList.remove('header__menu-content_hidden')
    overlay.classList.remove('header__menu-overlay_hidden')
  }

  function addNoScroll() {
    document.body.classList.add('no-scroll')
  }

  function removeNoScroll() {
    document.body.classList.remove('no-scroll')
  }
}

initMenu()

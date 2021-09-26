function initMenu() {
  const menu = document.querySelector('.js-menu')
  const button = menu.querySelector('.js-opener')
  const content = menu.querySelector('.js-content')
  const overlay = menu.querySelector('.js-overlay')

  let isOpen = false

  button.addEventListener('click', open)
  overlay.addEventListener('click', close)
  content.addEventListener('click', closeAfterInnerClick)
  window.addEventListener('resize', _.debounce(closeAfterResize, 500))

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
    if (!isOpen) return

    const target = event.target

    if (target.innerWidth > 991) {
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

function initHeader() {
  const header = document.querySelector('.js-header')
  const firstSection = document.querySelector('.section')

  let isFixed = false
  let maxScrollTop = calcMaxScrollTop()
  let lastScrollTop = getScrollTop()

  init()

  window.addEventListener('scroll', event => {
    const curScrollTop = getScrollTop()

    if (!isFixed && curScrollTop > maxScrollTop && curScrollTop < lastScrollTop) {
      fix()
    } else if (isFixed && curScrollTop > maxScrollTop && curScrollTop > lastScrollTop) {
      unFix()
    } else if (isFixed && curScrollTop < maxScrollTop) {
      unFix()
    }

    lastScrollTop = curScrollTop
  })

  window.addEventListener('resize', event => {
    maxScrollTop = calcMaxScrollTop()
    lastScrollTop = getScrollTop()
    init()
  })

  function init() {
    if (!isFixed && lastScrollTop > maxScrollTop) {
      fix()
    } else if (isFixed && lastScrollTop < maxScrollTop) {
      unFix()
    }
  }

  function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop
  }

  function calcMaxScrollTop() {
    const headerHeight = header.offsetHeight
    const firstSectionHeight = firstSection.offsetHeight
    const firstSectionTop = firstSection.offsetTop

    return firstSectionTop + firstSectionHeight - headerHeight
  }

  function fix() {
    isFixed = true
    header.classList.add('header_fixed')
    header.classList.add('header_fixed_visible')
  }

  function unFix() {
    isFixed = false
    header.classList.remove('header_fixed_visible')
    header.classList.add('header_fixed_hidden')

    header.addEventListener('animationend', removeClass)

    function removeClass() {
      header.classList.remove('header_fixed_hidden')
      header.classList.remove('header_fixed')
      header.removeEventListener('animationend', removeClass)
    }
  }
}

initHeader()
initMenu()

initDropdowns()

function initDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll('.js-dropdown'))

  dropdowns.forEach(init)

  function init(el) {
    const dropHeader = el.querySelector('.dropdown__header')
    const dropBody = el.querySelector('.dropdown__body')

    // let containerHeight = el.getBoundingClientRect().height
    const padding = parseInt(getComputedStyle(el).padding)
    let dropHeaderHeight = dropHeader.getBoundingClientRect().height
    let dropBodyHeight = dropBody.getBoundingClientRect().height

    let isOpen = false

    setHeight()

    dropHeader.addEventListener('click', event => {
      el.classList.toggle('dropdown_open')
      isOpen = !isOpen

      setHeight()
    })

    window.addEventListener('resize', _.debounce(e => {
      console.log('recalc')
      dropHeaderHeight = dropHeader.getBoundingClientRect().height
      dropBodyHeight = dropBody.getBoundingClientRect().height

      setHeight()
    }, 200))

    function setHeight() {
      if (isOpen) {
        el.style.height = dropHeaderHeight + dropBodyHeight + padding * 2 + 'px'
      } else {
        el.style.height = dropHeaderHeight + padding * 2 + 'px'
      }
    }
  }
}

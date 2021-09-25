initCounters()

function initCounters() {
  const duration = 2500
  const frameTime = 1000 / 60
  const framesCount = Math.ceil(duration / frameTime)
  const elements = Array.from(document.querySelectorAll('.js-counter'))

  elements.forEach(initCounter)

  function initCounter(el) {

    let isActivated = false


    if (!isActivated && isInViewport()) {
      run()
    } else if (!isActivated && !isInViewport()) {
      document.addEventListener('scroll', onScroll)
    }

    function onScroll(event) {
      if (isInViewport()) {
        run()
        document.removeEventListener('scroll', onScroll)
      }
    }

    function isInViewport() {
      const rect = el.getBoundingClientRect()

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }

    function run() {
      isActivated = true

      const endValue = +el.dataset.value
      const step = endValue / framesCount

      let value = 0
      let run

      start()

      function start() {
        run = requestAnimationFrame(start)

        value = value + step
        el.textContent = Math.floor(value)

        if (Math.floor(value) >= endValue) {
          el.textContent = endValue
          cancelAnimationFrame(run)
        }
      }
    }
  }
}

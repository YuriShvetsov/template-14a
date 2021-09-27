import Swiper, { Navigation, Pagination } from 'swiper'

Swiper.use([Navigation, Pagination])

const slider = new Swiper('.js-quotes-slider', {
  slidesPerView: 'auto',
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 'auto',
    },
    991: {
      centeredSlides: false
    }
  }
})


import Swiper, { Navigation, Pagination } from 'swiper'

Swiper.use([Navigation, Pagination])

const slider = new Swiper('.js-blog-slider', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  spaceBetween: 20
})

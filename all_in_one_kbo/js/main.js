$(function () {

/*   let swiper2 = new Swiper(".score", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    
    pagination: {
      el: ".score .swiper-pagination",
      clickable: true,
    },
  });

  let swiper1 = new Swiper(".mySwiperbanner", {
    loop: true,
    navigation: {
      nextEl: ".mySwiperbanner .swiper-button-next",
      prevEl: ".mySwiperbanner .swiper-button-prev",
    },
    
    thumbs: {
      swiper: swiper,
    },
    
  }); */

  /* swiper1.controller.control = swiper2;
  swiper2.controller.control = swiper1; */



  let swiper = new Swiper(".mySwiperscore", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  let swiper2 = new Swiper(".mySwiperbanner", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

  
  let newswiper = new Swiper(".newslistmySwiper", {
    slidesPerView: 'auto',
    loop:true,
    spaceBetween: 16,
    // centeredSlides: true,
    pagination: {
      el: " .swiper-pagination",
      clickable: true,
    },
  });

  
});


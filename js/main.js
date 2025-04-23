$(function () {

  gsap.registerPlugin(ScrollTrigger);


  /* banner > motion1 > motion2 부드럽게 넘기는 모션 */

  const sectionscroll = document.querySelectorAll('.banner, .motion');
  let currentIndex = 0;
  let isScrolling = false;
  let isMotionScrolling; // 스크롤 중복 방지
  window.addEventListener('wheel', function (e) {
    // 현재 화면 기준으로 .banner 또는 .motion이 보이는지 체크
    const currentSection = Array.from(sectionscroll).find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    });

    if (!currentSection) return; // 대상 섹션 안에 없으면 무시
    if (isScrolling) return;

    const delta = e.deltaY;

    if (delta > 0 && currentIndex < sectionscroll.length - 1) {
      currentIndex++;
    } else if (delta < 0 && currentIndex > 0) {
      currentIndex--;
    } else {
      return;
    }

    isScrolling = true;

    sectionscroll[currentIndex].scrollIntoView({
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }, { passive: false });




  // motion 섹션을 pin 처리하고 motion1 → motion2 전환
  gsap.timeline({
    scrollTrigger: {
      trigger: ".motion",
      start: "top top",
      end: "+=200%",  // motion 길이 조정 (100%당 한 화면)
      scrub: true,
      pin: true,
      anticipatePin: 1,

    }
  })
    .fromTo(".motion .motion1",
      { opacity: 1, scale: 6 },
      { opacity: 0, scale: 1, duration: 3 }
    )
    .fromTo(".motion .motion2",
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 1 }, "<50%");





  /* motion2 심플리스크롤 */


  $('.motion_scrolls .motion_scroll1').simplyScroll({
    speed: 5,
    direction: 'forwards',
  });
  $('.motion_scrolls .motion_scroll2').simplyScroll({
    speed: 5,
    direction: 'forwards',
  });
  $('.motion_scrolls .motion_scroll3').simplyScroll({
    speed: 5,
    direction: 'forwards',
  });
  $('.motion_scrolls .motion_scroll4').simplyScroll({
    speed: 5,
    direction: 'forwards',
  });

  /* motion2 마우스 */

  document.addEventListener('mousemove', function (e) {
    const motionImg = document.querySelector('.motion_img2');
    motionImg.style.top = `${e.clientY}px`;
    motionImg.style.left = `${e.clientX}px`;
  });


  /* info 가로스크롤 */

  const horizontal = document.querySelector('.horizontal');
  const sections = gsap.utils.toArray('.horizontal>section');
  let ani = [];
  const scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1), //전체 섹션 수만큼 왼쪽으로 밀기
    ease: 'none', //부드럽게 넘기지 않고 스크롤에 따라 반응
    scrollTrigger: {
      trigger: horizontal,
      start: 'top top', //스크롤이 맨 위에 닿을 때 시작
      end: () => "+=" + (horizontal.offsetWidth - innerWidth), //스크롤 끝나는 위치 계산
      pin: true, //해당 부분에서 화면을 고정해서 보여줌
      scrub: 1, //스크롤에 따라 실시간으로 움직임
      anticipatePin: 1, // 핀 고정 시 살짝 미리 준비해서 부드럽게
      invalidateOnRefresh: true, // 새로고침하면 위치 다시 계산해줌
    }
  })







  /* skill 그라데이션 */


  gsap.timeline({
    scrollTrigger: {
      trigger: '.skill',
      start: 'top 5%',
      end: 'bottom bottom',
      scrub: true,
    }
  }).to('.skill_gr1', {
    backgroundSize: '100%',
    duration: 1,
    ease: 'none',
  }).to('.skill_gr2', {
    backgroundSize: '100% ',
    duration: 1,
    ease: 'none',
  }, '+=0.6')
  .to('.skill_gr3', {
    backgroundSize: '100% ',
    duration: 1,
    ease: 'none',
  }, '+=1.2')
  .to('.skill_gr4', {
    backgroundSize: '100%',
    duration: 1,
    ease: 'none',
  }, '+=1.8')



  let meritswiper = new Swiper(".merit_project", {
    slidesPerView: 'auto',
    centeredSlides: false,
    grabCursor: true,
    loop: true,
    resistanceRatio: 0,
    allowTouchMove: true,
    autoplay: {
      delay: 2000,
    }

  });


/* project on click */

$('.project_list .book_kbo').click(function(){
  $('.project_view .book_kbo').toggleClass('on')
})

$('.project_list .book_chahong').click(function(){
  $('.project_view .book_chahong').toggleClass('on')
})

  /* project swiper */


  let projectswiper = new Swiper(".project_list_all", {
    direction: "vertical",
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 10,
      stretch: 10,
      depth: 0,
      modifier: 1,
      slideShadows: true,
    },
  });

  






  /* contact 마우스 클릭 이벤트 */
  $('.contact_list> li').click(function () {
    $(this).toggleClass('on')
  })

  AOS.init();
})


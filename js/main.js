$(function () {

  gsap.registerPlugin(ScrollTrigger);







  function setActiveNav(id) {
    $('.gnb li').removeClass('active');
    $('.gnb li a[href="#' + id + '"]').parent().addClass('active');
  }

  function isInViewport($el) {
    const rect = $el[0].getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= vh / 2 && rect.bottom >= vh / 2;
  }

  function updateGnbActive() {
    let matched = false;

    // 세로 섹션 (project 제외)
    $('section[id], .design_list, .merit, .contact').each(function () {
      const $el = $(this);
      const id = $el.attr('id');
      if (isInViewport($el)) {
        setActiveNav(id);
        matched = true;
        return false; // 루프 중단
      }
    });

    // 가로 스크롤 info
    if (!matched && isInViewport($('.horizontal'))) {
      setActiveNav('info');
      matched = true;
    }

    // 가로 스크롤 project
    if (!matched && isInViewport($('.project_section'))) {
      setActiveNav('project');
    }
  }

  $(window).on('scroll', updateGnbActive);







  $('.gnb a').on('click', function (e) {
    e.preventDefault(); // a태그 기본 동작 막기
    const targetId = $(this).attr('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
















  /* info 스크롤 */

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


  /* project scroll */




  const projecthorizontal = document.querySelector('.projecthorizontal');
  const projectsections = gsap.utils.toArray('.projecthorizontal>section');
  let projectani = [];
  const scrollTweens = gsap.to(projectsections, {
    xPercent: -100 * (projectsections.length - 1), //전체 섹션 수만큼 왼쪽으로 밀기
    ease: 'none', //부드럽게 넘기지 않고 스크롤에 따라 반응
    scrollTrigger: {
      trigger: projecthorizontal,
      start: 'top top', //스크롤이 맨 위에 닿을 때 시작
      end: () => "+=" + (projecthorizontal.offsetWidth - innerWidth), //스크롤 끝나는 위치 계산
      pin: true, //해당 부분에서 화면을 고정해서 보여줌
      scrub: 1, //스크롤에 따라 실시간으로 움직임
      anticipatePin: 1, // 핀 고정 시 살짝 미리 준비해서 부드럽게
      invalidateOnRefresh: true, // 새로고침하면 위치 다시 계산해줌
    }
  })





  /* design */

  const numberEl = document.querySelector('.design_left');
  const section = document.querySelectorAll('.design');

  window.addEventListener('scroll', () => {
    const center = window.innerHeight / 2;

    section.forEach((section, index) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= center && rect.bottom >= center) {
        const displayNum = (index + 1).toString().padStart(2, '0');
        numberEl.textContent = displayNum;
      }
    });
  });





  /* merit on click */




  $('.merit_list_section .merit_list .merit_list_happy').click(function () {
    const target = $('.merit_view .merit_view_left .view_happy');

    // 이미 켜져 있다면 꺼주기
    if (target.hasClass('on')) {
      target.removeClass('on');
    } else {
      // 다른 거 다 끄고 이거만 켜기
      $('.merit_view .merit_view_left li').removeClass('on');
      target.addClass('on');
    }
  });

  $('.merit_list_section .merit_list .merit_list_res').click(function () {
    const target = $('.merit_view .merit_view_left .view_res');
    if (target.hasClass('on')) {
      target.removeClass('on');
    } else {
      $('.merit_view .merit_view_left li').removeClass('on');
      target.addClass('on');
    }
  });

  $('.merit_list_section .merit_list .merit_list_smile').click(function () {
    const target = $('.merit_view .merit_view_left .view_smile');
    if (target.hasClass('on')) {
      target.removeClass('on');
    } else {
      $('.merit_view .merit_view_left li').removeClass('on');
      target.addClass('on');
    }
  });

  $('.merit_list_section .merit_list .merit_list_detail').click(function () {
    const target = $('.merit_view .merit_view_left .view_detail');
    if (target.hasClass('on')) {
      target.removeClass('on');
    } else {
      $('.merit_view .merit_view_left li').removeClass('on');
      target.addClass('on');
    }
  });







  /* merit swiper */


  let meritswiper = new Swiper(".merit_list_section", {
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
    }, on: {
      init: function () {
        $('.merit_view .merit_view_left .view_happy').addClass('on');
      },
      slideChange: function () {
        $('.merit_view .merit_view_left li').removeClass('on');
        const activeIndex = this.activeIndex;
        switch (activeIndex) {
          case 0:
            $('.merit_view .merit_view_left .view_happy').addClass('on');
            break;
          case 1:
            $('.merit_view .merit_view_left .view_res').addClass('on');
            break;
          case 2:
            $('.merit_view .merit_view_left .view_smile').addClass('on');
            break;
          case 3:
            $('.merit_view .merit_view_left .view_detail').addClass('on');
            break;
        }
      }
    }
  });








  /* contact 마우스 클릭 이벤트 */
  $('.contact_list> li').click(function () {
    $(this).toggleClass('on')
  })





  /* AOS.init(); */


  window.addEventListener('load', function () {
    AOS.init({
      once: true,
      duration: 800,
      delay: 100
    });
  });
})


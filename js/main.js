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



  //coding 섹션 애니메이션
  const codingContainer = document.querySelector('.coding .coding_con');
  const cards = gsap.utils.toArray('.coding ul li');

  //전체 컨테이너 타임라인 생성
  gsap.timeline({
    scrollTrigger: {
      trigger: codingContainer,
      start: 'top 20%',//화면의 위에서 20%지점에 올 때 시작
      end: () => "+=" + (cards.length * 380), //카드 수 * 380만큼 더 내려가서 끝남
      scrub: 1, //스크롤을 움직이면 애니메이션도 같이 부드럽게 따라가게
      invalidateOnRefresh: true,
      // 화면이 새로고침될 때 카드들의 위치를 다시 계산해줌
    }
  }).fromTo(cards, { y: 300, z: 200, opacity: 0.8 }, { y: 0, z: 0, duration: 1, ease: "power2.out", stagger: 1, opacity: 1 }).to(cards, { y: -300, z: -200, skewY: 5, duration: 1, ease: "power2.in", stagger: 1 }, '+=0.5') //앞 애니메이션 끝나고 0.5초 쉬었다가 등장
  //카드 하나씩 1초 간격으로 차례차례 등장






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
  $('.contact_list>li').click(function () {
    $(this).toggleClass('on')
  })



  const textEl = document.getElementById('textToCopy');

  textEl.addEventListener('click', () => {
    const text = textEl.textContent;

    // 클립보드에 복사
    navigator.clipboard.writeText(text).then(() => {
      alert('복사되었습니다!');
    }).catch(err => {
      alert('복사 실패: ' + err);
    });
  });










  /* AOS.init(); */


  window.addEventListener('load', function () {
    AOS.init({
      once: true,
      duration: 800,
      delay: 100
    });
  });






})



$(function () {
  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll('.banner, .motion, .info');
  let currentIndex = 0;
  let isScrolling = false;
  let motionStep = 0;

  function scrollToSection(index) {
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: 'smooth' });

    // motion 섹션에 도달했을 때 motion1 자동 on
    if (sections[index].classList.contains('motion')) {
      motionStep = 0;
      updateMotionStep();
    }

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  function updateMotionStep() {
    $('.motion article').removeClass('on');
    $('.motion article').eq(motionStep).addClass('on');
  }

  window.addEventListener('wheel', function (e) {
    if (isScrolling) return;

    const delta = e.deltaY;
    const current = sections[currentIndex];
    const isMotion = current.classList.contains('motion');

    if (isMotion) {
      if (delta > 0 && motionStep < 1) {
        motionStep++;
        updateMotionStep();
        return;
      } else if (delta < 0 && motionStep > 0) {
        motionStep--;
        updateMotionStep();
        return;
      } else if (delta > 0 && motionStep === 1 && currentIndex < sections.length - 1) {
        currentIndex++;
        scrollToSection(currentIndex);
        return;
      } else if (delta < 0 && motionStep === 0 && currentIndex > 0) {
        currentIndex--;
        scrollToSection(currentIndex);
        return;
      }
    } else {
      if (delta > 0 && currentIndex < sections.length - 1) {
        currentIndex++;
        scrollToSection(currentIndex);
      } else if (delta < 0 && currentIndex > 0) {
        currentIndex--;
        scrollToSection(currentIndex);
      }
    }
  }, { passive: false });

  // 마우스 따라다니는 이미지
  document.addEventListener('mousemove', function (e) {
    const motionImg = document.querySelector('.motion_img2');
    if (motionImg) {
      motionImg.style.top = `${e.clientY}px`;
      motionImg.style.left = `${e.clientX}px`;
    }
  });

  // motion2 스크롤 자동
  $('.motion_scrolls .motion_scroll1, .motion_scrolls .motion_scroll2, .motion_scrolls .motion_scroll3, .motion_scrolls .motion_scroll4').simplyScroll({
    speed: 5,
    direction: 'forwards',
  });

  // 가로스크롤
  const horizontal = document.querySelector('.horizontal');
  const sectionsH = gsap.utils.toArray('.horizontal>section');
  gsap.to(sectionsH, {
    xPercent: -100 * (sectionsH.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: horizontal,
      start: 'top top',
      end: () => "+=" + (horizontal.offsetWidth - innerWidth),
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  });

  // skill gradient
  gsap.timeline({
    scrollTrigger: {
      trigger: '.skill',
      start: 'top 5%',
      end: 'top 50%',
      scrub: true,
    }
  }).to('.skill_gr', {
    backgroundSize: '100% 100%',
    duration: 1,
    ease: 'none',
  });

  // swiper
  new Swiper(".merit_project", {
    slidesPerView: 'auto',
    centeredSlides: false,
    grabCursor: true,
    loop: false,
    resistanceRatio: 0,
    allowTouchMove: true,
  });

  new Swiper(".project_list_all", {
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

  // contact click
  $('.contact_list> li').click(function () {
    $(this).toggleClass('on');
  });
});

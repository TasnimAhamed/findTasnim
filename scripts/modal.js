$(document).ready(function() {
  // MODAL
  var modalText = {
    agency: {
      title: 'Creative Agency',
      tag: 'Online Course Platform',
      detail:
        'Creative Agency is a web application to provide some course selling platform.A learner can log in with their mail, order a course, can track his/her course and can write a review about the course.There is also and admin panel. Admin can add/delete course, can change the order status, and can make another admin.',
      link: 'https://creative-agency1-bd.web.app/'
    },
    cleanbees: {
      title: 'Clean Bees',
      tag: 'Best CLeaning Service',
      detail:
        'Clean Bees is a web application to provide some cleaning services.An user can log in with their mail, order a service, can track his/her booked services and can write a review.There is also and admin panel. Admin can add/delete services, can change the order status, and can make another admin.',
      link: 'https://cleanbees-411e0.web.app/'
    },
    doctor: {
      title: 'Doctors Portal',
      tag: 'Teeth treatment corner',
      detail:
        'Doctors Portal is a web application to provide some teeth treatment corner.A patient can log in with their mail, get appointment , can track his/her appointment and can write a review about our service. There is also and admin panel. Admin can add/delete doctor and service, can change the appointment status, and can make another admin.',
      link: 'https://doctors-portal8.firebaseapp.com/'
    },
    surah: {
      title: 'Surah Player',
      tag: 'Beautiful recitation from Holly Quran',
      detail:
        'Some surah here. click the play button and listen beautiful recitation. Refresh your mind with beautiful recitation from Holly Quran. Click below & enjoy mind blowing recitation...',
        link: 'https://tasnimahamed.github.io/Surah-player/'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});

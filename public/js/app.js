'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    console.log('constructor');
  }

  _createClass(App, [{
    key: 'cut_eny_text',
    value: function cut_eny_text(selector, condition, neededlength) {
      var text = document.querySelectorAll('.' + selector);
      for (var i = 0; i < text.length; i++) {
        var getText = text[i].textContent;

        text[i].textContent = getText.length > condition ? text[i].textContent.slice(0, neededlength) + '...' : text[i].textContent;
      }
    }
  }, {
    key: 'mobile_menu',
    value: function mobile_menu() {
      var open = $('.js-menu-open');
      var close = $('.js-menu-close');
      var menu = $('.nav');

      open.on('click', function () {
        menu.removeClass('close');
        menu.addClass('open');
      });
      close.on('click', function () {
        menu.addClass('close');
        menu.removeClass('open');
      });

      $(document).on('mouseup', function (e) {
        var p = $(".nav");
        if (!p.is(e.target) && p.has(e.target).length === 0) {
          menu.addClass('close');
          menu.removeClass('open');
        }
      });
    }
  }, {
    key: 'open_menu',
    value: function open_menu() {
      var btn = $('.js-menu');
      var menu = $('.menu-hidden');
      var close = $('.js_close_menu');
      btn.on('click', function () {
        $(this).toggleClass('open');
        menu.addClass('open');
      });
      close.on('click', function (e) {
        menu.removeClass('open');
        btn.removeClass('open');
      });
    }
  }, {
    key: 'slider',
    value: function slider() {

      var set = {
        isAuto: true,
        interval: 1400
      };

      var navPrev = document.querySelector('.slides-nav .prev'),
          navNext = document.querySelector('.slides-nav .next'),
          pagination = document.querySelector('.top-slider__pagination'),
          tagImages = document.querySelectorAll('.top-slider__bg img'),
          indexes = 0;

      var createSpans = function createSpans(index) {
        var span = document.createElement('span');
        span.setAttribute('data-id', '' + index);
        return span;
      };

      var pushSpans = function pushSpans() {
        for (var i = 0; i <= tagImages.length - 1; i++) {
          pagination.appendChild(createSpans(i));
        }
      };

      var setImg = function setImg(index) {
        var length = tagImages.length - 1;
        for (var i = 0; i <= length; i++) {
          tagImages[i].style.opacity = '0';
        }
        tagImages[index].style.opacity = '1';
      };

      var actClass = function actClass(element) {
        if (element.classList) {
          element.classList.add('active');
        } else {
          $(element).addClass('active');
        }
      };

      var remoVeClasses = function remoVeClasses(element) {
        $(element).removeClass('active');
      };

      var plus = function plus(e) {
        if (indexes === tagImages.length - 1) {
          indexes = 0;
          setImg(indexes);
        } else {
          ++indexes;
          setImg(indexes);
        }
        remoVeClasses('.top-slider__pagination span');
        actClass($('.top-slider__pagination span[data-id=' + indexes + ']'));
      };

      if (set.isAuto) {
        setInterval(function () {
          plus();
        }, set.interval);
      }

      var minus = function minus(e) {
        if (indexes === 0) {
          indexes = tagImages.length - 1;
          setImg(indexes);
        } else {
          --indexes;
          setImg(indexes);
        }

        remoVeClasses('.top-slider__pagination span');
        actClass($('.top-slider__pagination span[data-id=' + indexes + ']'));
      };

      $(document).on('click', '.top-slider__pagination span', function (e) {
        $('.top-slider__pagination span').removeClass('active');
        var dataIndex = +e.target.getAttribute('data-id');

        setImg(dataIndex);
        actClass(e.target);
      });

      setTimeout(function () {
        actClass($('.top-slider__pagination span[data-id=' + indexes + ']'));
      }, 0);
      pushSpans();
      setImg(indexes);

      navNext.addEventListener('click', plus);
      navPrev.addEventListener('click', minus);
    }
  }, {
    key: 'shareScroll',
    value: function shareScroll() {

      $(window).scroll(function () {

        var fixed = $(".social"),
            fixed_position = $(".social").offset().top - 170,
            fixed_height = $(".social").height(),
            addClass = false;

        $('.w').each(function () {

          var toCross_position = $(this).offset().top,
              toCross_height = $(this).height();

          if (fixed_position + fixed_height < toCross_position) {} else if (fixed_position > toCross_position + toCross_height) {} else {
            addClass = true;
          }
        });
        if (addClass) {
          fixed.addClass('white');
        } else {
          fixed.removeClass('white');
        }
      });
    }
  }, {
    key: 'burger',
    value: function burger() {

      $('a.target-burger').click(function (e) {
        $('body, .nav__wrap, .nav').toggleClass('toggled');
        e.preventDefault();
      });

      $('.nav__close').on('click', function () {
        $('body, .nav__wrap, .nav').removeClass('toggled');
      });
    }
  }, {
    key: 'init',
    value: function init() {
      this.cut_eny_text();
      this.mobile_menu();
      this.open_menu();
      this.burger();
      this.slider();
      this.shareScroll();
    }
  }]);

  return App;
}();

var app = new App();

app.init();
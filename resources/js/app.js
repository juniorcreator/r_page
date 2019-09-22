

class App {
  constructor() {
    console.log('constructor');
  }

  cut_eny_text(selector, condition,neededlength) {
    let text  = document.querySelectorAll(`.${selector}`);
    for (let i =0; i < text.length; i++) {
      let getText = text[i].textContent;


      text[i].textContent = getText.length > condition    ?
          text[i].textContent.slice(0, neededlength) + '...' :
          text[i].textContent;
    }
  };
  mobile_menu() {
    let open = $('.js-menu-open');
    let close = $('.js-menu-close');
    let menu = $('.nav');

    open.on('click', function () {
      menu.removeClass('close');
      menu.addClass('open');
    });
    close.on('click', function () {
      menu.addClass('close');
      menu.removeClass('open');

    });

    $(document).on('mouseup', (e) =>{
      let p = $(".nav");
      if (!p.is(e.target) && p.has(e.target).length === 0) {
        menu.addClass('close');
        menu.removeClass('open');
      }
    });
  };

  open_menu() {
    let btn = $('.js-menu');
    let menu = $('.menu-hidden');
    let close = $('.js_close_menu');
    btn.on('click', function () {
      $(this).toggleClass('open');
      menu.addClass('open');
    });
    close.on('click', function (e) {
      menu.removeClass('open');
      btn.removeClass('open');
    });
  }

  slider() {

    let set = {
      isAuto: true,
      interval: 1400,
    };

    let
        navPrev = document.querySelector('.slides-nav .prev'),
        navNext = document.querySelector('.slides-nav .next'),
        pagination = document.querySelector('.top-slider__pagination'),
        tagImages = document.querySelectorAll('.top-slider__bg img'),
        indexes = 0;

    const createSpans = (index) => {
      let span = document.createElement('span');
      span.setAttribute('data-id', `${index}`);
      return span;
    };

    const pushSpans = () => {
      for(let i = 0; i <= tagImages.length -1; i++) {
        pagination.appendChild( createSpans(i) );
      }
    };

    const setImg = (index) => {
      let length = tagImages.length-1;
      for(let i =0; i <= length; i++) {
        tagImages[i].style.opacity = '0';
      }
      tagImages[index].style.opacity = '1';
    };

    const actClass = (element) => {
      if( element.classList) {
        element.classList.add('active');
      }else {
        $(element).addClass('active');
      }
    };

    const remoVeClasses = (element) => {
      $(element).removeClass('active');
    };

    const plus = (e) => {
      if(indexes === tagImages.length -1) {
        indexes = 0;
        setImg(indexes);
      }else {
        ++indexes;
        setImg(indexes);
      }
      remoVeClasses('.top-slider__pagination span');
      actClass($(`.top-slider__pagination span[data-id=${indexes}]`));
    };

    if(set.isAuto) {
      setInterval(()=> {
        plus();
      },set.interval);
    }


    const minus = (e) => {
      if(indexes === 0) {
        indexes = tagImages.length -1;
        setImg(indexes);
      }else {
        --indexes;
        setImg(indexes);
      }

      remoVeClasses('.top-slider__pagination span');
      actClass($(`.top-slider__pagination span[data-id=${indexes}]`));

    };


    $(document).on('click', '.top-slider__pagination span', function (e) {
      $('.top-slider__pagination span').removeClass('active');
      let dataIndex = +e.target.getAttribute('data-id');

      setImg(dataIndex);
      actClass(e.target);
    });

    setTimeout(() => {actClass($(`.top-slider__pagination span[data-id=${indexes}]`));},0);
    pushSpans();
    setImg(indexes);

    navNext.addEventListener('click',plus );
    navPrev.addEventListener('click',minus );


  };
  shareScroll() {

    $(window).scroll(function(){

      let fixed = $(".social"),
          fixed_position = $(".social").offset().top - 170,
          fixed_height = $(".social").height(),
          addClass = false;

      $('.w').each(function(){

        let toCross_position = $(this).offset().top,
            toCross_height = $(this).height();

        if (fixed_position + fixed_height  < toCross_position) {

        } else if (fixed_position > toCross_position + toCross_height) {

        } else {
          addClass = true;
        }
      });
      if(addClass){
        fixed.addClass('white');
      }else{
        fixed.removeClass('white');
      }
    });

  }
  burger() {

      $('a.target-burger').click(function(e){
        $('body, .nav__wrap, .nav').toggleClass('toggled');
        e.preventDefault();
      });

      $('.nav__close').on('click', function () {
        $('body, .nav__wrap, .nav').removeClass('toggled');
      })

  }
  init () {
    this.cut_eny_text();
    this.mobile_menu();
    this.open_menu();
    this.burger();
    this.slider();
    this.shareScroll();
  }
}

let app = new  App();

app.init();

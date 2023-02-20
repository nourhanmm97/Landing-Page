/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const bar = Array.from(document.querySelectorAll('section'));
const menu = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
navbarItems = document.createElement('li')
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

 function createnavbarItems() {
    for (section of bar){
        sectionName = section.getAttribute('data-nav');
        sectionLink = section.getAttribute('id');
          navbarItems = document.createElement('li')
        navbarItems.innerHTML = `<a class='menu__link' href='#${sectionLink}'>${sectionName}</a>`;
        menu.appendChild(navbarItems);
    };
}; 



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
//createnavbarItems();

function InViewPort (bars) {
    const boundings = bars.getBoundingClientRect();
    if (boundings.top <= 400 && boundings.bottom >= 150){
        return true
  }
};


// Scroll to anchor ID using scrollTO event

function scrollBehavior(navbarItems, section){
    navbarItems.addEventListener('click', function(event){
          event.preventDefault();
          window.scrollTo({
              top: section.offsetTop,
              behavior:"smooth"
          });
      });
  };
/**
 * End Main Functions
 * Begin Events
 * 
*/
//observe method
const options = {
    rootMargin: '100px 0px',
    threshold: [0.25, 0, 0.25, 0]
  }
  
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('active')
      } else {
        entry.target.classList.remove('active')
      }
    })
  }, options)
  
  bar.forEach(section => { 
    observer.observe(section)
  });
  
  (function ready() {
    $(window).scroll(function (e) {
     
  let windowTop = $(this).scrollTop();
  
  $('.nav a').each(function (event) {
      if (windowTop >= $($(this).attr('href')).offset().top - 100) {
          $('.your-active-class.active').removeClass('.your-active-class');
  
          $(this).addClass('.your-active-class');
      }
  });
    });
  });
  
  


// Build menu 

// Scroll to section on link click
let searchLink = function (Text) {
    const Links = document.querySelectorAll('.menu__link');
    let found;

    for (var i = 0; i < Links.length; i++) {
        if (Links[i].textContent == Text) {
            found = Links[i];
            break;
        }
    }
    return found;
}

// Set sections as active
const listOfNav = document.querySelectorAll('.menu__link')

let removeActiveClassFromSection = function () {
    const yourActiveClass = document.getElementsByClassName("active_section");
    if (yourActiveClass.length > 0) {
        yourActiveClass[0].classList.remove("active_section");
    }
}

let removeActiveClassFromLink = function () {
  const activeClass = document.getElementsByClassName("active");
  if (activeClass.length > 0) {
      activeClass[0].classList.remove("active");
  }
}
let searchMenuByText = function (SearchingText) {
  const menuLinks = document.querySelectorAll('.menu__link');
  let found;

  for (var i = 0; i < menuLinks.length; i++) {
      if (menuLinks[i].textContent == SearchingText) {
          found = menuLinks[i];
          break;
      }
  }
  return found;
}

const defultViewport = (views) => {
  var rect = views.getBoundingClientRect();
  const scroll = window.scrollY || window.pageYOffset
  const boundsTop = rect.top + scroll

  const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight,
  }

  const bounds = {
      top: boundsTop,
      bottom: boundsTop + views.clientHeight - 400, 
  }

  return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom)
      || (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
}

function onClicks() {
  const menu_Links = document.querySelectorAll('.menu__link');
  menu_Links.forEach((menu_Link, i) => {
     
      menu_Link.addEventListener('click', respondToClick);

      function respondToClick() {
          removeActiveClassFromLink(); k
          menu_Link.classList.add('active'); 
          sections[i].scrollIntoView({ behavior: "smooth" });
          removeActiveClassFromSection();
          sections[i].classList.add('active_section');
      }
  })
}

function withScrolling() {
  for (let navs of sections) {
      if (defultViewport(navs)) {
          removeActiveClassFromSection();     
          navs.classList.add('active_section'); 

          removeActiveClassFromLink();   
          let correspondingLink = searchMenuByText(navs.getAttribute('data-nav'));
          correspondingLink.classList.add('active');    
          break;
      }
  }
}


setTimeout(createnavbarItems, 0);
setTimeout(onClicks, 50);
window.addEventListener('scroll', withScrolling, true);

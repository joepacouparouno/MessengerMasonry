
let navBar = null;
let isScrolled = false;
let isTimeout = false;
let navLoaded = false;
let mobileNavPanel;
let mobileNavButton;
let bar1;
let bar2;
let bar3;
const timeScroll = setTimeout(stopScrollTime, 100);
let page = getPage();

function toggleNav () {
  if(navLoaded) {
    if (navBar.classList.contains('navScroll') && isScrolled == false) {
      navBar.classList.remove('navScroll');
    } else {
      navBar.classList.add('navScroll');
    }
  }else {
    if(document.querySelector('#app').children[0].id == 'nav') {
      navBar = document.querySelector('#nav');
      navLoaded = true;
    }
  }
}// toggleNav();

function toggleTime () {
  isTimeout = !isTimeout;
}

function stopScrollTime() {
  toggleTime()
  let scrolled = checkScroll();
  if(isScrolled != scrolled) {
    isScrolled = scrolled;
    toggleNav();
  }
}// stopScrollTime()

function checkScroll() {
  if(window.scrollY > 15) {
    return true;
  }else if(window.scrollY < 12) {
    return false;
  }else {
    return false;
  }
}// checkScroll();

function toggleMobileNav() {
  if(mobileNavPanel == null || mobileNavPanel == undefined || navBar == undefined) {
    mobileNavPanel = document.querySelector('.mobileNavPanel');
    mobileNavButton = document.querySelector('.mobileNavButton');
    navBar = document.querySelector('#nav');
    bar1 = mobileNavButton.children[0];
    bar2 = mobileNavButton.children[1];
    bar3 = mobileNavButton.children[2];
    navLoaded = true;
  }
  if(mobileNavPanel.classList != null) {    
    if(mobileNavPanel.classList.contains('panelActive')) {
      mobileNavPanel.classList.remove('panelActive');
      mobileNavButton.classList.remove('buttonActive');
      setButtonBars('Inactive');
      if(page == '') {
          setTimeout(() => {
            navBar.classList.remove('navScroll');
          }, 500);
      }
    }else {
      mobileNavPanel.classList.add('panelActive');
      mobileNavButton.classList.add('buttonActive');
      navBar.classList.add('navScroll');
      setButtonBars('Active');
    }
  }
}// toggleMobileNav();

function setButtonBars(state) {
  mobileNavButton.innerHTML = '';
  bar1 = document.createElement('div');
  bar2 = document.createElement('div');
  bar3 = document.createElement('div');
  bar1.id = 'bar1';
  bar2.id = 'bar2';
  bar3.id = 'bar3';
  bar1.classList.add('bar1' + state);
  bar2.classList.add('bar2' + state);
  bar3.classList.add('bar3' + state);
  mobileNavButton.appendChild(bar1);
  mobileNavButton.appendChild(bar2);
  mobileNavButton.appendChild(bar3);
}// setButtonBars(state);

//check what page
function getPage() {
  let fullUrl = window.location.href.split('/');
  let page = fullUrl[fullUrl.length - 1];
  console.log(page);
  return page;
}

document.addEventListener('scroll', () => {
  if(page == '') {
      if(isTimeout == false) {    
        toggleTime();
      } else {
        stopScrollTime();
        setTimeout(() => {
          let scrolled = checkScroll();
          if(isScrolled != scrolled) {
            isScrolled = scrolled;
            toggleNav();
          }
        }, 500);
      }
  }
}); 

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if(document.querySelector('#app').children[0].id == 'nav') {
      navBar = document.querySelector('#nav');
      navLoaded = true;
    }
  }, 100)
});

const observeUrlChange = () => {
  let oldHref = document.location.href;
  if (navLoaded) {
      const body = document.querySelector("body");
      const observer = new MutationObserver(mutations => {
          mutations.forEach(() => {
            if (oldHref !== document.location.href) {
              oldHref = document.location.href;
              let page = getPage();
              switch(page) {
                case 'about': {
                  navBar.childList.add('navScroll');
                  break;
                }
                case 'work': {
                  navBar.childList.add('navScroll');
                  break;
                }
                case 'contact': {
                  navBar.childList.add('navScroll');
                  break;
                }
                default: {
                  if(navBar.classList.contains('navScroll'))
                    navBar.childList.remove('navScroll');
                  break;
                }
              }
            }
          });
        });
        
        observer.observe(body, { childList: true, subtree: true });
      };
      
  }
  window.onload = observeUrlChange;
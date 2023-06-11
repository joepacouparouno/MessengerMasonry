
let navLoaded = false;
let mobileNavPanel;
let mobileNavButton;

function toggleMobileNav() {
  if(mobileNavPanel == null || mobileNavPanel == undefined || navLoaded == false) {
    mobileNavPanel = document.querySelector('.mobileNavPanel');
    mobileNavButton = document.querySelector('.mobileNavButton');
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
    }else {
      mobileNavPanel.classList.add('panelActive');
      mobileNavButton.classList.add('buttonActive');
      setButtonBars('Active');
    }
  }
}// toggleMobileNav();

function setButtonBars(state) {
  mobileNavButton.innerHTML = '';
  for(let i = 0; i < 3; i++) {
    let bar = document.createElement('div');
    bar.id = 'bar'+ (i + 1);
    bar.classList.add('buttonBar');
    bar.classList.add('bar' + (i + 1));
    bar.classList.add(state);
    mobileNavButton.appendChild(bar);
  }
}// setButtonBars(state);


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if(document.querySelector('#app').children[0].id == 'nav') {
      navLoaded = true;
    }
  }, 100)
});
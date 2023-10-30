window.addEventListener('load', resizeHomePage);
window.addEventListener('resize', resizeHomePage);
const nav = document.querySelector('.nav-div');
const homeIntro = document.querySelector('.section-1');

function resizeHomePage(event) {
    if (window.innerHeight > nav.clientHeight + homeIntro.clientHeight) {
        homeIntro.style.height = (window.innerHeight-nav.clientHeight) + 'px';
    }
    
}

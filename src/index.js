const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function hideNavbar() {
  mobileNav.classList.remove("mobile-nav-active");
  window.removeEventListener("click", hideNavbar);
}

function isPartiallyInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const topVisible = rect.top <= windowHeight && rect.bottom >= 0;
  const leftVisible = rect.left <= windowWidth && rect.right >= 0;

  return topVisible && leftVisible;
}

menuToggle.addEventListener("click", (event) => {
  mobileNav.classList.add("mobile-nav-active");
  setTimeout(() => {
    window.addEventListener("click", hideNavbar);
  }, 250);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


const nameDiv = document.createElement("h3");
nameDiv.classList.add("nav-name");
const nameP = document.createElement("p");
nameP.textContent = "Soraya Adams";
const subscriptTitle = document.createElement("div");
subscriptTitle.classList.add("subscript");
subscriptTitle.textContent = "Psychotherapist";
nameDiv.appendChild(nameP);
nameDiv.appendChild(subscriptTitle);

const innerNav = document.getElementById("inner-nav");
const homeDiv = document.getElementById("home");

let nameInNav = false;
window.addEventListener("scroll", (event) => {
  if (!isPartiallyInViewport(homeDiv) && !nameInNav) {
    innerNav.classList.remove("centered-div", "right-menu");
    innerNav.classList.add("row-aligned");
    innerNav.prepend(nameDiv);
    nameInNav = true;
  }
  if (isPartiallyInViewport(homeDiv) && nameInNav) {
    innerNav.classList.remove("row-aligned");
    innerNav.classList.add("centered-div", "right-menu");
    nameDiv.remove();
    nameInNav = false;
  }
});
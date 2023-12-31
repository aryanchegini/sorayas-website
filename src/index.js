const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function hideNavbar() {
  mobileNav.classList.remove("mobile-nav-active");
  window.removeEventListener("click", hideNavbar);
}

function isNotInViewport(element) {
  const rect = element.getBoundingClientRect();
  return !(
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
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
  if (isNotInViewport(homeDiv) && !nameInNav) {
    innerNav.classList.remove("centered-div", "right-menu");
    innerNav.classList.add("row-aligned");
    innerNav.prepend(nameDiv);
    nameInNav = true;
  }
  if (!isNotInViewport(homeDiv) && nameInNav) {
    innerNav.classList.remove("row-aligned");
    innerNav.classList.add("centered-div", "right-menu");
    nameDiv.remove();
    nameInNav = false;
  }
});
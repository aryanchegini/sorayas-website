const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function hideNavbar() {
  mobileNav.classList.remove("mobile-nav-active");
  window.removeEventListener("click", hideNavbar);
}

menuToggle.addEventListener("click", (event) => {
  mobileNav.classList.add("mobile-nav-active");
  setTimeout(() => {
    window.addEventListener("click", hideNavbar);
  }, 100);
});

function isPartiallyInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const topVisible = rect.top <= windowHeight && rect.bottom >= 0;
  const leftVisible = rect.left <= windowWidth && rect.right >= 0;

  return topVisible && leftVisible;
}

function elt(type, classNames, children) {
  let node = document.createElement(type);
  for (let className of classNames) {
    node.classList.add(className);
  }
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

let nameDiv = elt(
  "h3",
  ["nav-name"],
  [
    elt("p", [], ["Soraya Adams"]),
    elt("div", ["subscript"], ["Psychotherapist"]),
  ]
);
const innerNav = document.getElementById("inner-nav");
const handDiv = document.getElementById("inner-home");

let nameInNav = false;
window.addEventListener("scroll", (event) => {
  if (!isPartiallyInViewport(handDiv) && !nameInNav) {
    innerNav.classList.remove("centered-div", "right-menu");
    innerNav.classList.add("row-aligned");
    innerNav.prepend(nameDiv);
    nameInNav = true;
  }
  if (isPartiallyInViewport(handDiv) && nameInNav) {
    innerNav.classList.remove("row-aligned");
    innerNav.classList.add("centered-div", "right-menu");
    nameDiv.remove();
    nameInNav = false;
  }
});

// adjusting hand div height to fit viewport
window.onresize = () => {
  let handHeight = handDiv.getBoundingClientRect().height;
  let navHeight = document.querySelector("nav").getBoundingClientRect().height;
  if (handHeight + navHeight < window.innerHeight) {
    let diff = window.innerHeight - (handHeight + navHeight);
    handDiv.style.height = handHeight + diff + "px";
  }
};

document.addEventListener("DOMContentLoaded", function (event) {
  let handHeight = handDiv.getBoundingClientRect().height;
  let navHeight = document.querySelector("nav").getBoundingClientRect().height;
  if (handHeight + navHeight < window.innerHeight) {
    let diff = window.innerHeight - (handHeight + navHeight);
    handDiv.style.height = handHeight + diff + "px";
  }
});

let divLocations;

// wait for handDiv to be adjusted
setTimeout(() => {
  divLocations = {
    home: 0,
    approach: document.getElementById("home").getBoundingClientRect().height,
    about:
      document.getElementById("home").getBoundingClientRect().height +
      document.getElementById("approach").getBoundingClientRect().height,
    fees:
      document.getElementById("home").getBoundingClientRect().height +
      document.getElementById("approach").getBoundingClientRect().height +
      document.getElementById("about").getBoundingClientRect().height,
    contact:
      document.getElementById("home").getBoundingClientRect().height +
      document.getElementById("approach").getBoundingClientRect().height +
      document.getElementById("about").getBoundingClientRect().height +
      document.getElementById("fees").getBoundingClientRect().height,
  };
}, 250);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    divName = this.getAttribute("href").substring(1);
    window.scroll({
      top: divLocations[divName],
      left: 0,
      behavior: "smooth",
    });
  });
});

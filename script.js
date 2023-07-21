// alert("Hello World");
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
// alert(nav);
let togle = true;
if (bar) {
  bar.addEventListener("click", () => {
    if (togle) {
      nav.classList.add("ace");
      togle = false;
    } else {
      nav.classList.remove("ace");
      togle = true;
    }
  });
}

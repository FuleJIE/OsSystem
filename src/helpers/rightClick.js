const rmenu = document.getElementById("rmenu");
const smenu = document.getElementById("smenu");
const fmenu = document.getElementById("fmenu");

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  let prevX = e.clientX;
  let prevY = e.clientY;
  if (smenu.style.display == "none" && fmenu.style.display == "none") {
    rmenu.classList.add("show");
    rmenu.style.top = prevY + "px";
    rmenu.style.left = prevX + "px";
  }
});

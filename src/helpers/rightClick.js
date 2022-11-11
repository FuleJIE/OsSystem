var rmenu = document.getElementById("rmenu");
// var exsitSmenu = true;
// var exsitFmenu = true;
// if (!document.getElementById("smenu")) {
//   exsitSmenu = false;
// }
// if (!document.getElementById("fmenu")) {
//   exsitFmenu = false;
// }
var smenu = document.getElementById("smenu");
var fmenu = document.getElementById("fmenu");

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  let prevX = e.clientX;
  let prevY = e.clientY;
  // if (!exsitSmenu && !exsitFmenu) {
  //   document.getElementById("rmenu").style.display = "block";
  //   rmenu.style.top = prevY + "px";
  //   rmenu.style.left = prevX + "px";
  // } else
  if (smenu.style.display == "none" && fmenu.style.display == "none") {
    document.getElementById("rmenu").style.display = "block";
    rmenu.style.top = prevY + "px";
    rmenu.style.left = prevX + "px";
  } else {
    document.getElementById("rmenu").style.display = "";
  }
});

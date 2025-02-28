const slideDown = document.getElementById("plus");
const aboutPage = document.getElementById("about");

slideDown.addEventListener("click", function () {
  if (aboutPage.style.display === "none") {
    aboutPage.style.display = "block";
    aboutPage.style.maxHeight = aboutPage.scrollHeight + "vw";
  } else {
    aboutPage.style.display = "none";
    aboutPage.style.maxHeight = "0";
  }
});

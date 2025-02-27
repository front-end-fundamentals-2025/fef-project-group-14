const blurElements = document.querySelectorAll(".autoBlur");
let scrolling = false;

function updateBlurEffect() {
  const windowHeight = window.innerHeight;
  const focusHeight = windowHeight * 0.3;

  blurElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementMiddle = rect.top + rect.height / 2;
    const distanceFromCenter = Math.abs(windowHeight / 2 - elementMiddle);
    const maxBlur = 20;
    const blurValue = Math.min(
      maxBlur,
      ((distanceFromCenter - focusHeight) / (windowHeight / 2)) * maxBlur
    );
    element.style.filter = `blur(${Math.max(0, blurValue)}px)`;
  });
}

window.addEventListener("scroll", updateBlurEffect);

updateBlurEffect();

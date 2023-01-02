//your JS code here. If required.
let imgElements = document.querySelectorAll("img");
let resetButton = document.querySelector("#reset");
let verifyButton = document.querySelector("#btn");
let result = document.querySelector("#para");

async function loadImages() {
  const images = await Promise.all([
    getImages(),
    getImages(),
    getImages(),
    getImages(),
    getImages(),
  ]);

  const currentIndex = randomNumber();
  for (let i = 0; i < imgElements.length; i++) {
    let img = imgElements[i];
    img.addEventListener("click", handleClick);

    // adding same classes and attributes
    if (i == imgElements.length - 1) {
      img.classList.add(`img${currentIndex + 1}`);
      img.setAttribute("data-ns-test", `img${currentIndex + 1}`);
    } else {
      img.classList.add(`img${i + 1}`);
      img.setAttribute("data-ns-test", `img${i + 1}`);
    }

    let imgLink = images[i] || images[currentIndex];
    img.src = imgLink;
  }
}

document.onload = loadImages();

function handleClick(event) {
  let clickCount = getClickedElements().length;

  if (clickCount < 2) {
    let img = event.target;
    img.classList.toggle("clicked");

    clickCount = getClickedElements().length;

    if (clickCount == 1) {
      resetButton.toggleAttribute("hidden");
    } else if (clickCount == 2) {
      verifyButton.toggleAttribute("hidden");
    } else {
      resetButton.setAttribute("hidden", "true");
    }
  }
}
function randomNumber() {
  return Math.floor(Math.random() * 5);
}
async function getImages() {
  const response = await fetch("https://picsum.photos/200/200");
  return response.url;
}

resetButton.addEventListener("click", handleReset);
function handleReset() {
  let clickedElements = getClickedElements();
  for (let img of clickedElements) {
    img.classList.toggle("clicked");
  }
  resetButton.setAttribute("hidden", "true");
  verifyButton.setAttribute("hidden", "true");
  result.innerText = "";
}

function getClickedElements() {
  return document.querySelectorAll(".clicked");
}

verifyButton.addEventListener("click", isHuman);
function isHuman(event) {
  var [firstImage, secondImage] = getClickedElements();

  if (firstImage.src == secondImage.src) {
    result.innerText = "You are a human. Congratulations!";
  } else {
    result.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyButton.toggleAttribute("hidden");
}

const image = document.querySelector("#image")
const button = document.querySelector("#button")
const height = document.querySelector("#height")
const width = document.querySelector("#width")

button.addEventListener('click', () => {
  image.setAttribute('height', height.value);
  image.setAttribute('width', width.value);
})



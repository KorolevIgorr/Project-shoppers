const image = document.querySelector("#image")
const height = document.querySelector("#height")
const width = document.querySelector("#width")



height.addEventListener('change', (e) => {
  console.log(height.value)
  image.setAttribute('height', e.target.value);
})

width.addEventListener('change', (e) => {
  image.setAttribute('width', e.target.value);
})

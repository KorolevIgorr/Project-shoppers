
const imgheight = document.querySelector('#imgheight');
imgheight.addEventListener('change', (e) => {
  myImg.style.maxHeight = `${e.target.value}px`;
});
const text = document.querySelector('#text');
const myText = document.querySelector('.myText');
text.addEventListener('change', (e) => {
  myText.innerText = e.target.value;
});
const myImg = document.querySelector('#myimage');
let diffX = 0;
let diffY = 0;
let imageX = 0;
let imageY = 0;
myImg.addEventListener('dragstart', (e) => {
  diffX = e.clientX - imageX;
  diffY = e.clientY - imageY;
});
myImg.addEventListener('dragend', (e) => {
  imageY = e.clientY - diffY + +e.target.style.maxHeight.replace('px', '');
  imageX = e.clientX - diffX;
  console.log(e.clientX, imageX, diffX);
  console.log(e.clientY, imageY, diffY);
  e.target.style.top = `${imageY}px`;
  e.target.style.left = `${imageX}px`;
});

const model = document.querySelector('#model');
const material = document.querySelector('#material');
const bagSize = document.querySelector('#size');
const bagColor = document.querySelector('#bagColor');

const orderFormOne = document.querySelector('#order-form-one');
const image = document.querySelector('#image');
const height = document.querySelector('#height');
const width = document.querySelector('#width');
const depth = document.querySelector('#depth');
const handleSize = document.querySelector('#handleSize');

orderFormOne.addEventListener('change', async (e) => {
  if (e.target.id === 'model') {
    console.log(e.target.parentNode.nextElementSibling.children[1].value);
    const response = await fetch('/order/bags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        sizeName: e.target.parentNode.nextElementSibling.children[1].value,
        name: e.target.value,
      }),
    });
    const servRes = await response.json();
    console.log(servRes);
    image.src = servRes.image.image;
    height.innerText = `height: ${servRes.size.height}`;
    width.innerText = `width: ${servRes.size.height}`;
    depth.innerText = `depth: ${servRes.size.height}`;
    handleSize.innerText = `length of handles: ${servRes.size.height}`;
  }
  if (e.target.id === 'size') {
    // console.log(e.target.value)
    const response = await fetch('/order/size', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        bagModel: e.target.parentNode.previousElementSibling.children[1].value,
        sizeName: e.target.value,
      }),
    });
    const servRes = await response.json();
    height.innerText = `height: ${servRes.height}`;
    width.innerText = `width: ${servRes.height}`;
    depth.innerText = `depth: ${servRes.height}`;
    handleSize.innerText = `length of handles: ${servRes.height}`;
  }
  if (e.target.id === 'bagColor') {
    const divColor = document.createElement('div');
    divColor.style.width = '100px';
    divColor.style.height = '100px';
    // bagColor.borderRadius = '50%'
    console.log(e.target);

    e.target.parentNode.append(divColor);
    divColor.style.backgroundColor = 'red';
    // if(e.target.value === 'Бирюзовый') bagColor.background = 'red'
  }
});


// const imageLoader = document.querySelector('#uploadForm');
// orderFormOne.addEventListener('click', (e) => {
//   if (e.target.id === 'sumbit-loader') {
//     e.preventDefault();
//   }
//   console.log(e.target);
// });

// imageLoader.addEventListener('submit', (e) => {
//   e.preventDefault();
// });

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
  console.log(e.clientX, imageX, diffX);
  console.log(e.clientY, imageY, diffY);
});
myImg.addEventListener('dragend', (e) => {
  imageY = e.clientY - diffY + +e.target.style.maxHeight.replace('px', '');
  imageX = e.clientX - diffX;
  console.log(e.clientX, imageX, diffX);
  console.log(e.clientY, imageY, diffY);
  e.target.style.top = `${imageY}px`;
  e.target.style.left = `${imageX}px`;
});

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

    console.log(servRes);
  }
});

// orderFormOne.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const response = await fetch('/uploadImg', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({model: model.options[model.selectedIndex].value, material: material.options[material.selectedIndex].value, bagSize: bagSize.options[bagSize.selectedIndex].value, bagColor: bagColor.options[bagColor.selectedIndex].value}),
//   });
// })

const imageLoader = document.querySelector('#uploadForm');
orderFormOne.addEventListener('click', (e) => {
  if (e.target.id === 'sumbit-loader') {
    e.preventDefault();
  }
  console.log(e.target);
});

imageLoader.addEventListener('submit', (e) => {
  e.preventDefault();
});

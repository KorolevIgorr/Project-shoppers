// const image = document.querySelector("#image")
// const button = document.querySelector("#button")
// const height = document.querySelector("#height")
// const width = document.querySelector("#width")

// button.addEventListener('click', () => {
//   image.setAttribute('height', height.value);
//   image.setAttribute('width', width.value);
// })

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
    console.log(servRes)
    image.src = servRes.image.name;
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

const model = document.querySelector('#model');
const material = document.querySelector('#material');
const bagSize = document.querySelector('#size');
const bagColor = document.querySelector('#bagColor');
const divColor = document.createElement('div');
divColor.style.width = '50px';
divColor.style.height = '50px';
divColor.style.borderRadius = '50%';
divColor.style.marginTop = '7px';

const orderFormOne = document.querySelector('#order-form-one');
const image = document.querySelector('#image');
const height = document.querySelector('#height');
const width = document.querySelector('#width');
const depth = document.querySelector('#depth');
const handleSize = document.querySelector('#handleSize');

orderFormOne.addEventListener('change', async (e) => {
  if (e.target.id === 'model') {
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
    image.src = servRes.image.image;
    height.innerText = `Высота: ${servRes.size.height}`;
    width.innerText = `Ширина: ${servRes.size.height}`;
    depth.innerText = `Глубина: ${servRes.size.height}`;
    handleSize.innerText = `Длина ручек: ${servRes.size.height}`;
  }
  if (e.target.id === 'size') {
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
    height.innerText = `Высота: ${servRes.height}`;
    width.innerText = `Ширина: ${servRes.height}`;
    depth.innerText = `Глубина: ${servRes.height}`;
    handleSize.innerText = `Длина ручек: ${servRes.height}`;
  }
  if (e.target.id === 'bagColor') {
    e.target.parentNode.append(divColor);
    if (e.target.value === 'Черный') divColor.style.background = '#212121';
    if (e.target.value === 'Серый') divColor.style.background = '#7c7e7f';
    if (e.target.value === 'Белый') divColor.style.background = 'white';
    if (e.target.value === 'Бирюзовый') divColor.style.background = '#00838a';
    if (e.target.value === 'Синий') divColor.style.background = '#0083c3';
    if (e.target.value === 'Голубой') divColor.style.background = '#00b4e4';
    if (e.target.value === 'Коричневый') divColor.style.background = '#6e5e52';
    if (e.target.value === 'Красный') divColor.style.background = '#d84465';
    if (e.target.value === 'Желтый') divColor.style.background = '#ffd94a';
  }
});

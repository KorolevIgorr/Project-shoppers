// const image = document.querySelector("#image")
// const button = document.querySelector("#button")
// const height = document.querySelector("#height")
// const width = document.querySelector("#width")

// button.addEventListener('click', () => {
//   image.setAttribute('height', height.value);
//   image.setAttribute('width', width.value);
// })

const orderFormOne = document.querySelector('#order-form-one');

const image = document.querySelector('#image')
orderFormOne.addEventListener('change', async (e) => {
  if (e.target.id === 'model') {
    const response = await fetch('/order/bags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ name: e.target.value }),
    });
    const servRes = await response.json()
    image.src = servRes.image.name
  }
});

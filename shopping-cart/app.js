const productButtons = document.querySelectorAll('.add-to-cart');
const cart = document.getElementById('cart');
const cartTotal = document.getElementById('cart-total');
const inputPromoCode = document.getElementById('promo-code');
const cartSubTotal = document.getElementById('cart-subtotal');

const calculateTotalButton = document.getElementById('calculate-total');


const cartItems = [];

// promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
];



productButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});
inputPromoCode.addEventListener('input', applyPromoCode)
calculateTotalButton.addEventListener('click', calculateTotal);

function addToCart(event) {
  const button = event.target;
  const productName = button.getAttribute('data-name');
  const productPrice = parseFloat(button.getAttribute('data-price'));

  cartItems.push({
    name: productName,
    price: productPrice
  })
  displayCart();
}

function displayCart() {
  cart.innerHTML = ''

  if(cartItems.length === 0){
    cart.innerHTML = `<p>Cart is Empty</p>`
  } else {
    cartItems.forEach((item) => {
      const cartItemDiv = document.createElement('div')
      cartItemDiv.innerHTML = `${item.name} - Rp. ${item.price}`;
      cart.appendChild(cartItemDiv)
    })
  }

  cartSubTotal.textContent = `Sub Total : Rp. ${cartTotal === null ? 0 : cartTotal}`
}

function applyPromoCode() {
  const discountDiv = document.getElementById('discount');
  const promoCode = inputPromoCode.value;
  let cartTotal = cartItems.reduce((total, item) => total + item.price, 0 )

  const promoMatch = promo.find((item) => item.label === promoCode)
  console.log(promoMatch)

  if(promoMatch){
    const discountValue = promoMatch.value
    const discount = cartTotal * discountValue
    console.log(discountValue)
    cartTotal -= discount
    discountDiv.textContent = `- Rp. ${discount}`;
  } else {
    discountDiv.textContent = '-'
  }



  cartSubTotal.textContent = `Total: Rp. ${cartTotal === null ? 0 : cartTotal}` 
}

// function calculateTotal() {
//   // Tampilkan total akhir
//   const cartTotal = cartItems.reduce((total, item) => total + item.price, 0 )
//   cartSubTotal.textContent = `Total: Rp. ${cartTotal}`;
// }


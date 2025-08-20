import { foods } from "./constants/cartItem.js";

console.log("foods", foods);

const cartItem = document.getElementById("carts");
const countCart = document.getElementById("count-cart");

const renderCartItem = (data) => {
  let html = "";
  if (data.length < 1) {
    html = `
      <span>Chưa có dữ liệu</span>
    `;
  }

  data.forEach((val) => {
    html += `
      <div class="cart-item">
                <div class="item-details">
                  <img src="${val.img}" alt="${val.food}">
                  <div>
                    <h3 class="item-name">${val.food}</h3>
                    <p class="item-description">Extra cheese and topping</p>
                  </div>
                </div>
                <div class="bottom-row">
  
                  <div class="item-controls">
                    <div class="quantity-control">
                      <button class="quantity-btn minus" onclick=handleDecrease(${val.id})>-</button>
                      <span class="quantity">${val.quantity}</span>
                      <button class="quantity-btn plus" onclick=handleIncrease(${val.id})>+</button>
                    </div>
                  </div>
                  <div class="item-prices">
                    <p class="price">${val.price} $</p>
                    <button class="delete-btn" onclick=handleDecrease(${val.id})>
                      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2">
                        </path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
    `;
    cartItem.innerHTML = html;
    countCart.innerHTML = ` <p>You have ${data.length} item in your cart</p>`;
  });
};

const handleIncrease = (id) => {
  console.log(id);
  foods.forEach((val) => {
    if (val.id === id) {
      val.quantity++;
    }
    renderCartItem(foods);
    showSummary(foods);
  });
};

const handleDecrease = (id) => {
  // giảm quantity cho đúng item
  foods.forEach((val) => {
    if (val.id === id) {
      val.quantity--;
    }
  });

  // lọc ra những item vẫn còn quantity > 0
  const newFoods = foods.filter((val) => val.quantity > 0);

  // cập nhật lại foods (xóa sạch và nạp lại)
  foods.length = 0;
  foods.push(...newFoods);

  // render lại UI
  renderCartItem(foods);
  showSummary(foods);
};

// const handleDecrease = (id) => {
//   // tìm vị trí item cần giảm
//   const index = foods.findIndex((val) => val.id === id);

//   if (index !== -1) {
//     // giảm số lượng
//     foods[index].quantity--;

//     // nếu quantity < 1 thì xóa luôn item đó
//     if (foods[index].quantity < 1) {
//       foods.splice(index, 1);
//     }
//   }

//   // render lại UI
//   renderCartItem(foods);
// };
console.log(foods);

const showSummary = (data) => {
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");
  const priceCheckout = document.getElementById("priceCheckout");

  let subtotal = 0;
  const shipping = 5;
  let total = 0
  data.forEach((val) => {
    console.log(val);
    subtotal += val.price * val.quantity;
     total = subtotal - shipping;
  });

  subtotalElement.innerHTML = `${subtotal} $`;
  shippingElement.innerHTML = `${shipping} $`;
  totalElement.innerHTML = `${total} $`;
  priceCheckout.innerHTML = `${total} $`;
};
showSummary(foods);

renderCartItem(foods);

window.handleIncrease = handleIncrease;
window.handleDecrease = handleDecrease;

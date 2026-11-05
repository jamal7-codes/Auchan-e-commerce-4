
const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function renderCart(cartItmes){
    const cartTotal = document.querySelector("#cart-total");

    if (!cartTotal || !cartItmes){
        console.error("Cart elements not found")
        return;
    }

cartItmes.innerHTML = cart.map( item =>`
 <div>
     ${item.name}
     ${item.price} $
     Quantity: ${item.quantity}

</div>`

).join("")

const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
}, 0);

cartTotal.textContent = `Total: ${total} $`;

const hasMultipleQuantity = cart.some(item => item.quantity > 1);
console.log("Has product with multiple quantities:" ,hasMultipleQuantity);

}

export function addToCart(product , cartItems){

 
  
const existingProduct = cart.find(item => item.id === product.id);

if (existingProduct){
    existingProduct.quantity++;

}else{ 
    
    cart.push({...product, quantity:1})

 }

localStorage.setItem("cart", JSON.stringify(cart));
renderCart(cartItems);
 }
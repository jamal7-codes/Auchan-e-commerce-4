
const cart =[];
export function addToCart(product , cartItems){

const cartTotal = document.querySelector("#cart-total")

  
const existingProduct = cart.find(item => item.id === product.id);

if (existingProduct){
    existingProduct.quantity++;

}else{ 
    
    cart.push({...product, quantity:1})

 }

const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
}, 0);

cartTotal.textContent = `Total: ${total} $`;
   
cartItems.innerHTML = cart.map( item =>`
    <div>
 ${item.name}
${item.price} $
Quantity: ${item.quantity}

</div>`

).join("")
 }
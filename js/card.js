
const cart =[];
export function addToCart(product , cartItems){
//checks whether the product already exist
const alreadyExists = cart.some(item => item.id === product.id);

if (alreadyExists)return;

//adds it only if it is new
cart.push(product)
 
cartItems.innerHTML += `<div>
${product.name}
${product.price} $
</div>`;

}
 
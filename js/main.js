import {getProducts} from './api.js';

const productList = document.querySelector("#product-list")

 setTimeout(() =>{
     
    getProducts()
    .then(products =>{
 const productCart = products.map(product =>{

    return `<div class="bg-white border rounded-xl p-3">

       <img class="w-full h-14 object-contain rounded-md" src="${product.image}" 
       alt="${product.name}"> 
        <h3 class = "text-lg font-bold mb-2">${product.name}</h3>
         <p class="text-sm text-gray-500 mb-2">${product.category}</p>
          <p class = "text-green-600 font-semibold text-lg">${product.price} $</p>
    </div>` ;

 });
const html = productCart.join('');
productList.innerHTML = html;

    })
    .catch(error =>{
        console.error('Could not load products:', error)
 });
    
 },100)
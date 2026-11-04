import { addToCart } from "./card.js";

export function setupDragDrop(productList, basket, allProducts){
   
const cartItems = document.querySelector("#cart-items")

    basket.addEventListener("dragover", (event)=>{
        event.preventDefault();
    })

    productList.addEventListener("dragstart", (event) => {
        const card = event.target.closest("[data-id]")
        if(!card)return;

        const productId = card.dataset.id
        event.dataTransfer.setData("text/plain", productId)
    });

    basket.addEventListener("drop", (event) => {
        event.preventDefault();

        const productId = event.dataTransfer.getData("text/plain")

        const product = allProducts.find(item => item.id === Number(productId))

        if(!product)return;

 addToCart(product , cartItems) 


     })
}
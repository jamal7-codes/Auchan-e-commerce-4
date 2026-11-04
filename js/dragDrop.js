export function setupDragDrop(productList, basket, allProducts){
   
    productList.addEventListener("dragstart", (event) => {
        const productId = event.target.dataset.id
        event.dataTransfer.setData("text/plain", productId)
    });

    basket.addEventListener("drop", (event) => {
        event.preventDefault();

        const productId = event.dataTransfer.getData("text/plain",)

        const product = allProducts.find(item => item.id === Number(productId))

        if(!product)return;
     })
}
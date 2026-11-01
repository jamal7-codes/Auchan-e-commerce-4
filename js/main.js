import {getProducts} from './api.js';

const productList = document.querySelector("#product-list")

const gridView = document.querySelector("#grid-view");
const listView = document.querySelector("#list-view");

const searchInput = document.querySelector("#search-input");

const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory ="All";
 



//grid button
gridView.addEventListener("click", function(){
    productList.classList.remove("flex", "flex-col");
    productList.classList.add("grid-cols-4")
});

 //list button
listView.addEventListener("click", function(){
    productList.classList.remove("grid-cols-4");
    productList.classList.add("flex", "flex-col")
 });


 //load products
 setTimeout(() =>{
     
    getProducts()
    .then(products =>{
   const allProducts = products


 

 categoryButtons.forEach(button => {
   button.addEventListener("click", function(){
      selectedCategory = button.dataset.category;
      const filteredProducts = allProducts.filter(product => {
    return selectedCategory === "All" || product.category === selectedCategory;
    

  }); 
  const html1 = filteredProducts.map(product => {

   return `<div class="bg-white border rounded-xl p-3">

       <img class="w-full h-14 object-contain rounded-md" src="${product.image}" 
       alt="${product.name}"> 
        <h3 class = "text-lg font-bold mb-2">${product.name}</h3>
         <p class="text-sm text-gray-500 mb-2">${product.category}</p>
          <p class = "text-green-600 font-semibold text-lg">${product.price} $</p>
    </div>` ;

}).join(""); 
productList.innerHTML = html1;

    });
  
 
//display all products
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

// search input
   searchInput.addEventListener("input", function(){
      const searchText = searchInput.value.toLowerCase();

   //filter products
      const filteredProducts = allProducts.filter(product =>{
          return product.name.toLowerCase().includes(searchText)

      });
   
      //filtred products
           const html = filteredProducts.map(product => {

return `<div class="bg-white border rounded-xl p-3">

       <img class="w-full h-14 object-contain rounded-md" src="${product.image}" 
       alt="${product.name}"> 
        <h3 class = "text-lg font-bold mb-2">${product.name}</h3>
         <p class="text-sm text-gray-500 mb-2">${product.category}</p>
          <p class = "text-green-600 font-semibold text-lg">${product.price} $</p>
    </div>` ;

         }).join("");

         //dispay filtred products
         productList.innerHTML = html
   });

 })
//  .catch(error =>{
//         console.error('Could not load products:', error);
      
//   });

    
   
   },100);
});
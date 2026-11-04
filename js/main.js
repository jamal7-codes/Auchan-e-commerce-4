
import {getProducts} from './api.js';

import { setupDragDrop } from './dragDrop.js';

const productList = document.querySelector("#product-list")

const gridView = document.querySelector("#grid-view");
const listView = document.querySelector("#list-view");

const searchInput = document.querySelector("#search-input");

const categoryButtons = document.querySelectorAll(".category-btn");

const basket = document.querySelector("#basket")

let selectedCategory ="All";
 
let isGridView = true;

 const pagination = document.querySelector("#pagination")


 //load products
 setTimeout(() =>{
     
    getProducts()
    .then(products =>{
   const allProducts = products

setupDragDrop(productList, basket, allProducts)

   let totalPages = 1
   let currentPage = 1;
   const productsPerPage= 8;

   function updateProducts(){
      const searchText = searchInput.value.toLowerCase();

      //filter producsts
      const filteredProducts = allProducts.filter(product => {
         const matchesSearch = product.name.toLowerCase().includes(searchText);

         const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

            return matchesSearch && matchesCategory;

      });

 
if(filteredProducts.length === 0) {
   productList.innerHTML = `
   <div class="col-span-full text-center py-8">
     <p class="text-lg font-semibold text-gray-800">No products found.</p>
     <p class="text-sm text-gray-500 mt-2">Try another search or category.</p> </div>`;

     pagination.innerHTML ="";
   return;
} 


//pagination
totalPages = Math.ceil(filteredProducts.length / productsPerPage);

if(currentPage > totalPages) currentPage = totalPages;

 let paginationHTML = "";

 paginationHTML += `<button data-action="prev" ${currentPage === 1 ? "disabled":"" } class= "px-4 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white tansition">Previous</button>`

 for(let i = 1; i <= totalPages; i++){
 
        if (i === currentPage){
       paginationHTML +=`<button data-page="${i}" class="bg-green-600 text-white border rounded-full w-10 h-10">${i}</button>`
      }else{
   paginationHTML +=`<button data-page="${i}" class="bg-gray-200 text-gray-800 border rounded-full w-10 h-10  ">${i}</button>`
    }
 }
 paginationHTML += `<button data-action="next" ${currentPage === totalPages ?"disabled":""}class="px-4 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white transition">Next</button>`

 pagination.innerHTML = paginationHTML;
const start = (currentPage - 1)* productsPerPage;
const end = start + productsPerPage;

const pageProduct = filteredProducts.slice(start, end)

  


 


           //filtred products
           const html = pageProduct.map(product => {

   const cardLayout = isGridView ? "flex-col ":"flex-row"

return `<div draggable="true" data-id="${product.id}" class=" flex ${cardLayout} bg-white border rounded-xl p-3">

       <img class="w-full h-14 object-contain rounded-md" src="${product.image}" 
       alt="${product.name}"> 
        <h3 class = "text-lg font-bold mb-2">${product.name}</h3>
         <p class="text-sm text-gray-500 mb-2">${product.category}</p>
          <p class = "text-green-600 font-semibold text-lg">${product.price} $</p>
    </div>` ;

         }).join("");

         //dispay filtred products
         productList.innerHTML = html

      }


 

 // Grid button 
gridView.addEventListener("click", function () {

    isGridView = true;

    //Switch to grid layout
    productList.classList.remove("flex", "flex-col");
    productList.classList.add("grid", "grid-cols-4");

    //Grid button active
    gridView.classList.add("bg-green-700", "text-white");
    gridView.classList.remove("bg-white", "text-gray-600");

    //List button inactive
    listView.classList.remove("bg-green-700", "text-white");
    listView.classList.add("bg-white", "text-gray-600");

    updateProducts()
});


// list button
listView.addEventListener("click", function () {
isGridView = false;

    //   Switch to List layout
    productList.classList.remove("grid", "grid-cols-4");
    productList.classList.add("flex", "flex-col");

    // List active
    listView.classList.add("bg-green-700", "text-white");
    listView.classList.remove("bg-white", "text-gray-600");

    // Grid inactive
    gridView.classList.remove("bg-green-700", "text-white");
    gridView.classList.add("bg-white", "text-gray-600");

    updateProducts()
});


pagination.addEventListener("click", function(event){

      const button = event.target.closest("button");

   if(!button || button.disabled) return;

   if(button.dataset.page){
      currentPage = Number(button.dataset.page)
   }
else if( button.dataset.action === "prev"){
   currentPage--;

}else if (button.dataset.action === "next"){
   currentPage++;
}
 if(currentPage <1) currentPage = 1;
 if (currentPage > totalPages) currentPage = totalPages;

   updateProducts();

  }); 
 

      //category listener
 categoryButtons.forEach(button => {
   button.addEventListener("click", function(){
     selectedCategory = button.dataset.category;

// Reset all buttons to grey
        categoryButtons.forEach(btn => {
            btn.classList.remove("bg-green-600", "text-white", "border-green-600");
            btn.classList.add("text-gray-700", "border-gray-300");
        });

        // Make the clicked button green
        button.classList.add("bg-green-600", "text-white", "border-green-600");
        button.classList.remove("text-gray-700", "border-gray-300");

     currentPage = 1;
     updateProducts();

   })  

    });
  
 

// search input
   searchInput.addEventListener("input", function(){
      currentPage = 1;
     updateProducts();

      });
   
      updateProducts();
     

 })
 .catch(error =>{
        console.error('Could not load products:', error);
      
  });

    
   
   },300);

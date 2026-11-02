
import { getProducts } from './api.js';

const productList = document.querySelector("#product-list");

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

   function updateProducts(){
      const searchText = searchInput.value.toLowerCase();

                // Filter products
                const filteredProducts = allProducts.filter(product => {

                    const matchesSearch = product.name.toLowerCase().includes(searchText);

                    const matchesCategory =
                        selectedCategory === "All" ||
                        product.category === selectedCategory;

                    return matchesSearch && matchesCategory;
                });

 
if(filteredProducts.length === 0) {
   productList.innerHTML = `
   <div class="col-span-full text-center py-8"></div>
   <p class="text-lg font-semibold text-gray-800">No products found.</p>
   <p class="text-sm text-gray-500 mt-2">Try another search or category.</p>`;
   return;
} 


           //filtred products
           const html = filteredProducts.map(product => {

return `<div class="bg-white border rounded-xl p-3">

                            <img
                                class="${imageLayout} object-contain rounded-md"
                                src="${product.image}"
                                alt="${product.name}"
                            >

                            <div>
                                <h3 class="text-lg font-bold mb-2">
                                    ${product.name}
                                </h3>

                                <p class="text-sm text-gray-500 mb-2">
                                    ${product.category}
                                </p>

                                <p class="text-green-600 font-semibold text-lg">
                                    ${product.price} $
                                </p>
                            </div>

                        </div>
                    `;

                }).join("");

         //dispay filtred products
         productList.innerHTML = html

      }
 
      //category listener
 categoryButtons.forEach(button => {
   button.addEventListener("click", function(){
     selectedCategory = button.dataset.category;
     updateProducts();
    

  }); 
 
 
 
    });
  
 

// search input
   searchInput.addEventListener("input", function(){
     updateProducts();

            // Search input
            searchInput.addEventListener("input", function () {
                currentPage = 1;
                updateProducts();
            });

            // Initial display
            updateProducts();

        })
        .catch(error => {
            console.error("Could not load products:", error);

            productList.innerHTML = `
                <p class="col-span-full text-center text-red-600 py-8">
                    Could not load products. Please try again.
                </p>
            `;
        });

}, 200);

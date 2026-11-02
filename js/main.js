import {getProducts} from './api.js';

const productList = document.querySelector("#product-list")

const gridView = document.querySelector("#grid-view");
const listView = document.querySelector("#list-view");

const searchInput = document.querySelector("#search-input");

const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory ="All";
 
 const pagination = document.querySelector("#pagination")


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

 let paginationHTML = "";

 paginationHTML += `<button data-action="prev" ${currentPage === 1 ? "disabled":""}>Previous</button>`

 for(let i = 1; i <= totalPages; i++){
 
        if (i === currentPage){
       paginationHTML +=`<button data-page="${i}" class="bg-green-600 text-white border rounded-full w-10 h-10">${i}</button>`
      }else{
   paginationHTML +=`<button data-page="${i}" class="bg-gray-200 text-gray-800 border rounded-full w-10 h-10  ">${i}</button>`
    }
 }
 paginationHTML += `<button data-action="next" ${currentPage === totalPages ?"disabled":""}>Next</button>`

 pagination.innerHTML = paginationHTML;
const start = (currentPage - 1)* productsPerPage;
const end = start + productsPerPage;

const pageProduct = filteredProducts.slice(start, end)

  


 


           //filtred products
           const html = pageProduct.map(product => {

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

      }
 
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
 
   updateProducts();



  }); 
 

      //category listener
 categoryButtons.forEach(button => {
   button.addEventListener("click", function(){
     selectedCategory = button.dataset.category;
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

    
   
   },200);
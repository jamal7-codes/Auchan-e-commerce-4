
import { getProducts } from './api.js';

const productList = document.querySelector("#product-list");

const gridView = document.querySelector("#grid-view");
const listView = document.querySelector("#list-view");

const searchInput = document.querySelector("#search-input");
const categoryButtons = document.querySelectorAll(".category-btn");

const pagination = document.querySelector("#pagination");

let selectedCategory = "All";
let isGridView = true;

// Load products
setTimeout(() => {

    getProducts()
        .then(products => {

            const allProducts = products;

            let totalPages = 1;
            let currentPage = 1;
            const productsPerPage = 8;

            function updateProducts() {

                const searchText = searchInput.value.toLowerCase();

                // Filter products
                const filteredProducts = allProducts.filter(product => {

                    const matchesSearch = product.name.toLowerCase().includes(searchText);

                    const matchesCategory =
                        selectedCategory === "All" ||
                        product.category === selectedCategory;

                    return matchesSearch && matchesCategory;
                });

                // No products found
                if (filteredProducts.length === 0) {

                    productList.innerHTML = `
                        <div class="col-span-full text-center py-8">
                            <p class="text-lg font-semibold text-gray-800">
                                No products found.
                            </p>
                            <p class="text-sm text-gray-500 mt-2">
                                Try another search or category.
                            </p>
                        </div>
                    `;

                    pagination.innerHTML = "";
                    return;
                }

                // Pagination
                totalPages = Math.ceil(filteredProducts.length / productsPerPage);

                let paginationHTML = "";

                paginationHTML += `
                    <button data-action="prev"
                        ${currentPage === 1 ? "disabled" : ""}
                        class="px-4 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white transition">
                        Previous
                    </button>
                `;

                for (let i = 1; i <= totalPages; i++) {

                    if (i === currentPage) {
                        paginationHTML += `
                            <button data-page="${i}"
                                class="bg-green-600 text-white border rounded-full w-10 h-10">
                                ${i}
                            </button>
                        `;
                    } else {
                        paginationHTML += `
                            <button data-page="${i}"
                                class="bg-gray-200 text-gray-800 border rounded-full w-10 h-10">
                                ${i}
                            </button>
                        `;
                    }
                }

                paginationHTML += `
                    <button data-action="next"
                        ${currentPage === totalPages ? "disabled" : ""}
                        class="px-4 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white transition">
                        Next
                    </button>
                `;

                pagination.innerHTML = paginationHTML;

                const start = (currentPage - 1) * productsPerPage;
                const end = start + productsPerPage;

                const pageProduct = filteredProducts.slice(start, end);

                // Display products dynamically
                const html = pageProduct.map(product => {

                    const cardLayout = isGridView ? "flex-col" : "flex-row";
                    const imageLayout = isGridView
                        ? "w-full h-14"
                        : "w-24 h-24 shrink-0";

                    return `
                        <div class="flex ${cardLayout} gap-3 bg-white border rounded-xl p-3">

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

                productList.innerHTML = html;
            }

            // Grid button
            gridView.addEventListener("click", function () {

                isGridView = true;
                currentPage = 1;

                productList.classList.remove("flex", "flex-col");
                productList.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4");

                gridView.classList.add("bg-green-700", "text-white");
                gridView.classList.remove("bg-white", "text-gray-600");

                listView.classList.remove("bg-green-700", "text-white");
                listView.classList.add("bg-white", "text-gray-600");

                updateProducts();
            });

            // List button
            listView.addEventListener("click", function () {

                isGridView = false;
                currentPage = 1;

                productList.classList.remove("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4");
                productList.classList.add("flex", "flex-col");

                listView.classList.add("bg-green-700", "text-white");
                listView.classList.remove("bg-white", "text-gray-600");

                gridView.classList.remove("bg-green-700", "text-white");
                gridView.classList.add("bg-white", "text-gray-600");

                updateProducts();
            });

            // Pagination event delegation
            pagination.addEventListener("click", function (event) {

                const button = event.target.closest("button");

                if (!button || button.disabled) return;

                if (button.dataset.page) {
                    currentPage = Number(button.dataset.page);
                } else if (button.dataset.action === "prev") {
                    currentPage--;
                } else if (button.dataset.action === "next") {
                    currentPage++;
                }

                if (currentPage < 1) currentPage = 1;
                if (currentPage > totalPages) currentPage = totalPages;

                updateProducts();
            });

            // Category buttons
            categoryButtons.forEach(button => {

                button.addEventListener("click", function () {

                    selectedCategory = button.dataset.category;

                    categoryButtons.forEach(btn => {
                        btn.classList.remove(
                            "bg-green-600",
                            "text-white",
                            "border-green-600"
                        );

                        btn.classList.add(
                            "text-gray-700",
                            "border-gray-300"
                        );
                    });

                    button.classList.add(
                        "bg-green-600",
                        "text-white",
                        "border-green-600"
                    );

                    button.classList.remove(
                        "text-gray-700",
                        "border-gray-300"
                    );

                    currentPage = 1;
                    updateProducts();
                });
            });

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

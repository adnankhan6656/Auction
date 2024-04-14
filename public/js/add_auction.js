
let add = document.getElementById("add")
let cancel = document.getElementById("cancel")
let form = document.getElementById("form");
let page;
let totaPages;
function checkValidation(){
   
    let title = document.getElementById("title");
    let description = document.getElementById("description")
    let image = document.getElementById("image")
    let start_time = document.getElementById("start_time")
    let end_time = document.getElementById("end_time");
    
    if(title.value.trim() == '' || description.value.trim() == ''  || start_time.value.trim() == '' || end_time.value.trim() == ''){
       alert("please Fill All relevent Fields")
        return false;
    }
    if (image.files.length === 0) {
        alert('Please select an image.');
         return false;
      }
      if (image.files.length > 1) {
        alert('Please select only one image.');
        // Clear the selected files
        image.value = '';
      }
    
      
      if (new Date(start_time.value) >= new Date(end_time.value)) {
        alert('The start time must be before the end time.');
        return false;
      }
    return true;
}



// add.addEventListener("click",submitForm);
cancel.addEventListener("click",()=>{
    window.location.pathname="/seller/dashboard";
});



// Handling Next button functionaality


function nextStep(currentStepId, nextStepId) {
    const currentStep = document.getElementById(currentStepId);
    const nextStep = document.getElementById(nextStepId);
    currentStep.classList.add('hidden');
    nextStep.classList.remove('hidden');
}

function prevStep(currentStepId, prevStepId) {
    const currentStep = document.getElementById(currentStepId);
    const prevStep = document.getElementById(prevStepId);
    currentStep.classList.add('hidden');
    prevStep.classList.remove('hidden');
}




function validateAddAuctionData(){
    let title = document.getElementById("title");
    let description = document.getElementById("description")
    let image = document.getElementById("image")
    let start_time = document.getElementById("start_time")
    let end_time = document.getElementById("end_time");
    
    if(title.value.trim() == '' || description.value.trim() == ''  || start_time.value.trim() == '' || end_time.value.trim() == ''){
       alert("please Fill All relevent Fields")
        return false;
    }
    if (image.files.length === 0) {
        alert('Please select an image.');
         return false;
      }
      if (image.files.length > 1) {
        alert('Please select only one image.');
        // Clear the selected files
        image.value = '';
      }
    
      
      if (new Date(start_time.value) >= new Date(end_time.value)) {
        alert('The start time must be before the end time.');
        return false;
      }
    nextStep('step-1','step-2')


}


async function goToCreateAuction(){
   
    function getSelectedProducts() {
        var selectedProducts = [];
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach((checkbox) => {
          var product = {
            id: checkbox.parentElement.parentElement.children[0].innerHTML
          };
          selectedProducts.push(product);
        });
        return selectedProducts;
      }
    let selectedProducts=getSelectedProducts();
    console.log(selectedProducts);
    try {
      let response = await fetch("/seller/dashboard/get_add_auction_selected_products", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(selectedProducts)
      });

      if (response.ok) {
          let data = await response.json();
          let products=data.products;
          document.getElementById('selected-products').innerHTML = '';
          products.forEach((product)=>{
            showSelectedCards(product)
          })
          nextStep('step-2', 'step-3');
      } else {
          console.error("Failed to fetch selected products");
          // Handle error
      }
  } catch (error) {
      console.error("Error fetching selected products:", error);
      // Handle error
  }


    
}
// to Show cards in step3

function showSelectedCards(product){
  const selectedProductsContainer = document.getElementById('selected-products');
 
  const card = document.createElement('div');
  card.classList.add('shadow-lg', 'p-4', 'rounded-md', 'flex','flex-col', 'items-center', 'justify-between', 'w-64');
console.log(product)
  // Display product information in the card
  card.innerHTML = `
      <p class="text-gray-900">${product.product_name}</p>
      <input type="text" id="starting_bid_price_${product.id}" name="starting_bid_price_${product.id}" placeholder="Starting Bid Price" class="border-b-2 p-2" >
      <input type="text" id="price_interval_${product.id}" name="price_interval_${product.id}" placeholder="Price Interval" class="border-b-2 p-2" >
      <input type="text" id="reserve_price_${product.id}" name="reserve_price_${product.id}" placeholder="Reserve Price" class="border-b-2 p-2">
  `;

  selectedProductsContainer.appendChild(card);
}
// this is section for pagination start
window.onload=loadproducts;

async function loadproducts(){
  let tablebody=document.getElementById("tablebody");
    let response=await fetch("/seller/dashboard/get_add_product_auction");
     let data=await response.json(); 
     console.log(data)
    page=data.currentPage;
    totaPages=data.totalPages;
      let products=data.products;
      rednderProducts(products);
    
    }
function rednderProducts(products){
  tablebody.innerHTML=""
  products.forEach((product)=>{
    console.log(product)
    let row = document.createElement("tr");
     row.classList.add("bg-white","border-b","border-gray-700")
    let id= document.createElement("td");
    id.textContent = product.id;
    id.classList.add("px-6", "py-4", "text-gray-900", "whitespace-nowrap", "dark:text-white")        ;
    row.appendChild(id);
    let name = document.createElement("td");
    name.textContent = product.product_name;
    name.classList.add("px-6", "py-4", "text-gray-900", "whitespace-nowrap", "dark:text-white")        ;
    row.appendChild(name);
    let description = document.createElement("td");
    description.textContent = product.description;
    description.classList.add("px-6", "py-4", "font-medium", "text-gray-900", "whitespace-nowrap", "dark:text-white");
    row.appendChild(description);
    let category = document.createElement("td");
    category.textContent = product.category_id;
    category.classList.add("px-6", "py-4", "text-gray-900", "whitespace-nowrap", "dark:text-white");
    row.appendChild(category);
    let status = document.createElement("td");
    status.textContent = product.status;
    status.classList.add("px-6", "py-4", "text-gray-900", "whitespace-nowrap", "dark:text-white")
    row.appendChild(status);
    let checkbox = document.createElement("td");
    let input = document.createElement("input");
input.type = "checkbox";
checkbox.appendChild(input);
row.appendChild(checkbox);
checkbox.classList.add("px-6", "py-4");
    tablebody.appendChild(row);
  })
}
async function nextPage(){
  page++;
  if(page<=totaPages){
    let response=await fetch(`/seller/dashboard/get_add_product_auction?page=${page}`);
    let data=await response.json(); 
      let products=data.products;
      rednderProducts(products)
    }

 
}
     
async function prevPage(){
  if(page>=1){
    page--;
    let response=await fetch(`/seller/dashboard/get_add_product_auction?page=${page}`);
  let data=await response.json(); 
  
    let products=data.products;
    rednderProducts(products)
  }
}
async function goToFirstPage(){
if(page>=1){
  page=1;
  let response=await fetch(`/seller/dashboard/get_add_product_auction?page=1`);
  let data=await response.json(); 
  
    let products=data.products;
    rednderProducts(products)
}
}
async function goToLastPage(){
  
if(page<=totaPages){
  page=totaPages;
  let response=await fetch(`/seller/dashboard/get_add_product_auction?page=${totaPages}`);
  let data=await response.json(); 
  
    let products=data.products;
    rednderProducts(products)
}
}

// this is section for pagination ends
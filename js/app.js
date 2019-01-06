//Variables
const tshirts = document.querySelector('#tshirt-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');
const clearCartBtn = document.querySelector('#clear-cart');


//Event Listeners
loadEventListeners();
function loadEventListeners(){
    //When the new tshirt is added
    tshirts.addEventListener('click', buyTshirt);
    //When the remove button is clicked in Cart.
    shoppingCartContent.addEventListener('click', removeTshirt);
    //When the Clear Cart button is pressed. 
    clearCartBtn.addEventListener('click', clearTheCart );
    /// Get  Cart items from LocalStorage on Refresh
    document.addEventListener('DOMContentLoaded', getFromLocalStorage );
    
}

//Functions

function buyTshirt(e){
    e.preventDefault();
    //Use delegation to find the tshirt which was selected for the cart addition.
    if(e.target.classList.contains('add-to-cart')){
        //Read the Tshirt values by reaching its parent element
        const tshirt = e.target.parentElement.parentElement;

        //Read the values respectively
            getTshirtInfo(tshirt);
    }
}
//Reads the HTML Info of the selected Tshirt
function getTshirtInfo(tshirt){

    const tshirtInfo = {
        image: tshirt.querySelector('img').src,
        title: tshirt.querySelector('h4').textContent,
        price: tshirt.querySelector('.price span').textContent,
        id: tshirt.querySelector('a').getAttribute('data-id')
    }
    addIntoCart(tshirtInfo);
}


//Function Displaying the products in Cart
function addIntoCart(tshirt){
    // creat a tr
    const row = document.createElement('tr');
    // Build the template
    row.innerHTML=`
        <tr>
                <td>
                    <img src="${tshirt.image}"  width = 100px>
                </td>
                <td> ${tshirt.title} </td>
                <td> ${tshirt.price} </td>
                <td>
                    <a href="#" class='remove' data-id="${tshirt.id}"> X</a>
                </td>
        </tr>
    `;
    //Add into the Shopping Cart
    shoppingCartContent.appendChild(row);

    //Adding into the local storage
    saveIntoStorage(tshirt);
}

// Function Adding the items in Local Storage
    function saveIntoStorage (tshirt) {
        let tshirts = getTshirtfromStorage();
    // Adding tshirts in array; 
    tshirts.push(tshirt);
    
    //since storage only usaves in string so we convert
    localStorage.setItem('tshirts' , JSON.stringify(tshirts));
    
}

// Get the contents from Storage
function getTshirtfromStorage(){
    let tshirts;

    // If anything exists in storage then we get the value, otherwise create an empty Array
    if(localStorage.getItem('tshirts')===null){
        tshirts = [];
    }
    else {
        tshirts = JSON.parse(localStorage.getItem('tshirts'));
    }
    return tshirts;
}

// Get  Cart items from LocalStorage on Refresh
function getFromLocalStorage(){
    let tshirtsLS = getTshirtfromStorage();

    //Loop through the tshirts and print in cart
     tshirtsLS.forEach(function(tshirt) {

            const row = document.createElement('tr');

            // Print the Content
            row.innerHTML=`
            <tr>
                    <td>
                        <img src="${tshirt.image}"  width = 100px>
                    </td>
                    <td> ${tshirt.title} </td>
                    <td> ${tshirt.price} </td>
                    <td>
                        <a href="#" class='remove' data-id="${tshirt.id}"> X</a>
                    </td>
            </tr>
        `;

            shoppingCartContent.appendChild(row);
         
     });

}



//Functoin Removing the item from Cart
function removeTshirt(e){
    if(e.target.classList.contains('remove'))
    {
        e.target.parentElement.parentElement.remove();
    }

}
// Clears the shopping cart completely.
function clearTheCart(){
    shoppingCartContent.innerHTML='';
    /* while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
     } */
}


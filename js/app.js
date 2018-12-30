//Variables
const tshirts = document.querySelector('#tshirt-list'),
        shoppingCartContent = document.querySelector('#cart-content tbody');


//Event Listeners
loadEventListeners();
function loadEventListeners(){
    tshirts.addEventListener('click', buyTshirt);

    shoppingCartContent.addEventListener('click', removeTshirt);
    
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
}

//Functoin Removing the item from Cart
function removeTshirt(e){
    if(e.target.classList.contains('remove'))
    {
        e.target.parentElement.parentElement.remove();
    }

}
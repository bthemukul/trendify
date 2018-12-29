//Variables
const tshirts = document.querySelector('#tshirt-list')






//Event Listeners
loadEventListeners();
function loadEventListeners(){
    tshirts.addEventListener('click', buyTshirt);
    
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
        console.log(tshirt);
}

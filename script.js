
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
let pricesItemsCart = JSON.parse(localStorage.getItem('pricesItemsCart')) || [];

function updateShoppingCart() {

    // Check if shoppingCartCounter exists before using it
    const shoppingCartCounter = document.querySelector(".shopping-cart-item-counter");
    if (shoppingCartCounter) {
        shoppingCartCounter.innerHTML = shoppingCart.length;
    }

    shoppingCartPrice.innerHTML = addPrices();
}


let products = [
    {
        id: 1,
        name: 'Cat Lady Pin',
        category: 'Enamel Pins',
        description: 'Other than all the cat furr on your clothes, how are people to know how much you love your cats? This pin announces your crazy cat lady status to the world! Available in black or white.',
        price: 3,
        picture: ['./assets/products/cat+lady+white.png',
            './assets/products/cat+lady+black.png'],
        colors: ['black', 'white']

    },
    {
        id: 2,
        name: 'Stay Pawsitive Pin',
        category: 'Enamel Pins',
        description: 'Cute and fun design, these Stay Pawsitive lapel pins are perfect for adorning your favourite jacket, bag or clothing, or you could collect them and display them as cute little art pieces!',
        price: 3,
        picture: ['./assets/products/staypawsitive.jpeg'],
        colors: []
    },
    {
        id: 3,
        name: 'Cat Collars',
        category: 'Cat Collars',
        description: 'Cat collars that are both stylish and functional, with a safety clasp to ensure your cat doesn’t get stuck.',
        price: 4,
        picture: ['./assets/products/collar+green.jpeg',
            './assets/products/collar+dark+blue.jpeg',
            './assets/products/collar+pink.jpeg',
            './assets/products/collar+purple.jpeg'],
        colors: ['blue', 'red', 'purple', 'green']
    },
    {
        id: 4,
        name: 'Cat Bandana',
        category: 'Cat Bandanas',
        description: 'Get your furry friend a bandana and they’ll be the most stylish cat on the block.',
        price: 5,
        picture: ['./assets/products/cat+bandana.jpeg',
            './assets/products/bandanas.jpeg',
            './assets/products/bandana+yellow.jpeg',
            './assets/products/bandana+avocado.jpeg'],
        colors: []
    },
    {
        id: 5,
        name: 'Cat Litter Tray And Scoop',
        category: 'Litter Trays & Litter',
        description: 'This litter tray with high sides gives cats with messier bathroom habits plenty of space and it prevents litter from scattering. Despite the higher sides, the slight dip in the front allows easy access for all cats.',
        price: 17,
        picture: ['./assets/products/litter+tray.png',
            './assets/products/litter+tray+blue.png',
            './assets/products/litter+tray+green.png',
            './assets/products/litter+scoop.png'],
        colors: ['blue', 'green']
    },

    {
        id: 6,
        name: 'Cat Litter 10kg',
        category: 'Litter Trays & Litter',
        description: 'Outstanding odor control - keep your cat’s litter box smelling fresh thanks to a natural unscented litter with long-lasting odor control. Quick clumping and easy scooping, no more chiseling and scraping thanks to a fast-acting natural litter that leaves less mess in and around your litter box. Most 10 litre bags contain only 7kg litter! Ours are 10kg and best value for money.',
        price: 18,
        picture: ['./assets/products/cat+litter.jpeg'],
        colors: []
    },
    {
        id: 7,
        name: 'Cat Backpack Carrier',
        category: 'Cat Backpack Carriers',
        description: 'This high quality cat carrier backpack is perfect for pet owners who want to travel with their furry friends in style and comfort. Made with durable materials and featuring adjustable straps and ample ventilation, this backpack-style carrier is perfect for outdoor adventures.',
        price: 25,
        picture: ['./assets/products/cat+carrier+blue.png',
            './assets/products/cat+carrier+pink.png'],
        colors: ['blue', 'pink']
    },
    {
        id: 8,
        name: 'Cat Hammock',
        category: 'Cat Hammocks & Beds',
        description: 'Introducing our window mounted cat hammock, the perfect spot for your furry friend to relax and watch the world go by. With strong silicone suction grips, this hammock is easy to install and holds up to 15kg, while the sleek black design will complement any home decor. Size 55cm x 35cm.',
        price: 15,
        picture: ['./assets/products/cat+hammock.jpeg'],
        colors: ['blue', 'pink']
    }


]


// DOM manipulation and name assignment for main page

const categoryBubble = document.querySelector(".category-bubble")
const pCategory = document.querySelectorAll(".p-category")
const pCard = document.querySelectorAll(".product-card");

for (let i = 0; i < pCategory.length; i++) {
    pCategory[i].addEventListener("click", (event) => {
        let selectedCategory = event.target.textContent;
        let filteredProducts = products.filter(product => product.category === selectedCategory);
        for (let j = 0; j < pCard.length; j++) {
            pCard[j].innerHTML = "";
        }
        for (let k = 0; k < filteredProducts.length; k++) {
            let img = document.createElement("img");
            img.src = filteredProducts[k].picture[0];
            let pTitle = document.createElement("h3");
            pTitle.innerHTML = filteredProducts[k].name;
            pCard[k].appendChild(pTitle);
            pCard[k].appendChild(img);
            pCard[k].addEventListener("click", () => {
                window.location.href = `./product-page.html?productName=${filteredProducts[k].name}`;
            });
        }
    });

}


// // DOM manipulation and name assignment for product page
const buyButtonElement = document.getElementById("buy-button");

// DOM manipulation and name assignment for shopping cart
const shoppingCartCounter = document.querySelector(".shopping-cart-item-counter");
const shoppingCartPrice = document.querySelector(".shopping-cart-price");
const shoppingCartButton = document.querySelector(".shopping-cart");


document.addEventListener("DOMContentLoaded", function () {
    const productNameElement = document.querySelector(".product-name");
    const productImageElement = document.querySelector(".product-image");
    const productDescriptionElement = document.querySelector(".product-description");

    const clearButton = document.querySelector(".clear-button");
    const checkoutButton = document.getElementById("checkout-button");

    const orderContainer = document.getElementById("order-container");
    const storedOrders = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const params = new URLSearchParams(window.location.search);
    const productName = params.get('productName');

    if (productNameElement) {
        productNameElement.innerHTML = productName;
        // Find the corresponding product from the products array and use its data to populate the other elements
        const selectedProduct = products.find(product => product.name === productName);
        if (selectedProduct) {
            // Populate other elements using selectedProduct data
            productImageElement.src = selectedProduct.picture[0];
            productDescriptionElement.innerHTML = selectedProduct.description;
        }
        buyButtonElement.addEventListener("click", () => {
            if (selectedProduct) {
                shoppingCart.push(selectedProduct.name);
                pricesItemsCart.push(selectedProduct.price);
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                localStorage.setItem('pricesItemsCart', JSON.stringify(pricesItemsCart)); // Store the shopping cart data in localStorage
                alert("Thanks for shopping. This is what you have in your shopping cart: " + shoppingCart);
                updateShoppingCart();
            }
        });

    }

    if (shoppingCartButton) {
        shoppingCartButton.addEventListener("click", function () {
            window.location.href = "checkout-page.html";

        });

    }

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            window.location.href = "payment-page.html";
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            // Clear the cart logic here (for now, let's alert)
            alert("Shopping cart cleared!");
            shoppingCart = [];
            pricesItemsCart = [];
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            localStorage.setItem('pricesItemsCart', JSON.stringify(pricesItemsCart));
            updateShoppingCart();
        });
    }

    updateShoppingCart();
    for (let i = 0; i < storedOrders.length; i++) {
        const orderItem = document.createElement("div");
        orderItem.innerHTML = `${storedOrders[i]} - $${pricesItemsCart[i]}`;
        orderContainer.appendChild(orderItem);
    }
    const shoppingCartCounter = document.querySelector(".shopping-cart-item-counter");
    if (shoppingCartCounter) {
        shoppingCartCounter.innerHTML = shoppingCart.length;
    }

});


function addPrices() {
    return pricesItemsCart.reduce((total, price) => total + price, 0);
}

let totalPrice = addPrices();

shoppingCartPrice.innerHTML = totalPrice;







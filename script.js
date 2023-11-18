// Global Variables
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
let pricesItemsCart = JSON.parse(localStorage.getItem('pricesItemsCart')) || [];

// Function to add up prices
function addPrices() {
    return pricesItemsCart.reduce((total, price) => total + price, 0);
}

// Function to update the shopping cart
function updateShoppingCart() {
    shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    pricesItemsCart = JSON.parse(localStorage.getItem('pricesItemsCart')) || [];

    const shoppingCartCounter = document.querySelector(".shopping-cart-item-counter");
    if (shoppingCartCounter) {
        shoppingCartCounter.innerHTML = shoppingCart.length;
    }

    const orderTotal = document.querySelector("#total-order");


    const shoppingCartPrice = document.querySelector(".shopping-cart-price");
    if (shoppingCartPrice) {
        shoppingCartPrice.innerHTML = addPrices();
    }
    if (orderTotal) {
        orderTotal.innerHTML = addPrices();
    }



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

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // Update shopping cart on page load
    updateShoppingCart();

    // Code specific to product page
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('productName');
    const selectedProduct = products.find(product => product.name === productName);

    if (productName && selectedProduct) {
        const productNameElement = document.querySelector(".product-name");
        const productImageElement = document.querySelector(".product-image");
        const productDescriptionElement = document.querySelector(".product-description");
        const buyButtonElement = document.getElementById("buy-button");

        if (productNameElement && productImageElement && productDescriptionElement && buyButtonElement) {
            productNameElement.innerHTML = selectedProduct.name;
            productImageElement.src = selectedProduct.picture[0];
            productDescriptionElement.innerHTML = selectedProduct.description;

            buyButtonElement.addEventListener("click", () => {
                shoppingCart.push(selectedProduct.name);
                pricesItemsCart.push(selectedProduct.price);

                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                localStorage.setItem('pricesItemsCart', JSON.stringify(pricesItemsCart));

                alert("Added to cart: " + selectedProduct.name);
                updateShoppingCart();
            });
        }
    }
    // Code specific to shopping cart page
    const shoppingCartButton = document.querySelector(".shopping-cart");
    if (shoppingCartButton) {
        shoppingCartButton.addEventListener("click", () => {
            window.location.href = "checkout-page.html";
        });
    }

    const clearButton = document.querySelector(".clear-button");
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            shoppingCart = [];
            pricesItemsCart = [];
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            localStorage.setItem('pricesItemsCart', JSON.stringify(pricesItemsCart));
            updateShoppingCart();
        });
    }
});



// Function to add up prices
function addPrices() {
    return pricesItemsCart.reduce((total, price) => total + price, 0);
}

// DOM manipulation for main page
document.addEventListener("DOMContentLoaded", function () {
    const pCategory = document.querySelectorAll(".p-category");
    const pCard = document.querySelectorAll(".product-card");

    pCategory.forEach(category => {
        category.addEventListener("click", (event) => {
            let selectedCategory = event.target.textContent;
            let filteredProducts = products.filter(product => product.category === selectedCategory);
            pCard.forEach((card, index) => {
                if (filteredProducts[index]) {
                    card.innerHTML = `<h3>${filteredProducts[index].name}</h3><img src="${filteredProducts[index].picture[0]}">`;
                    card.addEventListener("click", () => {
                        window.location.href = `./product-page.html?productName=${filteredProducts[index].name}`;
                    });
                } else {
                    card.innerHTML = "";
                }
            });
        });
    });

    // Event Listeners for Product Page
    // const buyButtonElement = document.getElementById("buy-button");
    // if (buyButtonElement) {
    //     const params = new URLSearchParams(window.location.search);
    //     const productName = params.get('productName');
    //     const selectedProduct = products.find(product => product.name === productName);

    //     buyButtonElement.addEventListener("click", () => {
    //         if (selectedProduct) {
    //             shoppingCart.push(selectedProduct.name);
    //             pricesItemsCart.push(selectedProduct.price);
    //             localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    //             localStorage.setItem('pricesItemsCart', JSON.stringify(pricesItemsCart));
    //             alert("Thanks for shopping. This is what you have in your shopping cart: " + shoppingCart);
    //             updateShoppingCart();
    //         }
    //     });
    // }

    // Event Listeners for Shopping Cart
    const shoppingCartButton = document.querySelector(".shopping-cart");
    if (shoppingCartButton) {
        shoppingCartButton.addEventListener("click", () => {
            window.location.href = "checkout-page.html";
        });
    }

    const clearButton = document.querySelector(".clear-button");
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            shoppingCart = [];
            pricesItemsCart = [];
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            localStorage.setItem('pricesItemsCart', JSON.stringify(pricesItemsCart));
            updateShoppingCart();
            alert("Shopping cart cleared!");
        });
    }

    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            window.location.href = "payment-page.html";
        });
    }

    // Update shopping cart on page load
    updateShoppingCart();

    // Populate Orders in Cart
    const orderContainer = document.getElementById("order-container");
    const storedOrders = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    storedOrders.forEach((order, index) => {
        const orderItem = document.createElement("div");
        orderItem.innerHTML = `${order} - $${pricesItemsCart[index]}`;
        orderContainer.appendChild(orderItem);
    });
});
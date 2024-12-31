// This is the items array that contains the menu items
const items = [
    { name: "Espresso", price: 2.5 },
    { name: "Latte", price: 3.0 },
    { name: "Cappuccino", price: 3.5 },
    { name: "Americano", price: 2.8 },
    { name: "Mocha", price: 3.2 },
    { name: "Macchiato", price: 3.0 },
    { name: "Flat White", price: 3.0 },
    { name: "croissant", price: 1.5 },
    { name: "chocolat au pain", price: 2.0 },
];

// This is the basket array that contains the items added to the basket	
let basket = [];

// By clicking on the item, it will be added to the basket
function addToBasket(itemName) {
    let item;
    if (itemName === "Espresso" || itemName === "Latte" || itemName === "Cappuccino") {
        item = items.find(i => i.name === itemName);
    } else {
        item = items.find(i => i.name === itemName);
    }

    if (item) {
        basket.push(item);
        updateBasketCount();
        console.log(item);
    }
}

// This function is used to update the basket count
function updateBasketCount() {
    const basketCount = document.getElementById("basketCount");
    basketCount.textContent = `(${basket.length})`; // Use backticks here
    console.log(basket.length);
}

// We can show the menu by clicking on the menu button
function showMenu() {
    document.getElementById("menu").style.display = "flex";
    document.getElementById("basket").style.display = "none";
    document.getElementById("countdownTimer").style.display = "none";
    updateBasketCount();
    console.log("showMenu");
}

// By clicking on the basket button, we can show the basket
function showBasket() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("basket").style.display = "block";
    updateBasket();
    console.log("showBasket");
}

// This function is used to update the list of items in the basket and the total price
function updateBasket() {
    const basketItems = document.getElementById("basketItems");
    basketItems.innerHTML = " ";
    let total = 0;

    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        const li = document.createElement("li");
        li.innerHTML = item.name + "- € " + item.price.toFixed(2) + ' <button onclick="removeFromBasket(' + i + ')">Remove</button>';
        basketItems.appendChild(li);
        total += item.price;
    }

    document.getElementById("totalPrice").textContent = "Total: €" + total.toFixed(2);
    console.log("updateBasket");
}

// This function will allow the client to remove an item from the basket
function removeFromBasket(index) {
    basket.splice(index, 1);
    updateBasket();
    updateBasketCount();
    console.log("removeFromBasket");
}

// This function is used to allow the client to place an order
function handleOrder() {
    if (basket.length === 0) {
        alert("Your basket is empty!");
        return;
    }

    const tableNumber = prompt("Enter your table number:");
    const paymentMethod = prompt("Enter your payment method (cash or card):");

    if (tableNumber > 0 && tableNumber <= 15 && (paymentMethod === "cash" || paymentMethod === "card")) {
        alert("Order successful! Table number: " + tableNumber + ", Payment method: " + paymentMethod);
        basket = [];
        updateBasket();
        document.getElementById("menu").style.display = "none";
        document.getElementById("basket").style.display = "none";
        document.getElementById("countdownTimer").style.display = "block";
        startCountdown();
    } else {
        alert("Order failed! Please enter all required information.");
    }
    console.log("handleOrder");
}

/* I used these sources to help me with the code below:
 1. https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown 
 2. https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
*/

// This function is used to start the countdown timer after the order is placed
function startCountdown() {
    let timeLeft = 5 * 60; // 5 minutes in seconds
    const countdownElement = document.getElementById("countdownTimer");

    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.innerHTML = "Your order will be ready in " + minutes + "m " + seconds + "s";

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "Your order is ready!";
        }
    }, 1000);
    console.log("startCountdown");
}

document.getElementById("orderButton").addEventListener("click", handleOrder);

// This function will update the basket count when the page is loaded
updateBasketCount();
console.log("updateBasketCount");

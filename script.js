// SNACK 1

// const hamburger = { name: "Cheese Burger", weight: 250 };
// const secondBurger = hamburger;
// secondBurger.name = 'Double Cheese Burger';
// secondBurger.weight = 500;

// console.log(hamburger.name); // ?
// console.log(secondBurger.name); // ?

// In entrambi i log appare "Double Cheese Burger"


// SNACK 2

// const hamburger = {
//     name: "Cheese Burger",
//     weight: 250,
//     ingredients: ["Cheese", "Meat", "Bread", "Tomato"]
// };

// const secondBurger = { ...hamburger };
// secondBurger.ingredients[0] = "Salad";

// console.log(hamburger.ingredients[0]); // ?
// console.log(secondBurger.ingredients[0]); // ?

// In entrambi i log appare "Salad"


//  SNACK 3

// const hamburger = {
//     name: "Cheese Burger",
//     weight: 250,
//     maker: {
//         name: "Anonymous Chef",
//         restaurant: {
//             name: "Hyur's Burgers",
//             address: "Main Street, 123",
//             isOpen: true,
//         },
//         age: 29
//     }
// };

// const secondBurger = structuredClone(hamburger);
// const thirdBurger = structuredClone(hamburger);

// Abbiamo 9 oggetti in memoria (3 con hamburger + 3 con secondBurger + 3 con thirdBurger)


// SNACK 4

// const chef = {
//     name: "Chef Hyur",
//     age: 29,
//     makeBurger: (num = 1) => {
//         console.log(`Ecco ${num} hamburger per te!`);
//     },
// }

//  Con chef il metodo migliore è { ...chef } , non è necessarioo il deep clone

// const restaurant = {
//     name: "Hyur's Burgers",
//     address: {
//         street: 'Main Street',
//         number: 123,
//     },
//     openingDate: new Date(2025, 3, 11),
//     isOpen: false,
// };

//  Con resturant uso structuredClone() perchè abbiamo oggetti annidati e Date,  qui il deep clone ci vuole


// BONUS 5

const hamburger = {
    name: "Cheese Burger",
    weight: 250,
    maker: {
        name: "Anonymous Chef",
        restaurant: {
            name: "Hyur's Burgers",
            address: "Main Street, 123",
            isOpen: true,
        },
        age: 29
    }
};

const newRestaurant = { ...hamburger.maker.restaurant };
newRestaurant.name = "Hyur's II";
newRestaurant.address = "Second Street, 12";
const secondBurger = { ...hamburger };
secondBurger.maker.restaurant = newRestaurant;
secondBurger.maker.name = "Chef Hyur";

console.log(hamburger.maker.name); //  "Chef Hyur" viene modificato indirettamente da secondBurger
console.log(secondBurger.maker.name); // "Chef Hyur"

console.log(hamburger.maker.restaurant.name); // "Hyur's Burgers" non viene sovrascritto (hamburger ha ancora il vecchio riferimento)
console.log(secondBurger.maker.restaurant.name); // "Hyur's II" userà newRestaurant

// Oggetti in memoria:

// hamburger – 1 oggetto
// hamburger.maker – 1 oggetto
// hamburger.maker.restaurant – 1 oggetto
// newRestaurant – 1 oggetto (clone shallow)
// secondBurger – 1 oggetto (shallow clone con maker condiviso)
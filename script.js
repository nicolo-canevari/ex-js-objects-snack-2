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

// const newRestaurant = { ...hamburger.maker.restaurant };
// newRestaurant.name = "Hyur's II";
// newRestaurant.address = "Second Street, 12";
// const secondBurger = { ...hamburger };
// secondBurger.maker.restaurant = newRestaurant;
// secondBurger.maker.name = "Chef Hyur";

// console.log(hamburger.maker.name); //  "Chef Hyur" viene modificato indirettamente da secondBurger
// console.log(secondBurger.maker.name); // "Chef Hyur"

// console.log(hamburger.maker.restaurant.name); // "Hyur's Burgers" non viene sovrascritto (hamburger ha ancora il vecchio riferimento)
// console.log(secondBurger.maker.restaurant.name); // "Hyur's II" userà newRestaurant

// Oggetti in memoria:

// hamburger – 1 oggetto
// hamburger.maker – 1 oggetto
// hamburger.maker.restaurant – 1 oggetto
// newRestaurant – 1 oggetto (clone shallow)
// secondBurger – 1 oggetto (shallow clone con maker condiviso)


// SNACK 6

// const chef = {
//     name: "Chef Hyur",
//     age: 29,
//     makeBurger: (num = 1) => {
//         console.log(`Ecco ${num} hamburger per te!`);
//     },
//     restaurant: {
//         name: "Hyur's Burgers",
//         welcomeClient: () => {
//             console.log("Benvenuto!");
//         },
//         address: {
//             street: 'Main Street',
//             number: 123,
//             showAddress: () => {
//                 console.log("Main Street 123");
//             }
//         },
//         isOpen: true,
//     }
// }

// Il metodo migliore per una clonazione profonda è usare una libreria come lodash (npm install lodash).
// Clona profondamente ogni livello dell'oggetto, mantiene le funzioni e evita i riferimenti condivisi tra oggetto
// originale e clone


// EXTRA-BONUS 

// Funzione ricorsiva per effettuare una copia profonda (deep copy) di un oggetto
function deepClone(obj) {

    // Se obj è null o un tipo primitivo (string, number, boolean, function), lo restituisce immediatamente
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Gestione speciale per oggetti Date
    if (obj instanceof Date) {
        // Nuova istanza con la stessa data
        return new Date(obj);
    }

    // Se è un array, crea un nuovo array e clona ricorsivamente ogni elemento
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    // Crea un nuovo oggetto vuoto
    const clone = {};

    // Ciclo su tutte le proprietà dell’oggetto (solo quelle proprie, non ereditate)
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    // Restituisce l’oggetto completamente copiato
    return clone;
}

// Test con l'oggetto chef
const chef = {
    name: "Chef Hyur",  // stringa primitiva
    age: 29,   // numero primitivo
    // funzione da mantenere
    makeBurger: (num = 1) => {
        console.log(`Ecco ${num} hamburger per te!`);
    },
    // oggetto annidato
    restaurant: {
        name: "Hyur's Burgers",
        welcomeClient: () => {
            console.log("Benvenuto!");
        },
        // oggetto annidato
        address: {
            street: 'Main Street',
            number: 123,
            showAddress: () => {
                console.log("Main Street 123");
            }
        },
        isOpen: true,
    }
};

// Clona chef
const clonedChef = deepClone(chef);

// Modifica i dati del clone per verificarne l’indipendenza
clonedChef.name = "New Chef";
clonedChef.restaurant.name = "New Restaurant";

// Esegue i metodi per confermare che le funzioni sono ancora attive
clonedChef.makeBurger(2);
clonedChef.restaurant.welcomeClient();
clonedChef.restaurant.address.showAddress();

// Verifica che l’originale non sia stato modificato
console.log(chef.name);
console.log(chef.restaurant.name);

// Ricorsività vera (deep copy): si assicura che ogni proprietà venga compiata senza modificare l'oggetto originale
// Supporta oggetti speciali come Date
// Gli array vengono ricreati elemento per elemento usando map() e deepClone(), quindi anch’essi sono copiati a fondo.
// Le funzioni vengono trattate come valori primitivi (non sono oggetti), quindi non vengono clonate ma semplicemente copiate.

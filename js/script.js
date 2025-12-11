


/* js for the flavors */

/* this is going to be pretty intensive, its basically a toggle and link switcher */

/*js directly below is just so i can make sure my js is attached, i did alerts previously but it coming up with every page click...while helpful...was so irritating */
console.log("Loaded javascript successfully!");
const flavors = document.querySelectorAll('.flavor');
const linkBox = document.getElementById('flavor-link-box');
const linkText = document.getElementById('flavor-link-text');

/* now i can add event listener mY BELOVED <333333333 */

flavors.forEach(flavor => {
	flavor.addEventListener('click', () => {
		const img = flavor.querySelector('img');
		const desc = flavor.querySelector('.aboutflavor');
		const isActive = desc.style.display === 'block';
		
		/* this will be the part that makes them reset :3 */
		flavors.forEach(f => {
			f.querySelector('img').style.display = 'block';
			f.querySelector('.aboutflavor').style.display = 'none';
		});
		
		if(!isActive) {
			img.style.display = 'none';
			desc.innerHTML = flavor.dataset.description;
			desc.style.display = 'block';
			
		/* this is the cute part that adds a shopping link to the flavor of coffee youre on */
		linkBox.style.display = 'block';
		const flavorName = flavor.querySelector('.flavortype').textContent;
		const flavorLink = flavor.dataset.link;
		linkText.innerHTML = `You should try this ${flavorName} coffee!!!! <br> <a href="${flavorLink}" target="_blank">Shop Here :3</a>`;
		} else {
			linkBox.style.display = 'none';
		}
	});
});

/* js for the perfect match - starting with the drink array~ */

const drinks = [
{ name: "Light Roast Strawberry White Mocha", category: "Fruity", acidity: 5, sweetness: 9, description: "Crisp and sweet! Reminiscent of a box of chocolates with a smooth mouthfeel." },
{ name: "Cherry Dark Chocolate Cold Brew", category: "Fruity", acidity: 3, sweetness: 4, description: "Dark and moody - subtly sweet. Perfect to drink in a cafe while studying." },
{ name: "Pumpkin Spice Latte", category: "Fruity", acidity: 2, sweetness: 7, description: "A fall classic! Warm, spiced, and so sweet! It's always the time of year for pumpkin."},
{ name: "Americano Lemonade", category: "Fruity", acidity: 9, sweetness: 2, description: "Not to everyones taste, that's for sure. Bold and acidic, and will definitely wake you up."},

{ name: "Light Roast Vanilla Latte", category: "Cozy", acidity: 5, sweetness: 7, description: "Year round classic! Some might call you basic, but you just know what you like."},
{ name: "Brown Sugar Cinnamon Cortado", category: "Cozy", acidity: 8, sweetness: 4, description: "The cinnamon cuts through the bitterness, so you can drink the delicious caffeine."},
{ name: "Dark Roast Brewed Coffee with Cream", category: "Cozy", acidity: 1, sweetness: 2, description: "An old soul, for sure. But what's better? Relaxing, timeless, perfect."},
{ name: "Flat White", category: "Cozy", acidity: 2, sweetness: 4, description: "This drink has less foam than a latte, and uses the sweet, intense ristretto shots."},

{ name: "Light Roast Lavender Latte", category: "Herbal", acidity: 9, sweetness: 5, description: "My personal favorite! Okay bestie. I guess you've got good taste? High five!"},
{ name: "Osmanthus Latte", category: "Herbal", acidity: 5, sweetness: 5, description: "A mix of a flowerly common tea concentrate with bitter espresso, a complicated, lovely latte."},
{ name: "Jasmine Breve Latte", category: "Herbal", acidity: 2, sweetness: 9, description: "Delicate jasmine flavor dances with cream to make the most decadent, floral, crisp drink."},
{ name: "Cold Brew with Matcha Cold Foam", category: "Herbal", acidity: 1, sweetness: 3, description: "Bitter and intense, but very good if you're into it! A dirty matcha, of sorts."},

{ name: "Hot N' Cold Espresso", category: "Intense", acidity: 9, sweetness: 7, description: "The easiest way to take a shot of espresso: shots, flavor, and cream layered. Are you okay?"},
{ name: "Dark Roast Pour Over", category: "Intense", acidity: 2, sweetness: 2, description: "If made by a well trained barista, there is no taste closer to heaven than a dark roast pour over."},
{ name: "Nitrogen Infused Cold Brew", category: "Intense", acidity: 1, sweetness: 3, description: "Very intense and coated in caffeine, but will little ice. It's sweet without syrup and looks pretty."},
{ name: "Macchiato", category: "Intense", acidity: 8, sweetness: 4, description: "Espresso with a dot of foam, deliciously plain, but can make you seem pretentious."}
];
/* dont mind me justtt grabbing my elements */
const categoryCheckboxes = document.querySelectorAll(".categoryCheckbox");
const aciditySlider = document.getElementById("aciditySlider");
const sweetnessSlider = document.getElementById("sweetnessSlider");
const acidityValue = document.getElementById("acidityValue");
const sweetnessValue = document.getElementById("sweetnessValue");
const submitButton = document.getElementById("submitButton");
const drinkName = document.getElementById("drinkName");
const drinkDescription = document.getElementById("drinkDescription");

/* slider stuffsies */

aciditySlider.addEventListener("input", () => {
	acidityValue.textContent = aciditySlider.value;
});

sweetnessSlider.addEventListener("input", () => {
	sweetnessValue.textContent = sweetnessSlider.value;
});

/* function to find the bestest match */
function findBestMatch() {
	const selectedCategories = Array.from(categoryCheckboxes)
	.filter(cb => cb.checked)
	.map(cb => cb.value);

const userAcidity = parseInt(aciditySlider.value);
const userSweetness = parseInt(sweetnessSlider.value);

let filteredDrinks = drinks.filter(drink => selectedCategories.includes(drink.category));
if (filteredDrinks.length === 0) filteredDrinks = drinks;

let bestDrink = null;
let closestScore = Infinity;
 
filteredDrinks.forEach(drink => {
	const score = Math.sqrt(
		Math.pow(drink.acidity - userAcidity, 2) +
		Math.pow(drink.sweetness - userSweetness, 2) 
	);
	if (score < closestScore) {
		closestScore = score;
		bestDrink = drink;
	}
	});
	
	return bestDrink;
}

/*then obv an event listener for the submit button, the golden ticket to make this all work!*/
submitButton.addEventListener("click", () => {
	const match = findBestMatch();
	drinkName.textContent = match.name;
	drinkDescription.textContent = match.description;
});
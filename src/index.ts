interface BeerData {
    id: number;
    name: string;
    tagline: string;
    description: string;
    image_url: string | null;
    abv: number;
    volume: {
        value: number;
        unit: string;
    };
    ingredients: {
        hops: Array<{
            name: string;
            amount: {
                value: number;
                unit: string;
            };
            add: string;
            attribute: string;
        }>;
        malt: Array<{
            name: string;
            amount: {
                value: number;
                unit: string;
            };
        }>;
        yeast: string;
    };
    food_pairing: string[];
    brewers_tips: string;
}

const beerURL = "https://api.punkapi.com/v2/beers/random";
let randomBeerData: Partial<BeerData> = {};

const img_wrap = document.querySelector(".img-wrap") as HTMLElement;
const BeerName = document.querySelector(".Beer-Name") as HTMLElement;
const SeeMoreWrap = document.querySelector(".see-more-wrap") as HTMLElement;
const BeerBtn = document.querySelector(".beer__btn") as HTMLElement;

async function getBeer() {
    try {
        let response = await fetch(beerURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        [randomBeerData] = await response.json(); // Use array destructuring to get the first element
        showRandomBeer();
    } catch (error) {
        console.error('Error fetching beer data:', error);
    }
}

function showRandomBeer() {
    // Clear previous content
    SeeMoreWrap.innerHTML = '';
    
    // Remove previous image if exists
    let existingImg = img_wrap.querySelector("img");
    if (existingImg) {
        existingImg.remove();
    }

    let BeerName = document.createElement("p");
    BeerName.innerHTML = `<h1>BeerName: ${randomBeerData.name.valueOf} ${randomBeerData.name.unit}</h1>`;
    
    

    let img = document.createElement("img");
    img.setAttribute("src", randomBeerData.image_url);
    img_wrap.appendChild(img);
    BeerName.innerHTML = randomBeerData.name;

    let tagline = document.createElement("p");
    tagline.innerText = randomBeerData.tagline;
    SeeMoreWrap.append(tagline);
    
    let description = document.createElement("p");
    description.innerText = randomBeerData.description;
    SeeMoreWrap.append(description);

    if (randomBeerData.ingredients.hops) {
        randomBeerData.ingredients.hops.forEach(hopsingredients => {
            let hopsingredientInfo = document.createElement("p");
            hopsingredientInfo.innerText = `${hopsingredients.name}: ${hopsingredients.amount.value} ${hopsingredients.amount.unit}, Add: ${hopsingredients.add}, Attribute: ${hopsingredients.attribute}`;
            SeeMoreWrap.append(hopsingredientInfo);
        });
    }
    
    let abv = document.createElement("p");
    abv.innerText = `ABV: ${randomBeerData.abv}`;
    SeeMoreWrap.append(abv);
    
    let volume = document.createElement("p");
    volume.innerText = `Volume: ${randomBeerData.volume.value} ${randomBeerData.volume.unit}`;
    SeeMoreWrap.append(volume);

    let ingredients = document.createElement("p");
    ingredients.innerText = `Ingredients: ${randomBeerData.ingredients.malt.map(malt => malt.name).join(', ')}, Yeast: ${randomBeerData.ingredients.yeast}`;
    SeeMoreWrap.append(ingredients);
    
    let foodPairing = document.createElement("p");
    foodPairing.innerText = `Food Pairing: ${randomBeerData.food_pairing.join(', ')}`;
    SeeMoreWrap.append(foodPairing);

    let brewersTips = document.createElement("p");
    brewersTips.innerText = `Brewer's Tips: ${randomBeerData.brewers_tips}`;
    SeeMoreWrap.append(brewersTips);
}

BeerBtn.addEventListener('click', getBeer);

getBeer();
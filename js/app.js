const loadData = async() => {
   try{
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken`;
    const res = await fetch(URL);
    const data = await res.json();
    displayData(data);
   }catch(error){
    console.log(error);
   }
}
const displayData = (data) => {
   const multipleMeals = data.meals;
   //console.log(multipleMeals);

   multipleMeals.forEach(singleMeal => {
        //console.log(singleMeal);
        const {strMealThumb, strArea, strMeal, strInstructions} = singleMeal;
        const cardContainer = document.getElementById('card-parent-container');
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card','bg-base-100', 'shadow-xl', 'border', 'card-side');

        cardDiv.innerHTML = `
            <figure><img class="ml-5" src="${strMealThumb}" alt="Album"/></figure>
            <div class="card-body">
                <h2 class="card-title">${strMeal}</h2>
                <p>${strArea}</p>
                <p>${strInstructions.slice(0,200)}...</p>
                <div class="card-actions justify-start">
                    <label for="my-modal-3" onclick="loadMealDetails('${singleMeal.idMeal}')" class="btn py-2 px-5 text-white text-lg rounded bg-yellow-500 font-semibold">
                        View Details
                    </label>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv);
   });
}
const loadMealDetails = async (id) => {
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalData(data.meals[0]);
}

const displayModalData = (data) => {
    //console.log(data);
    const {strMealThumb, strMeal, strInstructions} = data;
    const modalContainer = document.getElementById('modal-container');
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-box', 'relative');
    modalDiv.innerHTML = `
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="text-lg font-bold">${strMeal}</h3>
        <figure><img class="w-full" src="${strMealThumb}" alt="Album"/></figure>
        <p class="py-4">Instructions: ${strInstructions}}</p>
    `
    modalContainer.appendChild(modalDiv);
}
loadData();
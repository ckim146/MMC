/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

// const FRESH_PRINCE_URL =
//   "https://cdn.jefit.com/assets/img/exercises/gifs/31.gif";
// const CURB_POSTER_URL =
//   "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
// const EAST_LOS_HIGH_POSTER_URL =
//   "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
// let titles = [
//   "Dumbbell Incline Bench Press",
//   "Curb Your Enthusiasm",
//   "East Los High",
// ];

// Map of tags to their text values. Makes it easier to change the text value for all instances of tags amongst exercises
const filterList = {};
const exercises = [
  {name: "Dumbbell Incline Bench Press", muscles: ["Triceps", "Chest", "Shoulders", "Forearms"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/31.gif", tags: ["compound", "yes", "primary"]},
  {name: "Dumbbell Lateral Raise", muscles: ["Shoulders"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/32.gif", tags: ["isolation", "yes", "accessory"]},
  {name: "Barbell Squat", muscles: ["Quads", "Glutes"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/12.gif", tags: ["compound", "yes", "primary"]},
  {name: "Cable Seated Row", muscles: ["Lats"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/21.gif", tags: ["isolation", "yes", "primary"]},
  {name: "Pull Up", muscles: ["Lats", "Shoulders", "Biceps"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/83.gif", tags: ["compound", "yes", "USMC"]},
  {name: "Push Up", muscles: ["Chest", "Shoulders", "Triceps"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/47.gif", tags: ["compound", "no", "U.S. Army"]},
  {name: "Sit Up", muscles: ["Abs"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/345.gif", tags: ["isolation", "no", "U.S. Army", "U.S. Navy", "USCG"]},
  {name: "Barbell Deadlift", muscles: ["Glutes", "Hams", "Lats"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/93.gif", tags: ["compound", "yes", "primary"]},
  {name: "Barbell Bench Press", muscles: ["Chest", "Shoulders", "Triceps"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/2.gif", tags: ["compound", "yes", "primary"]},
  {name: "Machine Calf Raise", muscles: ["Calves"], image: "https://cdn.jefit.com/assets/img/exercises/gifs/145.gif", tags: ["isolation", "yes", "accessory"]},
]
const bodyImages = {calves: "https://i.imgur.com/ehVv3sp.png", glutes: "https://i.imgur.com/z3Sbqrm.png", hams: "https://i.imgur.com/oyu1SzQ.png",
  lats: "https://i.imgur.com/fO9LWqy.png", triceps: "https://i.imgur.com/pvOZ5hH.png", abs: "https://i.imgur.com/X9LUAiW.png",
  biceps: "https://i.imgur.com/yaSl5aZ.png", chest: "https://i.imgur.com/DjigU9J.png", quads: "https://i.imgur.com/RCWfTGP.png",
  shoulders: "https://i.imgur.com/NMRrN3K.png", front: "https://i.imgur.com/q2a0IAF.png", back: "https://i.imgur.com/Dqu8ZWB.png"
 }
let keywordClicked = false;
const searchInput = document.getElementById("search-input");
let currMuscle = null;

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function showCards(muscle=null) {
  const cardContainer = document.getElementById("card-container");
  const searchQuery = document.getElementById("search-input").value;
  filters = document.getElementById("filter-sort-panel"); 
  const filterListDisplay = document.getElementById("filter-list");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");
  // turn the map of filters into a single array of filter options
  let filterListConcat = [];
  let searchQueryFiltered = []
  let keywordList = [];
  console.log("show car runs");

  Object.keys(filterList).forEach(key => {
    if (filterList[key]) {filterListConcat.push(filterList[key].toLowerCase())}
  });
  filterListDisplay.innerHTML = filterListConcat.toString();

  for (let i = 0; i < exercises.length; i++) {
    let exercise = exercises[i];
    //Converts the text input of search box into a list of lowercase words, delimited by space. Does the same for exercise.name and .muscles while combining them into 1 array
    searchQueryFiltered = searchQuery.toLowerCase().split(" ");
    keywordList = exercise.name.toLowerCase().split(" ").concat(exercise.muscles.map(x => x.toLowerCase()));
    // const includesFilter = filterListConcat.length > 0 ? filterListConcat.some(x => exercise.tags.includes(x)) : true;
    const includesFilter = filterListConcat.length > 0 ? filterListConcat.every(x => exercise.tags.includes(x)) : true;
    const includesKeyword = searchQueryFiltered.some(x => keywordList.includes(x));
    const queryNotEmpty = muscle ? true : searchQueryFiltered != "";
    const includesMuscle = muscle ? keywordList.includes(muscle) : false;
    console.log(includesFilter, includesKeyword, queryNotEmpty, includesMuscle);
    
    
    //If the exercise name or exercises contain one of the words typed in the search bar and if its tags match one of the filters
    if ((includesKeyword && queryNotEmpty && includesFilter) || (includesMuscle && includesFilter)){
      console.log(includesFilter);
      filters.style.display = "flex";
      const nextCard = templateCard.cloneNode(true); // Copy the template card
      editCardContent(nextCard, exercise); // Edit title, image, and muscle list
      cardContainer.appendChild(nextCard); // Add new card to the container
      nextCard.scrollIntoView();
    }
  }
}

function hideCards (switching) {
  filters = document.getElementById("filter-sort-panel"); 
  cardContainer = document.getElementById("card-container");
  searchBar = document.getElementById("search-container");
  cardContainer.innerHTML = "";
  if (!switching) {
    filters.style.display = "none ";
  }
  searchBar.style.visibility = "hidden";
  searchBar.classList.remove("search-fadein");
  searchBar.classList.add("search-fadeout");
  cardContainer.innerHTML = "";
  keywordClicked = false;
}

function clearFilterSort() {
  const musclePanel = document.getElementById("muscle-panel");
  for (let x = 0; x <  filterComp.length; x++) {
    filterList[filterComp[x].textContent] = null;
  }
  if (musclePanel.style.visibility == "visible"){showCards(currMuscle);}
  else {showCards();}
}

function searchVisible() {
  hideMuscles();
  // hideCards(true);
  searchBar = document.getElementById("search-container");
  
  if (keywordClicked == false){
    searchBar.classList.remove("search-fadeout");
    searchBar.style.visibility = "visible";
    searchBar.classList.add("search-fadein");
    keywordClicked = true;
  }
  else {
    searchBar.classList.remove("search-fadein");
    searchBar.classList.add("search-fadeout");
    searchBar.style.visibility = "hidden";
    hideCards(false);
    keywordClicked = false;
  }
  searchBar.style.animationPlayState = "running";
}

function editCardContent(card, exercise) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = exercise.name;

  const cardImage = card.querySelector("img");
  cardImage.src = exercise.image;
  cardImage.alt = exercise.name + " Poster";

  const cardBullets = card.querySelector("ul");
  
  
  for (let i = 0; i < Math.min(exercise.muscles.length, 3); i++) {
    const newLi = document.createElement('li');
    newLi.textContent = exercise.muscles[i];
    card.querySelector("ul").appendChild(newLi);
  }
  if (exercise.muscles.length > 3){
    
    cardBullets.querySelectorAll('li')[0].textContent = exercise.muscles[0];
    cardBullets.querySelectorAll('li')[1].textContent = exercise.muscles[1];
    cardBullets.querySelectorAll('li')[2].textContent = "more";
  }


  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  // console.log("new card:", exercise.name, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
// document.addEventListener("DOMContentLoaded", showCards);
document.addEventListener("DOMContentLoaded", function(){
  const searchQuery = document.getElementById("search-input");

  //Iterates over all filter categories and adds them to the filterList map. 
  filterComp = document.getElementById("filter-sort-panel").getElementsByClassName("dropdown-button");
  for (let x = 0; x <  filterComp.length; x++) {
    filterList[filterComp[x].textContent] = null;
    
  }
  //Iterates over all items in all filter categories and adds them to the tags map
  tagsComp = document.getElementById("filter-sort-panel").getElementsByTagName("details");
  for (let x = 0; x < tagsComp.length; x++) {
    liComp = tagsComp[x].getElementsByTagName("li");
    for (let y = 0; y < liComp.length; y++) {
      
      liComp[y].addEventListener('click', function(e) {
        e.preventDefault();
        const musclePanel = document.getElementById("muscle-panel");
        let filterCat = e.target.parentElement.parentElement.parentElement.getElementsByClassName("dropdown-button")[0];
        //if the filter category's current option does not equal the filter selection, change to the selection
        if (filterList[filterCat.textContent] != e.target.textContent){
          filterList[filterCat.textContent] = e.target.textContent
          //if the muscle panel is visible, do not reset muscle
          if (musclePanel.style.visibility == "visible"){showCards(currMuscle);}
          else {showCards();}
        }
      });
    }
    
    
  }

  if (searchQuery) {
    searchQuery.addEventListener("input", showCards);
  } 
  else {
    console.error("search-input not found");
  }
});

function addFilter(event, filter) {
  event.preventDefault();
}

// function quoteAlert() {
//   console.log("Button Clicked!");
//   alert(
//     "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
//   );
// }

// function removeLastCard() {
//   titles.pop(); // Remove last item in titles array
//   showCards(); // Call showCards again to refresh
// }

function showMuscles () {
  const musclePanel = document.getElementById("muscle-panel");
  const frontDiagram = document.getElementById("front-body");
  const backDiagram = document.getElementById("back-body");
  const muscleSelectors = musclePanel.getElementsByClassName("muscle-selector");
  const muscleName = document.getElementById("muscle-name-display");
  frontDiagram.src = bodyImages.front;
  backDiagram.src = bodyImages.back;
  musclePanel.style.display = "flex";
  musclePanel.style.visibility = "visible";
  musclePanel.style.opacity = "1";
  const searchQuery = document.getElementById("search-input");
  searchQuery.value = "";
  console.log(searchQuery.value);

  for (let i = 0; i < muscleSelectors.length; i++){
    if (muscleSelectors[i].parentElement.id == "front-body-panel"){
      muscleSelectors[i].addEventListener('mousemove', function (e) {
        //erase numbers from the hover area ID, set image to it
        let imgURL = e.target.id.replace(/[0-9]/g, '');
        muscleName.innerHTML = imgURL;
        frontDiagram.src = bodyImages[imgURL];
      })
    }
    
    if (muscleSelectors[i].parentElement.id == "back-body-panel"){
      muscleSelectors[i].addEventListener('mousemove', function (e) {
        //erase numbers from the hover area ID, set image to it
        let imgURL = e.target.id.replace(/[0-9]/g, '');
        muscleName.innerHTML = imgURL;
        backDiagram.src = bodyImages[imgURL];
      })
    }

    muscleSelectors[i].addEventListener('click', function (e) {
      currMuscle = e.target.id.replace(/[0-9]/g, '');
      showCards(e.target.id.replace(/[0-9]/g, ''));
    })

    muscleSelectors[i].addEventListener('mouseout', function (e) {
      //erase numbers from the hover area ID, set image to it
      muscleName.innerHTML = "";
      frontDiagram.src = bodyImages.front;
      backDiagram.src = bodyImages.back;
    })
  }
  
  hideCards(true);
}

function hideMuscles () {
  const musclePanel = document.getElementById("muscle-panel");
  currMuscle = null;
  musclePanel.style.visibility = "hidden";
  musclePanel.style.display = "none";
  musclePanel.style.opacity = 0;
}



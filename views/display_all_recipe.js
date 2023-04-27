const PAGE_LIMIT = 4 * 5; // 4 rows of 4 recipes per page
let currentPage = 1;
const recipes = JSON.parse(document.getElementById('recipe-data').innerHTML);

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

function displayRecipes(recipes, start, limit) {
  const recipeGrid = document.querySelector('.recipe-grid');
  recipeGrid.innerHTML = '';

  for (let i = start; i < start + limit && i < recipes.length; i++) {
    const recipeBox = document.createElement('div');
    recipeBox.classList.add('recipe-box');

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe_list_item');
    recipeLink.href = `/allRecipes/${recipes[i].recipe_id}`;
    recipeLink.textContent = recipes[i].recipe_name;
    
    const recipeDescription = document.createElement('p');
    recipeDescription.classList.add('recipe-description');
    const maxLength = 90; // Set your desired maximum length for descriptions here
    recipeDescription.textContent = truncateText(recipes[i].recipe_description, maxLength);


    // Create image element
    const recipeImage = document.createElement('img');
    recipeImage.src = recipes[i].recipe_picture;
    recipeImage.alt = `Image for ${recipes[i].recipe_name}`;
    recipeImage.classList.add('recipe-image'); // Add class for styling

    recipeBox.appendChild(recipeLink);
    recipeBox.appendChild(recipeImage); // Append image to recipe box
    recipeBox.appendChild(recipeDescription);
    recipeGrid.appendChild(recipeBox);
  }
}


function createPageButton(pageNumber) {
  const button = document.createElement("button");
  button.classList.add("page-btn");
  button.textContent = pageNumber;

  if (pageNumber === currentPage) {
    button.classList.add("active");
  }

  button.addEventListener("click", () => {
    const previousActiveButton = document.querySelector(".page-btn.active");
    previousActiveButton.classList.remove("active");
    button.classList.add("active");

    currentPage = pageNumber;
    displayRecipes(recipes, (currentPage - 1) * PAGE_LIMIT, PAGE_LIMIT);
  });

  return button;
}

function setupPagination(recipes, limit) {
  const totalPages = Math.ceil(recipes.length / limit);
  const paginationContainer = document.querySelector(".pagination-container");

  paginationContainer.innerHTML = ""; // Clear existing page buttons

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createPageButton(i);
    paginationContainer.appendChild(pageButton);
  }
}


// Initialize
displayRecipes(recipes, 0, PAGE_LIMIT);
setupPagination(recipes, PAGE_LIMIT);

document.addEventListener('DOMContentLoaded', () => {
    const recipeBoxes = document.querySelectorAll('.recipe-box');
    recipeBoxes.forEach(recipeBox => {
      recipeBox.addEventListener('click', () => {
        const recipeLink = recipeBox.querySelector('a');
        window.location.href = recipeLink.href;
      });
    });
  });
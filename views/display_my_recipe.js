const PAGE_LIMIT = 4 * 5; // 4 rows of 4 recipes per page
let currentPage = 1;
const recipes = JSON.parse(document.getElementById('recipe-data').innerHTML);

// Fetch userId from user_info object (assuming it's globally available)
const userId = user_info.userID;

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

function displayRecipes(recipes, start, limit, userId) {
  const recipeGrid = document.querySelector('.recipe-grid');
  recipeGrid.innerHTML = '';
  
  // Filter recipes based on userId
  const userRecipes = recipes.filter(recipe => recipe.userID === userId);
  
  for (let i = start; i < start + limit && i < userRecipes.length; i++) {
    const recipeBox = document.createElement('div');
    recipeBox.classList.add('recipe-box');

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe_list_item');
    recipeLink.href = `/allRecipes/${userRecipes[i].recipe_id}`;
    recipeLink.textContent = userRecipes[i].recipe_name;
    
    const recipeDescription = document.createElement('p');
    recipeDescription.classList.add('recipe-description');
    const maxLength = 90; // Set your desired maximum length for descriptions here
    recipeDescription.textContent = truncateText(userRecipes[i].recipe_description, maxLength);

    // Create image element
    const recipeImage = document.createElement('img');
    recipeImage.src = userRecipes[i].recipe_picture;
    recipeImage.alt = `Image for ${userRecipes[i].recipe_name}`;
    recipeImage.classList.add('recipe-image'); // Add class for styling

    recipeBox.appendChild(recipeLink);
    recipeBox.appendChild(recipeImage); // Append image to recipe box
    recipeBox.appendChild(recipeDescription);
    recipeGrid.appendChild(recipeBox);

    // Add event listener for recipe box click event
    recipeBox.addEventListener('click', () => {
      window.location.href = recipeLink.href;
    });
  }
}

function setupPagination(recipes, limit, userId) {
  const userRecipes = recipes.filter(recipe => recipe.userID === userId);
  const totalPages = Math.ceil(userRecipes.length / limit);
  const paginationContainer = document.querySelector(".pagination-container");

  paginationContainer.innerHTML = ""; // Clear existing page buttons

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createPageButton(i);
    paginationContainer.appendChild(pageButton);
  }
}

// Initialize
displayRecipes(recipes, 0, PAGE_LIMIT, userId);
setupPagination(recipes, PAGE_LIMIT, userId);

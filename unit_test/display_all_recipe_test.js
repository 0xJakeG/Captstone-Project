const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;

// Import the functions you want to test
const { displayRecipes } = require('/views/display_all_recipe');

describe('displayRecipes', () => {
    afterEach(() => {
        if(expect.hasAssertions()) {
          console.log('Test passed');
        }
      });
    it('should display the correct number of recipes', () => {
    // Setup
    const recipes = [
      { recipe_id: 1, recipe_name: 'Recipe 1', recipe_description: 'Description 1', recipe_picture: 'picture1.jpg' },
      { recipe_id: 2, recipe_name: 'Recipe 2', recipe_description: 'Description 2', recipe_picture: 'picture2.jpg' },
      { recipe_id: 3, recipe_name: 'Recipe 3', recipe_description: 'Description 3', recipe_picture: 'picture3.jpg' },
      { recipe_id: 4, recipe_name: 'Recipe 4', recipe_description: 'Description 4', recipe_picture: 'picture4.jpg' },
    ];

    // Create a mock recipe grid element and add it to the DOM
    const recipeGrid = document.createElement('div');
    recipeGrid.classList.add('recipe-grid');
    document.body.appendChild(recipeGrid);

    // Execute
    displayRecipes(recipes, 0, 2);

    // Assert
    const recipeBoxes = document.querySelectorAll('.recipe-box');
    expect(recipeBoxes.length).toBe(2);
  });
});
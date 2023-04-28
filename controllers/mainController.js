const { config } = require('../app');

exports.index = (req, res, next)=> {
  let userLoggedIn = false;
  let userId = null;
  if (req.session && req.session.authenticated) {
      userLoggedIn = true;
      userId = req.session.user_id;
  }
  res.render('../views/index', { userLoggedIn, userId });
}
exports.register = (req, res, next)=> {
    res.render('../views/register');
}

exports.signin = (req, res, next)=> {
    res.render('../views/signin');
}

exports.about = (req, res, next)=> {
    res.render('../views/about');
}

exports.add_recipe = (req, res, next)=> {
    res.render('../views/add_recipe');
}

exports.recipeMeta = (req, res, next)=> {
  let userId = req.session.userId;  // Or however you get the user ID
  res.render('../views/recipeMeta', { userId: userId });
}

exports.map = (req, res, next)=> {
    res.render('../views/map');
}

exports.allRecipes = (req, res, next)=> {
    res.render('../views/allRecipes');
}

exports.recipeDetails = async (req, res, next) => {
  console.log(req.params);
  let id = req.params.id;
  try {
    const result = await getRecipeById(id, req);
    if (result.recipe) {
      res.render('recipeDetails', { recipe: result.recipe, ingredients: result.ingredients, instructions: result.instructions });
    } else {
      let err = new Error('Cannot find a recipe with id ' + id);
      err.status = 404;
      next(err);
    }
  } catch (error) {
    console.error('Error retrieving recipe details:', error);
    res.status(500).send('Error retrieving recipe details');
  }
};


  // Modify the getRecipeById function
  function getRecipeById(id, req) {
    return new Promise((resolve, reject) => {
      req.config.query('SELECT * FROM recipes WHERE recipe_id = ?', [id], (err, recipeResult) => {
        if (err) {
          reject(err);
        } else {
          req.config.query('SELECT * FROM recipe_ingredients WHERE recipe_id = ?', [id], (err, ingredientsResult) => {
            if (err) {
              reject(err);
            } else {
              req.config.query('SELECT * FROM instructions WHERE recipe_id = ? ORDER BY order_number', [id], (err, instructionsResult) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({ recipe: recipeResult[0], ingredients: ingredientsResult, instructions: instructionsResult });
                }
              });
            }
          });
        }
      });
    });
  }


exports.showRecipe = (req, res, next)=> {
    let id = req.params.id;
    recipes => {
        if(recipes) {
        return res.render('../views/allRecipes', {recipes});
        } else {
            let err = new Error('Cannot find a recipe with id ' + id);
            err.status = 404;
            next(err);
        }
    };
}

exports.head = (req, res, next)=> {
    res.render('../views/partials/head');
}

exports.header = (req, res, next)=> {
    res.render('../views/partials/header');
}

exports.footer = (req, res, next)=> {
    res.render('../views/partials/footer');
}

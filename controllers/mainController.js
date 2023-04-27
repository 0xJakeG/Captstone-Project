const { config } = require('../app');
//not logged in
exports.index = (req, res, next)=> {
    res.render('../views/logged_out/index');
}

exports.register = (req, res, next)=> {
    res.render('../views/logged_out/register');
}

exports.signin = (req, res, next)=> {
    res.render('../views/logged_out/signin');
}

exports.about = (req, res, next)=> {
    res.render('../views/logged_out/about');
}
exports.allRecipes = (req, res, next)=> {
  res.render('../views/logged_out/allRecipes');
}

//logged in
exports.add_recipe = (req, res, next)=> {
    res.render('../views/logged_in/add_recipe');
}

exports.recipeMeta = (req, res, next)=> {
    res.render('../views/logged_in/recipeMeta');
}

exports.map = (req, res, next)=> {
    res.render('../views/logged_in/map');
}

exports.home = (req, res, next)=> {
  res.render('../views/logged_in/index');
}

exports.aboutS = (req, res, next)=> {
  res.render('../views/logged_in/about');
}

exports.allRecipesS = (req, res, next)=> {
  res.render('../views/logged_in/allRecipes');
}
exports.profile = (req, res, next) => {
  res.render('../views/logged_in/profile');
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
    res.render('../views/logged_out/partials/head');
}

exports.header = (req, res, next)=> {
    res.render('../views/logged_out/partials/header');
}

exports.footer = (req, res, next)=> {
    res.render('../views/logged_out/partials/footer');
}

exports.headS = (req, res, next)=> {
  res.render('../views/logged_in/partials/head');
}

exports.headerS = (req, res, next)=> {
  res.render('../views/logged_in/partials/header');
}

exports.footerS = (req, res, next)=> {
  res.render('../views/logged_in/partials/footer');
}


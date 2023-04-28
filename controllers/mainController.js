const { config } = require('../app');

exports.index = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
  res.render('../views/index', { user_info });
}
exports.register = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/register', { user_info });
}

exports.signin = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/signin', { user_info });
}

exports.about = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/about', { user_info });
}

exports.add_recipe = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/add_recipe', { user_info });
}

exports.recipeMeta = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }  // Or however you get the user ID
  res.render('../views/recipeMeta', { user_info});
}

exports.map = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/map', { user_info });
}

exports.allRecipes = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/allRecipes', { user_info });
}

exports.recipeDetails = async (req, res, next) => {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
  console.log(req.params);
  let id = req.params.id;
  try {
    const result = await getRecipeById(id, req);
    if (result.recipe) {
      res.render('recipeDetails', { user_info, recipe: result.recipe, ingredients: result.ingredients, instructions: result.instructions });
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
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    let id = req.params.id;
    recipes => {
        if(recipes) {
        return res.render('../views/allRecipes', {user_info, recipes});
        } else {
            let err = new Error('Cannot find a recipe with id ' + id);
            err.status = 404;
            next(err);
        }
    };
}

exports.head = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/partials/head', { user_info });
}

exports.header = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/partials/header', { user_info });
}

exports.footer = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/partials/footer', { user_info });
}
exports.profile = (req, res, next)=> {
  let user_info = {};
  if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
      user_info = req.session.user_info;
  }
    res.render('../views/profile', { user_info });
}
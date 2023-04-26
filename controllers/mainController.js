const { config } = require('../app');

exports.index = (req, res, next)=> {
    res.render('../views/index');
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
    res.render('../views/recipeMeta');
}

exports.map = (req, res, next)=> {
    res.render('../views/map');
}

exports.allRecipes = (req, res, next)=> {
    res.render('../views/allRecipes');
}

exports.recipeDetails = async (req, res, next) => {
    console.log(req.params);
    let id = req.params.recipe_id;
    try {
      const recipe = await getRecipeById(id, req);
      if (recipe) {
        res.render('recipeDetails', { recipe });
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
      req.config.query('SELECT * FROM recipes WHERE recipe_id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
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
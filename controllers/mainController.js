const model = require('../sequelize/models/recipes');

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

exports.recipes = (req, res, next)=> {
    res.render('../views/recipes');
}

exports.recipeMeta = (req, res, next)=> {
    res.render('../views/recipeMeta');
}

exports.allRecipes = (req, res, next)=> {
    res.render('../views/allRecipes');
}

exports.showRecipe = (req, res, next)=> {
    let id = req.params.id;
    model.findById(id)
    .then(recipes=>{
        if(recipes) {
            return res.render('../views/allRecipesS', {recipes});
        } else {
            let err = new Error('Cannot find a recipe with id '+ id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
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
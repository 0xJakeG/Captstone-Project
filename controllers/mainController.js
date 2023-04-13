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

exports.allRecipes = (req, res, next)=> {
    res.render('../views/allRecipes');
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
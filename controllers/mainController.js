
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
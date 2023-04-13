
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

exports.map = (req, res, next)=> {
    res.render('../views/map');
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
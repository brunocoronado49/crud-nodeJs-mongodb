const indexExport = {};

indexExport.renderIndex = (req, res, next) => {
    res.render('index');
}

indexExport.renderAbout = (req, res, next) => {
    res.render('about');
}

module.exports = indexExport;
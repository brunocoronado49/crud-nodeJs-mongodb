const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');

const {createAdminUser} = require('./libs/createUser');
const config = require('./config');

const indexRoutes = require('./routes/index');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');
require('./config/passport');

// Initializations
const app = express();
createAdminUser();

// Settings
app.set('port', config.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine(
    '.hbs',
    exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir:  path.join(app.get('views'), 'partials'),
        extname: '.hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.render("404");
});

module.exports = app;
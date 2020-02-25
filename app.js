var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground.js'),
    Comment = require('./models/comment.js'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    seedDB = require('./seeds'),
    methodOverride = require('method-override');
 var flash = require('connect-flash')  ;

//seedDB();


mongoose.connect('mongodb+srv://admin:cuong1234@cluster0-gz9cn.mongodb.net/test?retryWrites=true&w=majority');

// passport session
app.use(require('express-session')({
  secret:'Cuong rat la dep trai!',
  resave: false,
  saveUnitialized:false
}));


  app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

var campgroundRoutes = require('./routes/campgrounds.js'),
    commentRoutes = require('./routes/comments.js'),
    indexRoutes = require('./routes/index.js');

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log('Server started at PORT '+2000);
  console.log('port');
});

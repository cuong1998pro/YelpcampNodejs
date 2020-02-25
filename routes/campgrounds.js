var express = require('express');
var router = express.Router();
var Campground = require('../models/campground.js');

router.get('/campground', function(req, res){
  Campground.find({}, function(err, campground){
    if(err){
      console.log(err);
    }else{
      req.flash('info', 'cuongdz');
      res.render('campground/index',{campground: campground, currentUser: req.user});
    }
  })
});

router.get('/campground/new', function(req, res){
  res.render('campground/new');
});

router.get('/landing', function(req, res){
  res.render('landing');
});

router.post('/campground', function(req, res){
  campgroundName = req.body.name;
  campgroundUrl = req.body.url;
  var newcampground = {name: campgroundName, img: campgroundUrl};
  Campground.create(newcampground, function(err, campground){
    if(err){
      console.log(err)
    }else{
      res.redirect('/campground/index');
    }
  });
});

router.get('/campground/:id', function(req, res){
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
        res.render('campground/show',{campground: foundCampground});
    }
  });
});

router.get('/campground/:id/edit', function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      res.redirect('/campground');
    }else{
        res.render('campground/edit', {campground:foundCampground});
    }
  })
});

router.put('/campground/:id', function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect('/campground');
    }else{
      res.redirect('/campground/'+req.params.id);
    }
  } )
});

router.delete('/campground/:id',function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect('/campground');
    }else{
      res.redirect('/campground');
    }
  })
});

module.exports = router;



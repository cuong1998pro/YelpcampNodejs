var express = require('express');
var router = express.Router();
var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');

router.get('/campground/:id/comments/new', isLoggedIn,function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }
    else{
        res.render('comments/new', {campground: campground});
    }
  })
});

router.post('/campground/:id/comments', function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect('/campground');
    }else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }else{
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campground/'+campground._id);
        }
      });
    }
  });
});

router.get('/campground/:id/comments/:comment_id/edit', checkCommentOwnership,function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      console.log(err);
    }else{
        res.render('comments/edit', {campground_id:req.params.id, comment:foundComment});

    }
  })
});

router.put('/campground/:id/comments/:comment_id', function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect('back');
    }
    else{
      res.redirect('/campground/'+req.params.id);
    }
  })
});

router.delete('/campground/:id/comments/:comment_id',checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect('back');
    }else{
      res.redirect('/campground/'+req.params.id);
    }
  })
});

function checkCommentOwnership(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect('back');
      }else{
        console.log(foundComment);
        if(foundComment.author.id.equals(req.user._id)){
          next();
        }else{
          res.redirect('back');
        }
      }
    })
  }else{
    res.redirect('back');
  }
}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'Please Login First');
  res.redirect('/login');
}

module.exports = router;

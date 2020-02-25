var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
{
  name: 'Cloud Rest',
  img: 'https://media-cdn.tripadvisor.com/media/photo-s/10/ab/68/b9/several-sites-do-have.jpg',
  description: '   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}, {
  name: 'Clgt',
  img: 'https://cdn9.ivivu.com/16000000/15460000/15451900/15451801/8fab2cd8_z-800x450.jpg',
  description: 'This is the second one'
}, {
  name: 'ABC XYZ',
  img: 'https://q-cf.bstatic.com/images/hotel/max1024x768/241/24117615.jpg',
  description: 'This is the third one'
}
];

function seedDB(){
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('remove all');
    }
  });
  // data.forEach(function(seed){
  //   Campground.create(seed, function(err, campground){
  //     if(err){
  //       console.log(err);
  //     }
  //     else{
  //       console.log('added a campground');
  //       Comment.create({
  //         text:'This is the great',
  //         author: 'homer'
  //       },
  //       function(err, comment){
  //         if(err)
  //           console.log(err);
  //         else
  //         {
  //           campground.comments.push(comment);
  //           campground.save();
  //           console.log('added a comment');
  //         }
  //       });
  //     }
  //   });


  // }
  // );
}
module.exports = seedDB;


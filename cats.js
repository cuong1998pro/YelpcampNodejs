var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cat_app',{ useNewUrlParser: true , useUnifiedTopology: true});

var catSchema = new mongoose.Schema({
  name:String,
  age:Number,
  temperament:String
});

var Cat = mongoose.model('Cat', catSchema);

// var george = new Cat({
//   name: 'okemen',
//   age: 11,
//   temperament: 'fajskfls'
// });

// george.save(function(err, item){
//   if(err){
//     console.log('some thing went wrong');
//   }
//   else  {
//     console.log('save '+ item +' to database');
//   }
// });

Cat.create({
  name: 'cuongdz',
  age: 12,
  temperament: 'bland'
}, function(err, cat){
  if(err){
    console.log(err);
  }else{
    console.log(cat);
  }
});

Cat.find({}, function(err, cats){
  if(err){
    console.log('It has error');
    console.log(err);
  }else{
    console.log('all the cats');
    console.log(cats)
  }
})


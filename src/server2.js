var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

var monk = require('monk');
var db = monk('localhost:27017/MedizinPlus');



//show all
router.get('/api/products/:category', function(req, res) {
    console.log("HI")
    var collection = db.get('prodcuts');
    collection.find({}, function(err, data) {
        if (err) throw err;
        else res.json(data);
    });
});

// //new video
// router.get('/videos/new', function(req, res) {
//     res.render('new');
// });

// //insert route
// router.post('/videos', function(req, res) {
//     var collection = db.get('videos');
//     collection.insert({
//         title: req.body.title,
//         genre: req.body.genre,
//         image: req.body.image,
//         description: req.body.desc
//     }, function(err, video) {
//         if (err) throw err;

//         res.redirect('/videos');
//     });
// });

// //show specific
// router.get('/videos/:id', function(req, res) {
//     var collection = db.get('videos');
//     collection.findOne({ _id: req.params.id }, function(err, video) {
//         if (err) throw err;
//         //res.json(video);
//         res.render('show', { video: video });
//     });
// });

// //edit
// router.get('/videos/:id/edit', function(req, res) {
//     var collection = db.get('videos');
//     //console.log(req.params.id);
//     collection.findOne({ _id: req.params.id }, function(err, video) {
//         if (err) throw err;
//         //res.json(video);
//         res.render('edit', { video: video });
//     });

// });

// //udpate
// router.put('/videos/:id', function(req, res) {
//     var collection = db.get('videos');
//     // console.log("hi")
//     // console.log(req.params.id)
//     // console.log(req.body)
//     collection.update({ _id: req.params.id }, {
//         $set: {
//             "title": req.body.title,
//             "genre": req.body.genre,
//             "image": req.body.image,
//             "description": req.body.desc,
//         }
//     }, function(err, video) {
//         if (err) throw err;
//         //res.json(video);
//         res.redirect('/');
//     });
// });

//delete route
// router.delete('/videos/:id', function(req, res) {
//     var collection = db.get('videos');
//     collection.remove({ _id: req.params.id }, function(err, video) {
//         if (err) throw err;
//         res.redirect('/');
//     });
// });

//search
// router.post('/videos/serach', function(req, res) {
//     var collection = db.get('videos');
//     //console.log("asdf");
//     if (req.body.title != "All" && req.body.genre != "All") {
//         //console.log(req.body.title)
//         //console.log(req.body.genre)
//         collection.find({ title: req.body.title, genre: req.body.genre }, function(err, videos) {
//             if (err) throw err;
//             //res.json(video);
//             //res.render('index', { videos: videos })
//             res.redirect('/')
//         });
//     } else if (req.body.title == "All" && req.body.genre != "All") {
//         //console.log(req.body.title)
//         //console.log(req.body.genre)
//         collection.find({ genre: req.body.genre }, function(err, videos) {
//             if (err) throw err;
//             //res.json(video);
//             res.render('index', { videos: videos })

//         });
//     } else if (req.body.title != "All" && req.body.genre == "All") {
//         //console.log(req.body.title)
//         //console.log(req.body.genre)
//         collection.find({ title: req.body.title }, function(err, videos) {
//             if (err) throw err;
//             //res.json(video);
//             res.render('index', { videos: videos })

//         });
//     } else {
//         collection.find({}, function(err, videos) {
//             if (err) throw err;
//             //res.json(video);
//             res.render('index', { videos: videos })

//         });
//     }
// })

module.exports = router;
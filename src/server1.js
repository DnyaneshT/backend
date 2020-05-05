import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
const mongoose = require('mongoose')


const app = express();
app.use(bodyParser.json());

const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db('MedizinPlus');
//________________________________________
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);


            //     //

            // //mongoose connection setup
            // mongoose.Promise = global.Promise;
            // mongoose.connect('mongodb://localhost/MedizinPlus', {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true
            // });

            // const router = express.Router()
            // const medicineSchema = new mongoose.Schema({
            //     //id
            //     pame: { type: String, required: true },
            //     category: { type: String, required: true },
            //     price: { type: Number, required: false },
            //     quantity: { type: Number, required: true },
            // }, { strict: false })


            // var medicineModel = mongoose.model('medicineModel', medicineSchema, 'MedizinPlus') //modelname schema collectionname

            // router.get('/api/products/:name', (req, res) => {
            //         var query = req.params.name
            //         medicineModel.find({ category: query }, (err, data) => {
            //             if (err)
            //                 res.json({ msg: "Connection error", code: -2 })
            //             else if (data.length == 0) {
            //                 res.json({ msg: "Not Found", code: -1, data: data })
            //             } else {
            //                 res.status(200).json(data)
            //                     //res.json({ msg: "Found!", code: 0, data: data })
            //             }
            //         })
            //     })
            //     //

            // app.get('/api/products/:category', (req, res) => {
            //     db.getDB().collection('products').find({}).toArray((err, documents) => {
            //         if (err)
            //             console.log(err);
            //         else
            //             res.json(documents);
            //     });

            // });

            app.get('/api/products/:category', (req, res) => {

                const categoryName = req.params.category;
                db.getDB().collection('products').find({ "category": categoryName }).toArray((err, documents) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(documents);
                    }
                })
                res.status(200).json(productInfo);

            })

            app.post('/api/articles/:name/upvote', async(req, res) => {
                withDB(async(db) => {
                    const articleName = req.params.name;

                    const articleInfo = await db.collection('articles').findOne({ name: articleName });
                    await db.collection('articles').updateOne({ name: articleName }, {
                        '$set': {
                            upvotes: articleInfo.upvotes + 1,
                        },
                    });
                    const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

                    res.status(200).json(updatedArticleInfo);
                }, res);
            });

            app.post('/api/articles/:name/add-comment', (req, res) => {
                const { username, text } = req.body;
                const articleName = req.params.name;

                withDB(async(db) => {
                    const articleInfo = await db.collection('articles').findOne({ name: articleName });
                    await db.collection('articles').updateOne({ name: articleName }, {
                        '$set': {
                            comments: articleInfo.comments.concat({ username, text }),
                        },
                    });
                    const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

                    res.status(200).json(updatedArticleInfo);
                }, res);
            });

            app.listen(8000, () => console.log('Listening on port 8000'));
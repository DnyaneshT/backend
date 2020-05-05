//code 0 -> Success
//code -1 -> Error
//code -2 -> Connection Error
const mongoose = require('mongoose')
    //var medicine = require('./routes/medicine')
    //var customer = require('./routes/customer')
var bodyParser = require('body-parser') //middleware to parse data under req.body

const express = require('express')
const app = express()

//mongoose connection setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MedizinPlus', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware
//app.use('/customer', customer)
//app.use('/medicine', medicine)

const medicineSchema = new mongoose.Schema({
    //id
    pame: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: false },
    quantity: { type: Number, required: true },
}, { strict: false })

var medicineModel = mongoose.model('medicineModel', medicineSchema, 'products') //modelname schema collectionname

const port = 8000

app.get('/api/products/:category', (req, res) => {
    console.log("hitting")
    var categoryName = req.params.category
    medicineModel.find({ "category": categoryName, "delete": 0 }, (err, data) => {
        if (err)
            console.log(err)
        else {
            console.log("res")
            res.json(data)
        }
    })
})

app.get('/', (req, res) => {
    res.send("SUCEESS")
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
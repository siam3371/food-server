const express = require('express')
const app = express()
var ObjectId = require('mongodb').ObjectID;

const port =process.env.PORT || 5000;
const cors = require('cors')
require('dotenv').config() 
// middleware

app.use(cors())
app.use(express.json())
 const MongoClient = require('mongodb').MongoClient; 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c6mfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
       const food = client.db("food_server");
      const product = food.collection("product");   
//  GET API
       app.get('/product', async(req, res)=> {
        const cursor = product.find({});
     const products = await cursor.toArray();
             res.send(products) 
       }) 
//  POST API
app.post( '/product',async(req, res) => {
  const newService = req.body;
  const result = await product.insertOne(newService)    
console.log('hitting the poast',req.body)
console.log('add a user', result)
res.json(result)
})
     } 
     finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// ---> middle wares
app.use(cors());
app.use(express.json());


// ---> app testing
app.get('/', (req, res) => {
    res.send("node mongo crud app server running...")
})

// ---> mongodb setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.76zc9vk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// ---> use bd
const run = async () => {
    try {
        // ---> database collections
        const userCollection = client.db("nodeMongoCRUD").collection("users");


        // ---> create user || insert user data
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result)
        })


    } finally { }

}
run().catch(err => console.log(err))





app.listen(port, () => {
    console.log(`running port is ${port}`)
})
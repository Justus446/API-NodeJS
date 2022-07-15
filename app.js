const { application } = require('express');
const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Admin:<Admin123>@cluster0.gpl77.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// Endpoint 
app.get('/', (req, res) =>{
    res.send("sawa")
})

app.get('/api/users', (req, res) => {
    client.connect(err => {
        const collection = client.db("Test").collection("data");


        collection.find().toArray((error, documents)=> {

            if(error)
            {
                throw error;
            }
            res.send(documents);
        });


        // perform actions on the collection object
        client.close();
      });

})




app.post('/api/users/api', (req, res)=>{
    const collection = client.db("Test").collection("data");
    collection.insertOne(req.body, (error,result)=>{

        if (error){
            throw error;
        }
        res.send(result.insertedId)

    });
    client.close();


});

app.listen(3000, () => {
    console.log("SEVER ON!!!")
})
const Joi = require("joi")

// connect to remote database
const { MongoClient, ServerApiVersion } = require('mongodb');

//database uri
const uri = "mongodb+srv://Admin:<Admin123z>@mycluster.gpl77.mongodb.net/?retryWrites=true&w=majority";
const client =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//starting a app in node Js
const express = require('express')
const app = express()


// Endpoint 
app.get('/', (req, res) =>{
    res.send("sawa")
})


app.get('/api/users', async (req, res) => {
    client.connect ( async err => {
        const collection = client.db("test").collection("data");

        await collection.find().toArray((error, documents)=> {
            
            if(error)
            {
                res.status(400)
            }

            res.send(collection)
            
        });


        // perform actions on the collection object
        client.close();
      });

});




app.post('/api/users', async (req, res)=>{
    const collection = client.db("Test").collection("data");
    const {error} = validateInput(req.body)
        if(error)
        {
            res.status(400).send(error.details[0].message)
        }
        collection.insertOne(req.body)
        res.send(result.insertedId)

        client.close();
    }
    );
    


function validateInput(input){
const schema =
 {
    name: Joi.string().min(3).required()
}

return Joi.validate(input,schema)
}


//set port number for app to listen to
app.listen(3000, () =>
{
    console.log("SEVER ON!!!")
}
);
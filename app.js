const express = require('express');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const model = require('./model');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB...');
       
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });

    app.post('/contact', async(req,res)=>{
        try{
            const {name, email, subject, message} = req.body;
             const details = new model({
                name,
                email,
                subject,
                message
             });
             details.save();
             res.send('Details stored successfully');

        }catch(error){
            res.send(error.message)
        }
    })
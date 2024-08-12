import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
const URL = 'https://ifsc.razorpay.com/';

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/get-details", async (req, res)=>{
    const ifscCode = req.body.ifsc;
    try{
        const response = await axios.get(`${URL}${ifscCode}`);
        console.log(response.data);
        res.render("index.ejs", {content: response.data});
    }
    catch (error) {
        res.status(500).send("Error fetching IFSC details");
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });  

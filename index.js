import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))


app.post("/getweather",(req,res)=>{
    const obj = JSON.parse(JSON.stringify(req.body));
    async function getWeather(){
        const URL1 = "http://api.openweathermap.org/geo/1.0/direct?q="+ obj.name + "&limit=2&appid=add86a037490652f6bd69e459f486657";
        const response1 = await axios.get(URL1);
        const URL2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + response1.data[0].lat +"&lon=" + response1.data[0].lon + "&appid="+"add86a037490652f6bd69e459f486657";
        const response2 = await axios.get(URL2);
        res.render("index.ejs",response2.data);
    }
    getWeather().catch(function(err){
        res.redirect("/");
    })
})

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.listen(3000,()=>{
    console.log("Server Started at port 3000");
})
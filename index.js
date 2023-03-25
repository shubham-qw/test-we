const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));



app.post("/signup", async function (req,res) {

    if (!req.body.email) {
        res.send("<h1>Email Required</h1>");
    }
    const response = await fetch("https://test-api-v3.myways.ai/user?email=" + req.body.email, {
        method : "Get"
    })

    const json = await response.json();


    if (json.message==="User Not Found") {
    const response = await fetch("https://test-api-v3.myways.ai/user", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req.body)
    })
    const json = await response.json();
    res.send(json);
}

else {
    res.send(json.message);
}
  
})



app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, function () {
    console.log("Server running on port 3000");
})
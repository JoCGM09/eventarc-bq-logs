const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(express.json());

app.post('/', async (req,res) => {
    var eventType = "ce-type header not found"
    try { 
        eventType = req.headers["ce-type"];
    }
    catch(e){
        console.error(e);
    }
    
    console.log("EVENT RECEIVED (%s)", eventType);

    console.log("HEADERS (EXCEPT AUTH):");
    delete req.headers.authorization;
    console.log(JSON.stringify(req.headers));

    console.log("BODY:");
    console.log(JSON.stringify(req.body));

    res.status(200).send({
        headers: req.headers,
        body: req.body
    });
});

const port = parseInt(process.env.PORT) || 8080;

app.listen(port, () => {
    console.log("eventarc-event-logger: listening on port", port);
});
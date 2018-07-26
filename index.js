let express = require('express');
const AutoDM = require("./src/AutoDM.js");
let app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => { 
    console.log("App started successfully 🙌🙌");
    res.send('oops23');
    AutoDM();
});

app.listen(PORT, () => { 
    console.log('listening');
});

// Install express server
const express = require('express');
const app = express();

// Server files
app.use(xpress.static(__dirname + '/dist'));

// Start app
app.listen(process.env.PORT || 8080);

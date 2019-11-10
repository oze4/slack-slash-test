'use strict'
require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');

app.set('port', process.env.PORT);
app.use(helmet());

app.post("/", (req, res, next) => {
    console.log(req.body);
    res.status(200).send("Hello from test!");
})

app.use((req, res, next) => res.status(500).send()); // Route not found

const server = app.listen(app.get('port'), () => {
    const _addr = server.address();
    const _prefix = _addr.port === 443 ? "https://" : "http://";
    const _host = _addr.address == "::" ? require('os').hostname : _addr.address;
    console.log(`App started on: '${_prefix}${_host}:${_addr.port}'`)
});
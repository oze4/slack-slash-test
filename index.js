'use strict'
require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const fetch = require('node-fetch');

app.set('port', process.env.PORT);
app.use(helmet());

app.post("/slash/test", (req, res, next) => {
    console.log(req.body);

    fetch(process.env.SLACK_VALIDATOR_URL, {
        method: "POST",
        headers: req.headers,
        body: req.body,
    }).then(res => {
        return res.json()
    }).then(json => {
        if(json.status === "true") {
            res.status(200).send("Success! :smile:");
        }
        res.status(200).send("Failure :cry: " + JSON.stringify(json));
    }).catch(err => {
        res.status(200).send("Caught Failure :cry: " + err);
    });

});

app.use((req, res, next) => res.status(404).send("Oops can't find that! " + req.url)); // Route not found

const server = app.listen(app.get('port'), () => {
    const _addr = server.address();
    const _prefix = _addr.port === 443 ? "https://" : "http://";
    const _host = _addr.address == "::" ? require('os').hostname : _addr.address;
    console.log(`App started on: '${_prefix}${_host}:${_addr.port}'`)
});
var express = require("express");
var app = express();

const config = require('./config/config.json');
const telegramBot = require('node-telegram-bot-api');
let botError = new telegramBot(config.telegram_token, {polling: true});

const Status = {
    NOT_FOUND: 404,
    NOT_FOUND_MSG: '404 - Resource Not found',
    OK: 200,
    OK_MSG: '200 - Success',
    SERVER_ERROR: 500,
    SERVER_ERROR_MSG: '500 - Battery Error'
};

app.get("/message", function(req, res){

    if (req.query.content) {
        botError.sendMessage(config.telegram_chat_id, req.query.content);
        res.status(Status.OK).json(Status.OK_MSG);
    } else {
        res.status(Status.NOT_FOUND).json(Status.NOT_FOUND_MSG);
    }

});
app.listen(8082, function() {
    botError.sendMessage(config.telegram_chat_id, "Telegram service start");
});
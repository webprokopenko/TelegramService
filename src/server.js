var http = require('http');
var url = require('url');
const config = require('./config.json');

const telegramBot = require('node-telegram-bot-api');
let botError = new telegramBot(config.telegram_token, {polling: true});

var server = new http.Server(function(req, res) {

    var urlParsed = url.parse(req.url, true);

    var date = new Date();
    console.log(urlParsed.query.content);
    console.log( date.getSeconds() );

    if (urlParsed.pathname == '/message' && urlParsed.query.content) {

        // botError.sendMessage(config.telegram_chat_id,
        //     urlParsed.query.content);
        res.setHeader('Cache-control', 'no-cache,no-store,must-revalidate');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end( urlParsed.query.content );

    } else {
        res.statusCode = 404; // Not Found
        res.end("Page not found");
    }
});

server.listen(8082);

// http.createServer(function(req, res) {
//     var urlParsed = url.parse(req.url);
//
//     switch (urlParsed.pathname) {
//         // case '/':
//         //     sendFile("index.html", res);
//         //     break;
//
//         // case '/subscribe':
//         //     chat.subscribe(req, res);
//         //     break;
//
//         case '/msg':
//             var body = '';
//
//             req
//                 .on('readable', function() {
//                     var line = req.read();
//                     if(line)
//                         body += line;
//
//                     if (body.length > 1e4) {
//                         res.statusCode = 413;
//                         res.end("Your message is too big for my little chat");
//                     }
//                 })
//                 .on('end', function() {
//                     try {
//                         body = JSON.parse(body);
//                     } catch (e) {
//                         res.statusCode = 400;
//                         res.end("Bad Request");
//                         return;
//                     }
//
//                     chat.publish(body.message);
//                     res.end("ok");
//                 });
//
//             break;
//
//         default:
//             res.statusCode = 404;
//             res.end("Not found");
//     }
//
//
// }).listen(3000);


// function sendFile(fileName, res) {
//     var fileStream = fs.createReadStream(fileName);
//     fileStream
//         .on('error', function() {
//             res.statusCode = 500;
//             res.end("Server error");
//         })
//         .pipe(res)
//         .on('close', function() {
//             fileStream.destroy();
//         });
// }
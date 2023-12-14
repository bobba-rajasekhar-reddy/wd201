const http = require("http");
const fs = require("fs");
const args = require('minimist')(process.argv.slice(2));
const path = require('path');

const mapping = {
    "/" : "home.html",
    "/project" : "project.html",
    "/registration" : "registration.html"
};

const serveFile = (url, res) => {
    if (mapping[url]) {
        let filepath = path.join(__dirname, mapping[url]);
        console.log(filepath);

        fs.readFile(filepath, 'utf-8', (err, page) => {
            if (err) {
                handleError(res, 500, 'Internal Server Error', `Error reading file: ${filepath}`, err);
            } else {
                sendResponse(res, 200, 'text/html', page);
            }
        });
    } else {
        handleUnknownRoute(res);
    }
};

const handleError = (res, statusCode, message, logMessage, error) => {
    console.error(logMessage, error);
    sendResponse(res, statusCode, 'text/plain', message);
};

const handleUnknownRoute = (res) => {
    sendResponse(res, 404, 'text/plain', '404 Not Found');
};

const sendResponse = (res, statusCode, contentType, body) => {
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.write(body);
    res.end();
};

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(url);

    serveFile(url, res);
});

server.listen(args.port);

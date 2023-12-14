const http = require("http");
const fs = require("fs");
const args = require('minimist')(process.argv.slice(2));
const path = require('path');

const mapping = {
    "/" : "home.html",
    "/project" : "project.html",
    "/registration" : "registration.html"
};

let server = http.createServer((req,res)=>{
    let url = req.url;
    console.log(url);

    // Check if the URL is in the mapping
    if (mapping[url]) {
        let filepath = path.join(__dirname, mapping[url]);
        console.log(filepath);

        // Read and serve the HTML file
        fs.readFile(filepath, 'utf-8', (err, page) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.error(`Error reading file: ${filepath}`, err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(page);
                res.end();
            }
        });
    } else {
        // Handle unknown routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(args.port);

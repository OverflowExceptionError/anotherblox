const http = require("http");
const host = 'localhost';
const port = 8000;
const fs = require('fs').promises;
const requestListener = function (req, res) {
    console.log(req.url);
    switch (req.url) {
        case "/":
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end('Temp website!');
            break
        case "/__RCCServiceTemp":
            res.setHeader("Content-Type", "image/png");
            res.writeHead(200);
            res.write(fs.readFile(__dirname + '/2007 doing 1080p... HOW.png').contents);
            res.end();
            break
        default:
            fs.readFile(__dirname + req.url)
                .then(contents => {
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
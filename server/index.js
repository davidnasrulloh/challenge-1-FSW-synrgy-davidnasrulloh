console.log("Implement servermu disini yak 😝!");

const http = require('http');
const fs = require('fs');
const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, '../public');
const DATA_DIRECTORY = path.join(__dirname, '../data');

const getContent = (fileName, directory) => {
    const filePath = path.join(directory, fileName);
    return fs.readFileSync(filePath);
};

const server = (req, res) => {
    const { url } = req;

    const isJs = url.includes('/scripts');
    const isCss = url.includes('/css');
    const isAssetImage = url.includes('/images');

    if (url === '/') {
        res.end(getContent('index.html', PUBLIC_DIRECTORY));
    } else if (url === '/search') {
        res.end(getContent('search.html', PUBLIC_DIRECTORY));
    } else if (isJs || isCss || isAssetImage) {
        res.end(getContent(url, PUBLIC_DIRECTORY));
    } else if (url.startsWith('/data')) {
        const dataFileName = url.replace('/data/', '');
        const dataFilePath = path.join(DATA_DIRECTORY, dataFileName);

        fs.readFile(dataFilePath, 'utf8', (error, data) => {
            if (error) {
                res.setHeader('Content-Type', 'text/plain');
                res.end('File not found');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            }
        });
    } else {
        res.end('page not found');
    }
};

http.createServer(server).listen(3000, '127.0.0.1', () => {
    console.log('Server is running on http://127.0.0.1:3000');
});

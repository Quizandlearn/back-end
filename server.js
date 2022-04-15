//Ceci est le server node

//Les importations : app provient de app.js
const http = require('http');
const app = require('./app');

/*normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne*/
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//L'app tourne sur le port 4000
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

/*la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur*/
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//création d'un server http avec app express
const server = http.createServer(app);

server.on('error', errorHandler);

//Ici le server écoute
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
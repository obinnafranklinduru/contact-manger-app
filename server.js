const http = require('http');
const app = require('./src/app');
const { mongooseConnect } = require('./src/utils/mongoose');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app)

const startServer = async () => {
    try {
        await mongooseConnect();

        server.on('error', (error) => {
            throw new Error(error.message);
        });

        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.error(`Server failed to start: ${error.message}`)
    }
}

startServer();
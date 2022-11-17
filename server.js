const dotenv = require('dotenv');
dotenv.config();
console.log(`Token= ${process.env.TOKEN}`);
const app = require('./src/app')
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`servidor iniciado en http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));
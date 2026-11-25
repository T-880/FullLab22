// Importerar Fastify
const fastify = require('fastify')({
    logger: true
});

// Ansluter till databasen
const db = require('./database/database');

// Startaar servern
const start = async () => {
    try {
        await fastify.listen({
            port: 3000,
            host: '127.0.0.1'
        });

        console.log('Servern körs på http://localhost:3000');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start();
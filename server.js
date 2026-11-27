// Importerar Fastify
const fastify = require('fastify')({
    logger: true
});

// Ansluter till databasen
const db = require('./database/database');

// Gör databasen tillgänglig för routes
fastify.decorate('db', db);

// Registrerar albumets routes
fastify.register(require('./routes/albumRoutes'));

// Startaar servern
const start = async () => {
    try {
        await fastify.listen({
            port: process.env.PORT || 3000,
            host: '0.0.0.0'
        });

        console.log('Servern körs på http://localhost:3000');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start();
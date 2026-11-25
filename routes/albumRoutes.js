// Funktion för att skapa albumets routes
async function albumRoutes(fastify, options) {

    // GET - Hämtar alla album
    fastify.get('/albums', async (request, reply) => {

        const albums = fastify.db.prepare(
            'SELECT * FROM albums'
        ).all();

        return albums;
    });
}

module.exports = albumRoutes;
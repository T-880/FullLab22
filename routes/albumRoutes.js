// Funktion för att skapa albumets routes
async function albumRoutes(fastify, options) {

    // GET - Hämtar alla album
    fastify.get('/albums', async (request, reply) => {

        const albums = fastify.db.prepare(
            'SELECT * FROM albums'
        ).all();

        return albums;
    });

    // GET - Hämtar ett album med ID
    fastify.get('/albums/:id', async (request, reply) => {

        const album = fastify.db.prepare(
            'SELECT * FROM albums WHERE id = ?'
        ).get(request.params.id);

        if (!album) {
            return reply.code(404).send({
                message: 'Albumet hittades inte'
            });
        }

        return album;
    });
}

module.exports = albumRoutes;
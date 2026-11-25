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

    // POST - Lägger till ett nytt album
    fastify.post('/albums', async (request, reply) => {
        const { title, artist, release_year, owned } = request.body || {};

        // Kontrollerar att alla fält finns
        if (
            typeof title !== 'string' || !title.trim() ||
            typeof artist !== 'string' || !artist.trim() ||
            !Number.isInteger(release_year) ||
            typeof owned !== 'boolean'
        ) {
            return reply.code(400).send({
                message: 'Alla fält måste anges med rätt datatyp: title, artist, release_year och owned.'
            });
        }

        // Sparar albumet i databasen
        const result = fastify.db.prepare(`
            INSERT INTO albums (title, artist, release_year, owned)
            VALUES (?, ?, ?, ?)
        `).run(title.trim(), artist.trim(), release_year, owned ? 1 : 0);

        return reply.code(201).send({
            message: 'Albumet har lagts till',
            id: result.lastInsertRowid
        });
    });

    // PUT - Uppdaterar ett befintligt album
    fastify.put('/albums/:id', async (request, reply) => {
        const { title, artist, release_year, owned } = request.body || {};

        // Kontrollerar att alla fält finns och har rätt datatyp
        if (
            typeof title !== 'string' || !title.trim() ||
            typeof artist !== 'string' || !artist.trim() ||
            !Number.isInteger(release_year) ||
            typeof owned !== 'boolean'
        ) {
            return reply.code(400).send({
                message: 'Alla fält måste anges med rätt datatyp: title, artist, release_year och owned.'
            });
        }

        // Kontrollerar att albumet finns
        const album = fastify.db.prepare(
            'SELECT * FROM albums WHERE id = ?'
        ).get(request.params.id);

        if (!album) {
            return reply.code(404).send({
                message: 'Albumet hittades inte'
            });
        }

        // Uppdaterar albumet
        fastify.db.prepare(`
            UPDATE albums
            SET title = ?, artist = ?, release_year = ?, owned = ?
            WHERE id = ?
        `).run(
            title.trim(),
            artist.trim(),
            release_year,
            owned ? 1 : 0,
            request.params.id
        );

        return {
            message: 'Albumet har uppdaterats'
        };
    });

    // DELETE - Raderar ett album
    fastify.delete('/albums/:id', async (request, reply) => {

        // Kontrollerar att albumet finns
        const album = fastify.db.prepare(
            'SELECT * FROM albums WHERE id = ?'
        ).get(request.params.id);

        if (!album) {
            return reply.code(404).send({
                message: 'Albumet hittades inte'
            });
        }

        // Raderar albumet från databasen
        fastify.db.prepare(
            'DELETE FROM albums WHERE id = ?'
        ).run(request.params.id);

        return {
            message: 'Albumet har raderats'
        };
    });
}

module.exports = albumRoutes;
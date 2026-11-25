// Importerar albumController
const albumController = require('../controllers/albumController');

// Registrerar routes för album
async function albumRoutes(fastify, options) {

    // GET - Hämtar alla album
    fastify.get('/albums', albumController.getAllAlbums);

    // GET - Hämtar ett album med ID
    fastify.get('/albums/:id', albumController.getAlbumById);

    // POST - Lägger till ett nytt album
    fastify.post('/albums', albumController.createAlbum);

    // PUT - Uppdaterar ett befintligt album
    fastify.put('/albums/:id', albumController.updateAlbum);

    // DELETE - Raderar ett album
    fastify.delete('/albums/:id', albumController.deleteAlbum);
}

module.exports = albumRoutes;
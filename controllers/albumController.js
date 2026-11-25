// Importerar funktionerna från albumModel
const albumModel = require('../models/albumModel');

// Kontrollerar att inkommande albumdata är korrekt
function validateAlbum(data) {
    const { title, artist, release_year, owned } = data || {};

    if (
        typeof title !== 'string' || !title.trim() ||
        typeof artist !== 'string' || !artist.trim() ||
        !Number.isInteger(release_year) ||
        typeof owned !== 'boolean'
    ) {
        return false;
    }

    return true;
}

// GET - Hämtar alla album
function getAllAlbums(request, reply) {
    return albumModel.getAllAlbums(request.server.db);
}

// GET - Hämtar ett album
function getAlbumById(request, reply) {
    const album = albumModel.getAlbumById(
        request.server.db,
        request.params.id
    );

    if (!album) {
        return reply.code(404).send({
            message: 'Albumet hittades inte'
        });
    }

    return album;
}

// POST - Lägger till ett album
function createAlbum(request, reply) {
    if (!validateAlbum(request.body)) {
        return reply.code(400).send({
            message: 'Alla fält måste anges med rätt datatyp: title, artist, release_year och owned.'
        });
    }

    const album = {
        ...request.body,
        title: request.body.title.trim(),
        artist: request.body.artist.trim()
    };

    const result = albumModel.createAlbum(
        request.server.db,
        album
    );

    return reply.code(201).send({
        message: 'Albumet har lagts till',
        id: result.lastInsertRowid
    });
}

// PUT - Uppdaterar ett album
function updateAlbum(request, reply) {
    if (!validateAlbum(request.body)) {
        return reply.code(400).send({
            message: 'Alla fält måste anges med rätt datatyp: title, artist, release_year och owned.'
        });
    }

    const db = request.server.db;
    const id = request.params.id;

    const existingAlbum = albumModel.getAlbumById(db, id);

    if (!existingAlbum) {
        return reply.code(404).send({
            message: 'Albumet hittades inte'
        });
    }

    const album = {
        ...request.body,
        title: request.body.title.trim(),
        artist: request.body.artist.trim()
    };

    albumModel.updateAlbum(db, id, album);

    return {
        message: 'Albumet har uppdaterats'
    };
}

// DELETE - Raderar ett album
function deleteAlbum(request, reply) {
    const db = request.server.db;
    const id = request.params.id;

    const existingAlbum = albumModel.getAlbumById(db, id);

    if (!existingAlbum) {
        return reply.code(404).send({
            message: 'Albumet hittades inte'
        });
    }

    albumModel.deleteAlbum(db, id);

    return {
        message: 'Albumet har raderats'
    };
}

// Exporterar funktionerna
module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
};
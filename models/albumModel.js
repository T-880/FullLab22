// Model för att hantera album i databasen

// Hämtar alla album
function getAllAlbums(db) {
    return db.prepare(
        'SELECT * FROM albums'
    ).all();
}

// Hämtar ett album med ID
function getAlbumById(db, id) {
    return db.prepare(
        'SELECT * FROM albums WHERE id = ?'
    ).get(id);
}

// Lägger till ett nytt album
function createAlbum(db, album) {
    return db.prepare(`
        INSERT INTO albums (title, artist, release_year, owned)
        VALUES (?, ?, ?, ?)
    `).run(
        album.title,
        album.artist,
        album.release_year,
        album.owned ? 1 : 0
    );
}

// Uppdaterar ett album
function updateAlbum(db, id, album) {
    return db.prepare(`
        UPDATE albums
        SET title = ?, artist = ?, release_year = ?, owned = ?
        WHERE id = ?
    `).run(
        album.title,
        album.artist,
        album.release_year,
        album.owned ? 1 : 0,
        id
    );
}

// Raderar ett album
function deleteAlbum(db, id) {
    return db.prepare(
        'DELETE FROM albums WHERE id = ?'
    ).run(id);
}

// Exporterar funktionerna
module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
};
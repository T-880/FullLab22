## Om projektet

Detta projekt är ett REST API för att hantera en personlig albumsamling.

API:et är byggt med Node.js och Fastify och använder SQLite som databas.

Det går att hämta, lägga till, uppdatera och radera album.

## Tekniker

- Node.js
- Fastify
- SQLite
- better-sqlite3

## Installation

1. Klona projektet från GitHub.
2. Öppna projektmappen i terminalen.
3. Installera paketen:

npm install

4. Starta servern:

node server.js

Servern startar på:

http://localhost:3000

## Databas

Databasen innehåller tabellen albums med följande fält:

| Fält | Datatyp | Beskrivning |
|---|---|---|
| id | Integer | Unikt ID |
| title | Text | Albumets titel |
| artist | Text | Artistens namn |
| release_year | Integer | Utgivningsår |
| owned | Boolean | Om albumet ägs |

## API Endpoints

### Hämta alla album

GET /albums

Hämtar samtliga album.

### Hämta ett album

GET /albums/:id

Hämtar ett album baserat på ID.

### Lägg till album

POST /albums

Exempel på JSON:

{
  "title": "Thriller",
  "artist": "Michael Jackson",
  "release_year": 1982,
  "owned": true
}

### Uppdatera album

PUT /albums/:id

Skickar albumets nya information i JSON-format.

### Radera album

DELETE /albums/:id

Raderar ett album baserat på ID.

## Validering

API:et kontrollerar att:

- Title är en textsträng.
- Artist är en textsträng.
- Release_year är ett heltal.
- Owned är ett boolean-värde.

Om information saknas eller har fel datatyp returneras ett felmeddelande.

## Kodstruktur

- Controllers: Hanterar inkommande anrop och svar.
- Models: Hanterar databasfrågor.
- Routes: Definierar API:ets endpoints.
- Database: Hanterar databasanslutningen.

## Testning

API:et har testats med Thunder Client i Visual Studio Code.

Samtliga CRUD-funktioner har testats:
GET, POST, PUT och DELETE.
# REST API – Albumsamling

## Om projektet

Detta projekt är ett REST API för att hantera en personlig albumsamling.

API:et är byggt med Node.js och Fastify och använder SQLite som databas.

Det går att hämta, lägga till, uppdatera och radera album genom API:ets CRUD-funktioner.

Webbtjänsten är publicerad på Render och kan testas via internet.

**Publik webbtjänst:**
https://backend-ramverk.onrender.com

## Tekniker

- Node.js
- Fastify
- SQLite
- better-sqlite3

## Installation

1. Klona projektet från GitHub.
2. Öppna projektmappen i terminalen.
3. Installera paketen:

```bash
npm install
```

4. Starta servern:

```bash
npm start
```

Servern startar lokalt på:

http://localhost:3000

## Databas

Databasen innehåller tabellen `albums` med följande fält:

| Fält | Datatyp | Beskrivning |
|---|---|---|
| id | Integer | Unikt ID |
| title | Text | Albumets titel |
| artist | Text | Artistens namn |
| release_year | Integer | Utgivningsår |
| owned | Boolean | Om albumet ägs |

## API Endpoints

Samtliga endpoints finns tillgängliga både lokalt och via den publicerade webbtjänsten.

**Publik basadress:**
https://backend-ramverk.onrender.com

| Metod | Endpoint | Funktion |
|---|---|---|
| GET | /albums | Hämtar alla album |
| GET | /albums/:id | Hämtar ett album baserat på ID |
| POST | /albums | Lägger till ett nytt album |
| PUT | /albums/:id | Uppdaterar ett befintligt album |
| DELETE | /albums/:id | Raderar ett album |

### Exempel på POST

Skicka följande JSON i request body:

```json
{
  "title": "Thriller",
  "artist": "Michael Jackson",
  "release_year": 1982,
  "owned": true
}
```

### Exempel på publik endpoint

Hämta alla album:

https://backend-ramverk.onrender.com/albums

Hämta ett album med ID 1:

https://backend-ramverk.onrender.com/albums/1

## Validering

API:et kontrollerar att:

- `title` är en textsträng.
- `artist` är en textsträng.
- `release_year` är ett heltal.
- `owned` är ett boolean-värde.

Om information saknas eller har fel datatyp returneras HTTP-statuskod 400 med ett tydligt felmeddelande.

Om ett album inte hittas returneras HTTP-statuskod 404.

## Kodstruktur

- Controllers: Hanterar inkommande anrop och svar.
- Models: Hanterar databasfrågor.
- Routes: Definierar API:ets endpoints.
- Database: Hanterar databasanslutningen.

## Testning

API:et har testats med Thunder Client i Visual Studio Code.

Samtliga CRUD-funktioner har testats på den publicerade webbtjänsten:

- GET – Hämta alla album och ett specifikt album.
- POST – Lägga till ett album.
- PUT – Uppdatera ett befintligt album.
- DELETE – Radera ett album.

Även valideringen har testats genom att skicka felaktig eller ofullständig information.

## Publicering

Webbtjänsten är publicerad via Render och kan nås på:

https://backend-ramverk.onrender.com

Databasen använder SQLite och skapas automatiskt när servern startas.
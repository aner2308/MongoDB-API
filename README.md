# Uppgift 2.1 i kursen DT207G, Back-end.
*Anton Eriksson, aner2308*

Denna README-fil dokumenterar funktionaliteten för min webbapplikation. Applikationen är ett enklare REST API för hantering av jobberfarenheter.

## Beskrivning
Min Webbapplikation tillhandahåller ett API för att hantera jobberfarenheter. Användare kan utföra CRUD-åtgärder (skapa, läsa, uppdatera, radera) på jobberfarenhetsposter via detta API.

## Länk till liveversion av API:et
[Liveversion av API](https://uppgift2-1.onrender.com/)

## Installation
API:et använder en MongoDB-databas med Mongoose. Följ stegen nedan för installation.

1. Klona detta repo till din lokala maskin.
2. Installera alla dependencies genom att köra `npm install`.
3. Konfigurera miljövariabler genom att skapa en `.env`-fil och fylla i nödvändig information enligt `.env.sample`.
4. Se till att ha en MongoDB-databas tillgänglig och konfigurera anslutningsinformationen i `.env`-filen.

## Användning
### URI:er för CRUD
- **GET /api/workexperience:** Hämta alla jobberfarenheter.
- **POST /api/workexperience:** Skapa en ny jobberfarenhet. *Kräver JSON-data med fält som companyname, jobtitle, location,  description. Se exempel:*

{
"companyname": "Dundertestarna",
"jobtitle": "Testare",
"location": "Sundsvall",
"description": "Arbetade med att testa saker."
}

- **DELETE /api/workexperience/:id:** Radera en jobberfarenhet med den angivna id:en.
- **PUT /api/workexperience/:id:** Uppdatera en befintlig jobberfarenhet med den angivna id:en. 

## Dependencies
- Express.js
- cors
- dotenv
- MongoDB with Mongoose 🍃

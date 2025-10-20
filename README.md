# Expertlab 2025 OAuth Project

Dit project implementeert een volledige OAuth 2.0 Authorization Code Flow en OpenID Connect op basis van een gescheiden microservice-architectuur. Het bestaat uit twee onafhankelijke applicaties: een OAuth Client ("Resource Server") en een OAuth Provider ("Authorization Server").

---

## 🏗 Project Architectuur

Het project is opgesplitst in twee hoofdmappen, die elk een aparte applicatie vormen:


| Map              | Rol                                                 | Technologie                     | Poort (Standaard) | Database Naam                    |
| ---------------- | --------------------------------------------------- | ------------------------------- | ----------------- | -------------------------------- |
| `OAuth_provider` | Authorization Server (Authenticatie en toestemming) | ExpressJS, MongoDB, React, Vite | 3000              | `OAuth_provider_expert_lab_2025` |
| `OAuth_client`   | Resource Client (Gebruikt OAuth voor login)         | ExpressJS, MongoDB, React, Vite | 8080              | `OAuth_client_expert_lab_2025`   |

---

## ⚙️ Tech Stack

**Frontend (Client & Provider)**

- React
- Vite
- Sass (voor styling)

**Backend (Client & Provider)**

- ExpressJS
- MongoDB (als database)
- Bcrypt (voor wachtwoordhashing)
- Express-Session (voor sessiebeheer)
- Nodemon (voor ontwikkeling)

---

## 🚀 Up and Running (Stap-voor-stap Setup)

Om het project lokaal te starten, moet je zowel de OAuth_provider als de OAuth_client instellen en uitvoeren.

### 1. Repository Klone en Navigeer

```bash
git clone <repo-link>
```

### 2. Back-end Setup (Provider en Client Servers)

Beide servermappen hebben een afzonderlijke setup nodig.

#### A. OAuth_provider/server (Poort 3000)

**Installeer afhankelijkheden:**

```bash
cd OAuth_provider/server
npm install
```

**Creëer .env bestand:**
Maak een `.env`-bestand in deze map en voeg de volgende variabelen toe (vervang `<YOUR_DB_URI>`):

```
DB_URI=<YOUR_DB_URI>
COOKIE_SECRET=<YOUR_SECRET>
```

**Start de server:**

```bash
npm start
# De provider server start op http://localhost:3000
```

> 💡 *Opmerking over MongoDB:* De server stelt automatisch TTL-indexen in op de MongoDB-collecties: `auth_code` vervalt na 300 seconden, en `access_token` na 3600 seconden.

#### B. OAuth_client/server (Poort 8080)

**Installeer afhankelijkheden:**

```bash
cd ../../OAuth_client/server
npm install
```

**Creëer .env bestand:**

```
DB_URI=<YOUR_DB_URI>
COOKIE_SECRET=<YOUR_SECRET>
```

**Start de server:**

```bash
npm start
# De client server start op http://localhost:8080
```

---

### 3. Front-end Setup (Provider en Client Clients)

Beide client-mappen moeten worden opgestart.

#### A. OAuth_provider/client (Poort 5173)

**Installeer afhankelijkheden:**

```bash
cd ../../OAuth_provider/client
npm install
```

**Start de client:**

```bash
npm run dev
# De provider client start op http://localhost:5173
```

#### B. OAuth_client/client (Poort 5174)

**Installeer afhankelijkheden:**

```bash
cd ../../OAuth_client/client
npm install
```

**Creëer .env bestand (belangrijk voor OAuth):**
Maak een `.env`-bestand in deze map en definieer de volgende variabelen:

```
VITE_CLIENT_ID=<PLACEHOLDER_ID>
VITE_CLIENT_SECRET=<PLACEHOLDER_SECRET>
VITE_REDIRECT_URI=http://localhost:5174/#/auth/token
VITE_REDIRECT_AFTER_TOKEN=/
```

**Start de client:**

```bash
npm run dev
# De client applicatie start op http://localhost:5174
```

---

## 🔐 Key Functionality (OAuth Flow)

### Client Registratie

Voordat de OAuth-flow kan starten, moet de client zich registreren bij de provider.
Dit gebeurt op de client-applicatie via de route `/register/oauth`.

De client stuurt de volgende data naar het registratie-endpoint van de provider:

- clientnaam
- eigenaar-e-mail
- omleidings-URL (`redirect_uri`)
- gevraagde scope

De provider genereert vervolgens een unieke **Client ID** en **Client Secret**.

> ⚠️ **ACTIE VEREIST:** De gegenereerde Client ID en Secret moeten vervolgens worden ingevuld in het `.env` bestand van de client-applicatie (`OAuth_client/client/.env`).

### Flow Start

Wanneer een gebruiker op de client op "Login met itsyou" klikt, wordt de flow gestart:

1. De client stuurt de gebruiker naar de provider’s autorisatie-endpoint (`/auth/login`).
2. De gebruiker logt in op de Provider-server en gaat naar de toestemmingspagina (`/auth/consent`).
3. Bij goedkeuring geeft de provider een **Authorization Code** terug aan de client’s `redirect_uri`.
4. De client wisselt deze code in bij `/oauth/token` voor een **Access Token**.
5. De client vraagt gebruikersinformatie op via `/users/userinfo`.
6. De client slaat de data lokaal op en leidt de gebruiker naar `/` (Home).

---

## 📚 Gebruikte Bronnen

- [Merlino - oauth steps](https://merlino.agency/blog/step-by-step-how-to-implement-oauth2-server-in-expressjs?utm_source=chatgpt.com)
- [OAuth - example flow](https://www.oauth.com/oauth2-servers/server-side-apps/example-flow/?utm_source=chatgpt.com)
- [OAuth - OAuth2.0 en OpenID guide](https://auth0.com/resources/ebooks/oauth-openid-connect-professional-guide/thankyou)
- [OAuth - Understanding OAuth2](https://medium.com/google-cloud+understanding-oauth2-and-building-a-basic-authorization-server-of-your-own-a-beginners-guide-cf7451a16f66)
- [Stack Overflow - Session store VS database](https://stackoverflow.com/questions/33897276/what-is-the-difference-between-a-session-store-and-database)
- [MongoDB - CreateIndex, delete from database after expired ](https://www.mongodb.com/docs/php-library/current/reference/method/MongoDBCollection-createIndex/)
- [Stack Overflow - createIndex](https://stackoverflow.com/questions/49410628/delete-data-from-a-mongodb-collection-when-date-expires)
- [ExpressJS - Session](https://expressjs.com/en/resources/middleware/session.html)
- [ChatGPT - Hulp voor het opbouwen en verduidelijken van het stappenplan](https://chatgpt.com/share/68e37139-d970-8004-8e95-773fcebc693e)
- [ChatGPT - Hulp voor he opbouwen en verduidelijekn van het stappenplan 2](https://chatgpt.com/share/68e52953-8150-8004-9781-a482289e14f9)

---

## Research

[Bekijk mijn onderzoek naar OAuth](./OAuth-research.md)

## 🧑‍💻 Author

Sam Hoeterickx <br>
Student Multimedia & Creative Technology <br>
Erasmushogeschool Brussel <br>
[Linkedin](https://www.linkedin.com/in/sam-hoeterickx/) <br>
[portfolio](https://www.samhoeterickx.be)

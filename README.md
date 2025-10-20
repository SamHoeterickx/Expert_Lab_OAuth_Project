# Expertlab 2025 OAuth project

<br>

## Tech Stack
### Frontend
- React
- Sass
- Vite

### Backend
- ExpressJS
- Express-session
- Cookie-parser
- Bcrypyt
- MongoDB
  
<br>

## Research
[Read my research file](./OAuth-research.md)


## Sources 
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


## Env
### OAuth_client: <br>
  server:
  ```sh
    DB_URI=""
  ```
  client:
  ```sh
    VITE_CLIENT_ID=""
    VITE_CLIENT_SECRET=""
    VITE_REDIRECT_URI=""
    VITE_BASE_URI=""
    VITE_REDIRECT_AFTER_TOKEN=""
  ```
### OAuth_provider: <br>
  server:
  ```sh
    DB_URI=""
  ```

## Up and Running

To run this project locally, follow these steps:
Clone repository
  ```sh
  git clone <repo-link>
```
### OAuth_provider:
1. Locate folder
   ```sh
     cd OAuth_provider
   ```
2. Run Frontend
   2.1 Locate folder
   ```sh
    cd client
   ```
   2.2 Install dependecies
   ```sh
     npm i
   ```
   2.3 Run code
   ```sh
    npm run dev
   ```
3. Run Backend
   3.1 Locate folder
   ```sh
    cd server
   ```
   3.2 Install dependecies
   ```sh
     npm i
   ```
   2.3 Run code
   ```sh
    npm run start
   ```
<br>

### OAuth_client:
1. Locate folder
   ```sh
     cd OAuth_client
   ```
2. Run Frontend
   2.1 Locate folder
   ```sh
    cd client
   ```
   2.2 Install dependecies
   ```sh
     npm i
   ```
   2.3 Run code
   ```sh
    npm run dev
   ```
3. Run Backend
   3.1 Locate folder
   ```sh
    cd server
   ```
   3.2 Install dependecies
   ```sh
     npm i
   ```
   2.3 Run code
   ```sh
    npm run start
   ```

<br>


## Author
Sam Hoeterickx <br>
Student Multimedia & Creative Technology <br>
Erasmushogeschool Brussel <br>
[Linkedin](https://www.linkedin.com/in/sam-hoeterickx/) <br>
[portfolio](https://www.samhoeterickx.be)



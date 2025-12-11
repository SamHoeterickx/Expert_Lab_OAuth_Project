# Expertlab 2025 OAuth Project

This project implements a full OAuth 2.0 Authorization Code Flow and OpenID Connect based on a separated microservice architecture. It consists of two independent applications: an OAuth Client ("Resource Server") and an OAuth Provider ("Authorization Server").

> This project is part of the expertlab course at EHB

---

## Live links
OAuth provider: https://skyblue-hyena-257309.hostingersite.com/#/login <br>
OAuth client example: https://lightpink-gorilla-173264.hostingersite.com/#/login

## Step By Step Guide
To implement this provider in your own website please follow the next steps <br>

### Step 1: Register your Application
```bash
  Login or create account: https://skyblue-hyena-257309.hostingersite.com/#/login
  Then register OAuth
  Enter your application details
    name, owner email, redirect URL, base URL and desired scope
```
### Step 2: Save Generated Values
```bash
  VITE_CLIENT_ID=<CLIENT_ID>
  VITE_CLIENT_SECRET=<CLIENT_SECRET>
  VITE_REDIRECT_URI=<REDIRECT_URL>
  VITE_BASE_URI=<BASE_URL>
  VITE_REDIRECT_AFTER_TOKEN=<REDIRECT_URL>
```
### Step 3: Implement Login Code
To initiate the OAuth flow, your frontend should redirect the user to the Provider.<br>
Recommended Approach: Do not hardcode the URL in a button. Instead, construct it dynamically (or fetch it from your backend) to ensure the parameters are correct.
```javascript
  const handleLogin = (e) => {
      e.preventDefault();
  
      // 1. Configuration
      const client_id = import.meta.env.VITE_CLIENT_ID;
      const redirect_uri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
      // The Live Provider Backend
      const providerBaseUrl = "https://expert-lab-oauth-project.onrender.com"; 
  
      // 2. Construct the Authorization URL
      // Endpoint: /auth/login
      // Params: client_id, redirect_uri, response_type=code, scope
      const authUrl = `${providerBaseUrl}/auth/login?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=openid`;
  
      // 3. Redirect the user
      window.location.href = authUrl;
  }
```
## Project Architecture

The project is split into two main folders, each forming a separate application:

| Folder           | Role                                            | Technology                      | Port (Default) | Database Name                    |
| ---------------- | ----------------------------------------------- | ------------------------------- | -------------- | -------------------------------- |
| `OAuth_provider` | Authorization Server (Authentication & Consent) | ExpressJS, MongoDB, React, Vite | 3000           | `OAuth_provider_expert_lab_2025` |
| `OAuth_client`   | Resource Client (Uses OAuth for login)          | ExpressJS, MongoDB, React, Vite | 8080           | `OAuth_client_expert_lab_2025`   |

---

## Tech Stack

**Frontend (Client & Provider)**

* React
* Vite
* Sass (for styling)

**Backend (Client & Provider)**

* ExpressJS
* MongoDB
* Bcrypt (for password hashing)
* Express-Session (for session management)
* Nodemon (for development)

---

## Getting Started (Step-by-Step Setup)

To run the project locally, you need to set up and run both OAuth_provider and OAuth_client.

### 1. Clone the Repository and Navigate

```bash
git clone <repo-link>
```

### 2. Backend Setup (Provider and Client Servers)

Both server folders require a separate setup.

#### A. OAuth_provider/server (Port 3000)

**Install dependencies:**

```bash
cd OAuth_provider/server
npm install
```

**Create .env file:**

```
DB_URI=<YOUR_DB_URI>
COOKIE_SECRET=<YOUR_SECRET>
```

**Start the server:**

```bash
npm start
# The provider server starts at http://localhost:3000
```

> Note on MongoDB: The server automatically sets TTL indexes on collections: `auth_code` expires after 300 seconds, and `access_token` after 3600 seconds.

#### B. OAuth_client/server (Port 8080)

**Install dependencies:**

```bash
cd ../../OAuth_client/server
npm install
```

**Create .env file:**

```
DB_URI=<YOUR_DB_URI>
COOKIE_SECRET=<YOUR_SECRET>
```

**Start the server:**

```bash
npm start
# The client server starts at http://localhost:8080
```

---

### 3. Frontend Setup (Provider and Client Clients)

Both client folders need to be started.

#### A. OAuth_provider/client (Port 5173)

**Install dependencies:**

```bash
cd ../../OAuth_provider/client
npm install
```

**Start the client:**

```bash
npm run dev
# The provider client starts at http://localhost:5173
```

#### B. OAuth_client/client (Port 5174)

**Install dependencies:**

```bash
cd ../../OAuth_client/client
npm install
```

**Create .env file (important for OAuth):**

```
VITE_CLIENT_ID=<PLACEHOLDER_ID>
VITE_CLIENT_SECRET=<PLACEHOLDER_SECRET>
VITE_REDIRECT_URI=http://localhost:5174/#/auth/token
VITE_REDIRECT_AFTER_TOKEN=/
```

**Start the client:**

```bash
npm run dev
# The client application starts at http://localhost:5174
```

---

## Key Functionality (OAuth Flow)

### Client Registration

Before the OAuth flow can start, the client must register with the provider via the `/register/oauth` route in the client application.

The client sends the following data to the provider's registration endpoint:

* client name
* owner email
* redirect URL (`redirect_uri`)
* requested scope

The provider generates a unique **Client ID** and **Client Secret**.

> Action Required: The generated Client ID and Secret must be added to the client's `.env` file (`OAuth_client/client/.env`).

### Flow Start

When a user clicks "Login with itsyou" on the client:

1. The client redirects the user to the provider's authorization endpoint (`/auth/login`).
2. The user logs in on the Provider server and is redirected to the consent page (`/auth/consent`).
3. Upon approval, the provider returns an **Authorization Code** to the client's `redirect_uri`.
4. The client exchanges this code at `/oauth/token` for an **Access Token**.
5. The client fetches user information via `/users/userinfo`.
6. The client stores the data locally and redirects the user to `/` (Home).

---

## References

* [Merlino - OAuth steps](https://merlino.agency/blog/step-by-step-how-to-implement-oauth2-server-in-expressjs?utm_source=chatgpt.com)
* [OAuth - Example flow](https://www.oauth.com/oauth2-servers/server-side-apps/example-flow/?utm_source=chatgpt.com)
* [OAuth - OAuth2.0 and OpenID guide](https://auth0.com/resources/ebooks/oauth-openid-connect-professional-guide/thankyou)
* [OAuth - Understanding OAuth2](https://medium.com/google-cloud+understanding-oauth2-and-building-a-basic-authorization-server-of-your-own-a-beginners-guide-cf7451a16f66)
* [Stack Overflow - Session store VS database](https://stackoverflow.com/questions/33897276/what-is-the-difference-between-a-session-store-and-database)
* [MongoDB - CreateIndex, delete after expiration](https://www.mongodb.com/docs/php-library/current/reference/method/MongoDBCollection-createIndex/)
* [Stack Overflow - createIndex](https://stackoverflow.com/questions/49410628/delete-data-from-a-mongodb-collection-when-date-expires)
* [ExpressJS - Session](https://expressjs.com/en/resources/middleware/session.html)

---

## Research

[View my OAuth research](./OAuth-research.md)

## Author

Sam Hoeterickx <br>
Student Multimedia & Creative Technology <br>
Erasmushogeschool Brussel <br>
[Linkedin](https://www.linkedin.com/in/sam-hoeterickx/) <br>
[portfolio](https://www.samhoeterickx.be) <br>


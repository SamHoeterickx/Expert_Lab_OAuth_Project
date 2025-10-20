# 1_1 Research

## Wat is authenication

process waarbij de identiteit van de gebruiker wordt geverifieerd voor dat er toegang wordt verleend tot bepaalde delen van een website zoals bv accounts, netwerken, systemen, …

## Wat is authorization

Dit bepaald het toegangsniveau dat de gebruiker heeft, 

## Verschil authentication en authorization

Authentication gaat de identiteit van een gebruiker gaan viriferen terwijl authorization bepaalt het toegangsniveau van gebruiker

## Wat is OAUTH

Open Authorization

is een veilige manier voor gebruikers om third party apps gelimiteerde toegang te geven tot hun gegevens op een andere service, zonder dat je je login gegevens moet delen.

Hierbij wordt niet je identiteit geverifieerd maar je identiteit wordt wel gebruikt, om toestemming te geven voor verbinding met verschillende apps en services. Dit zorgt ervoor dat je niet overal accounts hoeft te maken. 

 OAuth werkt meestal over HTTPS (beveiligde verbinding) (HyperText Transfer Protocol). Het gaat ook niet om “identiteit bewijzen”, maar om toegang via tokens. Identiteitsverificatie gebeurt pas met OIDC. 

OAuth verleent geen onbeperkte toegang tot je gegevens aan derden, de service waarmee oauth gedaan wordt moet opgeven welke gegevens de derde partij toegang tot krijgt en wat ze kunnen doen met deze info.

## Hoe werkt OAuth

Door het gebruik van toegangstokens is het gebruik van OAuth veilig. Zo een token bevat gegevensdeeltjes dat info bevat van de gebruiker en waarvoor de token bedoeld is. Alsook specifieke regels omtrent het delen van de gegevens. Ook kan de token regels bevatten ivm het gebruik van de token, eenmalig of terugkerend gebruik met een vervaldatum. 

## Verschil OAuth 1.0 en OAuth 2.0

1.0 is ontwikkeld voor websites terwijl 2.0 ontwikkeld is voor websites en apps. 1.0 wordt tegenwoordig nog amper gebruikt, omdat 2.0 sneller is, eenvoudiger te implementeren is en apps ook heeft.

## OAuth flow

### Flow type 1: Authorization Code Flow

meest voorkomende, wanneer applicatie toegang nodig heeft tot beschermde resources van de gebruiker

![image.png](image.png)

### Flow type 2: Client Credentials Flow

Deze flow wordt gebruikt wanneer een applicatie geen toegang nodig heeft tot de gegevens van een gebruiker, maar enkel tot eigen resources of server-to-server communicatie. De applicatie vraagt direct bij de Authorization Server een access token aan met zijn eigen client ID en secret. Er komt dus geen gebruiker aan te pas.

### Flow type 3: Resource Owner Password flow

Deze flow wordt gebruikt wanneer een applicatie toegang nodig heeft tot de protected resources van de gebruiker, maar de gebruiker niet geredirected wil worden naar een Identity Provider (IDP). De gebruiker geeft zijn gebruikersnaam en wachtwoord rechtstreeks aan de applicatie, die dit doorstuurt naar de Authorization Server om een access token te krijgen.

Deze flow wordt als onveilig beschouwd omdat de applicatie de credentials van de gebruiker in handen krijgt.

### Flow type 4: Implicit flow

De implicit flow is een versimpelde versie van de Authorization Code Flow , bedoeld voor applicaties die volledig in de browser draaien (zoals single-page apps). De access token wordt direct teruggegeven in de URL na toestemming, zonder extra code-uitwisseling.

Tegenwoordig wordt deze flow afgeraden, omdat tokens zichtbaar kunnen worden in de URL en dus makkelijker onderschept kunnen worden.

## OAuth vs OIDC

OIDC = Open ID Connect

OIDC wordt gebruikt voor verificatie van de identiteit van een persoon

OAuth en OIDC zijn verwante protocollen, beide spelen ze een rol in het verlenen van toegang tot resources van een andere toepassing.

| OAuth | OIDC |
| --- | --- |
| Authorization | Authentication |
|  |  |

## JWT

= JSON Web Token

Is een internetstandaard voor veilige communicatie tussen 2 partijen. Het is compact, url-veilig en zelfstandig wat het ideaal maakt voor verzenden van authentication en verification. 

Aan de hand van een algoritme wordt er een handtekening gemaakt die specifiek is aan de data.  Spaties en regeleinden zijn niet goed voor netwerkoverdracht daarom moet de header en payload als Base64URL-gecodeerd worden.

Signature wordt gedaa in HMAC-SHA256 met een geheim

```jsx
//Combinatie
{{header}}.{{payload}}.{{signature}}

//Header
{
	"alg":"HS256",
	"typ":"JWT"
}
//Base64URL versie van Header is dan
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

Payload
{
	"sub":"foo",
	"name":"John Doe"
}
//Base64URL versie van Payload is dan
eyJzdWIiOiJmb28iLCJuYW1lIjoiSm9obiBEb2UifQ

//Signature
//Secret is in dit voorbeeld: some-great-secret
HMAC-SHA256(base64Url(header) + "." + base64Url(payload), secret)

//JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmb28iLCJuYW1lIjoiSm9obiBEb2UifQ.XM-XSs2Lmp76IcTQ7tVdFcZzN4W_WcoKMNANp925Q9g

```

## JWT VS OAuth 2.0

OAuth wordt gebruikt voor  authorization terwijl jwt voornamelijk gebruikt wordt bij authetication en uitwisselen van info in de vorm van een tken. OAuth gebruikt tokens (waaronder vaak JWT’s) om toegang veilig te regelen. JWT is een token dat info en claims over de gebruiker bevat terwijl OAuth gebruikt een unieke token om toegang te verlenen voor resources van de gebruiker.

### Bronnen

https://www.keepersecurity.com/blog/nl/2023/12/26/authentication-vs-authorization-whats-the-difference/

https://auth-wiki.logto.io/nl/authentication

https://www.microsoft.com/nl-nl/security/business/security-101/what-is-oauth

https://auth-wiki.logto.io/nl/jwt

https://frontegg.com/blog/oauth-vs-jwt

https://www.youtube.com/watch?v=ZV5yTm4pT8g

https://www.youtube.com/watch?v=ZDuRmhLSLOY
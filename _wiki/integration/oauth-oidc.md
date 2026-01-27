---
title: OAuth2 / OpenID Connect
description: Integrate your applications with IAM OnDemand using OAuth2 and OpenID Connect protocols.
category: integration
order: 31
lang: en
page_id: wiki-oauth-oidc
---

## Overview

OAuth 2.0 and OpenID Connect (OIDC) are the recommended protocols for modern application integration. IAM OnDemand fully supports these standards for secure authentication and authorization.

## Key Concepts

### OAuth 2.0

Authorization framework for delegated access:

- **Access Token** - Grants access to protected resources
- **Refresh Token** - Obtains new access tokens
- **Scopes** - Define access permissions

### OpenID Connect

Identity layer on top of OAuth 2.0:

- **ID Token** - Contains user identity claims
- **UserInfo Endpoint** - Retrieves user profile
- **Standard Scopes** - openid, profile, email

## Discovery Endpoint

Retrieve all endpoints and configuration:

```
https://your-instance.iam-ondemand.com/realms/{realm}/.well-known/openid-configuration
```

Response includes:

```json
{
  "issuer": "https://your-instance.iam-ondemand.com/realms/{realm}",
  "authorization_endpoint": "...",
  "token_endpoint": "...",
  "userinfo_endpoint": "...",
  "jwks_uri": "..."
}
```

## Authorization Flows

### Authorization Code Flow

Recommended for server-side applications:

```
1. Redirect to authorization endpoint
2. User authenticates
3. Receive authorization code
4. Exchange code for tokens
```

Example authorization request:

```
GET /realms/{realm}/protocol/openid-connect/auth?
  response_type=code&
  client_id=my-app&
  redirect_uri=https://app.example.com/callback&
  scope=openid profile email&
  state=random-state
```

### Authorization Code + PKCE

Recommended for SPAs and mobile apps:

```javascript
// Generate code verifier and challenge
const verifier = generateRandomString(128);
const challenge = base64URLEncode(sha256(verifier));

// Authorization request with PKCE
const authUrl = `${authEndpoint}?
  response_type=code&
  client_id=${clientId}&
  redirect_uri=${redirectUri}&
  scope=openid profile&
  code_challenge=${challenge}&
  code_challenge_method=S256`;
```

### Client Credentials Flow

For machine-to-machine communication:

```bash
curl -X POST \
  https://your-instance.iam-ondemand.com/realms/{realm}/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=my-service" \
  -d "client_secret=your-secret"
```

## Token Management

### Access Token

JWT format with claims:

```json
{
  "exp": 1234567890,
  "iat": 1234567800,
  "sub": "user-uuid",
  "realm_access": {
    "roles": ["user", "admin"]
  },
  "scope": "openid profile email"
}
```

### Token Introspection

Validate tokens server-side:

```bash
curl -X POST \
  https://your-instance.iam-ondemand.com/realms/{realm}/protocol/openid-connect/token/introspect \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token={access_token}" \
  -d "client_id=my-app" \
  -d "client_secret=secret"
```

### Token Refresh

Obtain new access token:

```bash
curl -X POST \
  https://your-instance.iam-ondemand.com/realms/{realm}/protocol/openid-connect/token \
  -d "grant_type=refresh_token" \
  -d "refresh_token={refresh_token}" \
  -d "client_id=my-app"
```

## Client Configuration

### Creating an OIDC Client

1. Go to **Clients**
2. Click **Create client**
3. Select **OpenID Connect**
4. Configure:

| Setting | Value |
|---------|-------|
| Client ID | Your app identifier |
| Valid Redirect URIs | Your callback URLs |
| Web Origins | CORS origins |

### Client Settings

| Type | Use Case | Settings |
|------|----------|----------|
| Confidential | Server apps | Client authentication: On |
| Public | SPAs, Mobile | Client authentication: Off, PKCE: Required |

## Scopes and Claims

### Standard Scopes

| Scope | Claims Included |
|-------|-----------------|
| openid | sub |
| profile | name, family_name, given_name |
| email | email, email_verified |
| address | address |
| phone | phone_number |

### Custom Claims

Add custom claims via protocol mappers:

1. Go to **Client scopes**
2. Create or select scope
3. Add **Mapper**
4. Configure claim mapping

## Integration Examples

### Node.js (Express)

```javascript
const Keycloak = require('keycloak-connect');

const keycloak = new Keycloak({}, {
  realm: 'my-realm',
  'auth-server-url': 'https://your-instance.iam-ondemand.com/',
  resource: 'my-app',
  'confidential-port': 0
});

app.use(keycloak.middleware());

app.get('/protected', keycloak.protect(), (req, res) => {
  res.json({ user: req.kauth.grant.access_token.content });
});
```

### React SPA

```javascript
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://your-instance.iam-ondemand.com/',
  realm: 'my-realm',
  clientId: 'my-spa'
});

keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256' })
  .then(authenticated => {
    if (authenticated) {
      console.log('User authenticated');
    }
  });
```

## Best Practices

- Always use PKCE for public clients
- Validate tokens on each request
- Use short-lived access tokens
- Implement proper token storage
- Handle token refresh gracefully

## Next Steps

- [SAML Integration](/wiki/integration/saml/) - Enterprise SAML setup
- [LDAP Integration](/wiki/integration/ldap/) - User federation
- [REST API Reference](/wiki/api/rest-api/) - Admin API

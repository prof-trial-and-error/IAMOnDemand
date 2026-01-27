---
title: Quick Start Guide
description: Get your IAM OnDemand instance running in minutes with this step-by-step guide.
category: getting-started
order: 2
lang: en
page_id: wiki-quick-start
---

## Prerequisites

Before you begin, make sure you have:

- An IAM OnDemand account ([Sign up here](/) if you don't have one)
- A valid email address for verification
- Basic understanding of identity management concepts (helpful but not required)

## Step 1: Create Your Instance

After logging into your IAM OnDemand dashboard:

1. Click the **Create New Instance** button
2. Choose your plan tier (Starter, Professional, or Enterprise)
3. Select your preferred region for data residency
4. Enter a name for your instance (e.g., "Production" or "Development")
5. Click **Create Instance**

Your instance will be provisioned within 2-3 minutes.

## Step 2: Access the Admin Console

Once your instance is ready:

1. Click on your instance name in the dashboard
2. Click **Open Admin Console**
3. Log in with your initial admin credentials (sent to your email)

> **Security Note:** Change your admin password immediately after first login.

## Step 3: Create Your First Realm

Realms are isolated environments within Keycloak. Create one for your application:

1. Hover over the realm dropdown (shows "Master" by default)
2. Click **Create Realm**
3. Enter a realm name (e.g., "my-app")
4. Click **Create**

```json
{
  "realm": "my-app",
  "enabled": true,
  "sslRequired": "external",
  "registrationAllowed": true
}
```

## Step 4: Register Your Application

Create a client to represent your application:

1. Navigate to **Clients** in the left menu
2. Click **Create client**
3. Configure your client:
   - **Client ID**: `my-web-app`
   - **Client Protocol**: `openid-connect`
   - **Root URL**: `https://your-app.example.com`
4. Click **Save**

### Configure Client Settings

After creation, configure these important settings:

| Setting | Value | Description |
|---------|-------|-------------|
| Access Type | confidential | For server-side apps |
| Valid Redirect URIs | `https://your-app.example.com/*` | Where to redirect after login |
| Web Origins | `https://your-app.example.com` | CORS configuration |

## Step 5: Create a Test User

Add a user to test authentication:

1. Go to **Users** in the left menu
2. Click **Add user**
3. Fill in the details:
   - **Username**: `testuser`
   - **Email**: `testuser@example.com`
   - **Email Verified**: ON
4. Click **Save**

### Set User Password

1. Go to the **Credentials** tab
2. Click **Set password**
3. Enter a password and confirm
4. Set **Temporary** to OFF (or ON if you want to force a change)
5. Click **Save**

## Step 6: Test the Login

Test your configuration using the Keycloak account console:

```
https://your-instance.iam-ondemand.com/realms/my-app/account
```

Log in with your test user credentials to verify everything works.

## Step 7: Integrate with Your Application

Use the OpenID Connect endpoints to integrate with your application:

### Discovery Endpoint

```
https://your-instance.iam-ondemand.com/realms/my-app/.well-known/openid-configuration
```

### Example: Node.js Integration

```javascript
const Keycloak = require('keycloak-connect');

const keycloakConfig = {
  realm: 'my-app',
  'auth-server-url': 'https://your-instance.iam-ondemand.com/',
  'ssl-required': 'external',
  resource: 'my-web-app',
  'confidential-port': 0
};

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

app.use(keycloak.middleware());
```

## Next Steps

Congratulations! You have a working IAM OnDemand instance. Here's what to explore next:

- [Configuration Guide](/wiki/getting-started/configuration/) - Customize themes, emails, and security
- [User Management](/wiki/user-guide/users/) - Manage users at scale
- [OAuth2/OIDC Integration](/wiki/integration/oauth-oidc/) - Deep dive into authentication flows

## Troubleshooting

Having issues? Check these common problems:

| Issue | Solution |
|-------|----------|
| Can't access admin console | Check your email for initial credentials |
| Redirect URI mismatch | Verify URIs in client configuration |
| CORS errors | Add your app's origin to Web Origins |

For more help, see our [Troubleshooting Guide](/wiki/troubleshooting/common-issues/) or [contact support](mailto:support@iam-ondemand.com).

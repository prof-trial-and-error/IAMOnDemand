---
title: "Quick Start Guide"
description: "Get your IAM On Demand Keycloak instance up and running in under 10 minutes."
order: 1
last_modified_at: 2025-01-15
---

Welcome to IAM On Demand! This guide will help you get your managed Keycloak instance set up and connected to your first application.

## Prerequisites

Before you begin, make sure you have:

- An IAM On Demand account ([Sign up here](/signup/))
- A web application to connect (we'll use a sample app if you don't have one)
- Basic understanding of OAuth 2.0 / OpenID Connect (helpful but not required)

## Step 1: Create Your Keycloak Instance

1. Log in to your [IAM On Demand dashboard](/login/)
2. Click **"Create New Instance"**
3. Choose your hosting tier (Basic, Business, or Enterprise)
4. Select your preferred region
5. Click **"Deploy"**

Your Keycloak instance will be ready in approximately 2-3 minutes.

## Step 2: Access Your Admin Console

Once deployed, you'll receive:

- **Admin Console URL**: `https://your-instance.iam-ondemand.com/admin`
- **Admin Username**: Your email address
- **Temporary Password**: Sent to your email

Log in and set a new secure password when prompted.

## Step 3: Create Your First Realm

We recommend creating a separate realm for each application or environment:

```
1. Click the dropdown in the top-left (shows "Master")
2. Click "Create Realm"
3. Name it (e.g., "production" or "my-app")
4. Click "Create"
```

## Step 4: Register Your Application

To connect your application:

1. Navigate to **Clients** → **Create client**
2. Configure the client:
   - **Client ID**: A unique identifier (e.g., `my-web-app`)
   - **Client Protocol**: OpenID Connect
   - **Root URL**: Your application's base URL
3. In the **Settings** tab, configure:
   - **Valid Redirect URIs**: Where users return after login
   - **Web Origins**: For CORS (usually same as your app domain)
4. Save the configuration

## Step 5: Get Your Client Credentials

For server-side applications, you'll need credentials:

1. Go to your client's **Credentials** tab
2. Copy the **Client Secret**
3. Store it securely (never commit to version control!)

## Step 6: Test the Connection

Use our test endpoint to verify everything works:

```bash
curl -X POST \
  https://your-instance.iam-ondemand.com/realms/YOUR_REALM/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

A successful response returns an access token.

## Next Steps

Now that you're set up, explore these topics:

- [Adding Users and Groups](/docs/users-and-groups/)
- [Configuring Social Login](/docs/social-login/)
- [Setting Up Multi-Factor Authentication](/docs/mfa/)
- [API Integration Guide](/docs/api-integration/)

## Need Help?

- **Documentation**: You're reading it!
- **Email Support**: support@iam-ondemand.com
- **Business/Enterprise**: Priority support via your dedicated channel

---

**Tip**: Bookmark your Admin Console URL for quick access. You can also add it to your browser's password manager for convenience.

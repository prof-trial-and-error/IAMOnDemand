---
title: Managing Realms
description: Learn how to create, configure, and manage realms in your IAM OnDemand Keycloak instance.
category: user-guide
order: 11
lang: en
page_id: wiki-realms
---

## What is a Realm?

A realm in Keycloak is a space where you manage a set of users, credentials, roles, and groups. Realms are isolated from one another and can only manage and authenticate the users that they control.

## Creating a Realm

### Via Admin Console

1. Log into your Keycloak Admin Console
2. Hover over the realm dropdown (top-left, shows "Master")
3. Click **Create Realm**
4. Enter the realm name
5. Click **Create**

### Via Admin API

```bash
curl -X POST \
  https://your-instance.iam-ondemand.com/admin/realms \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "realm": "my-new-realm",
    "enabled": true
  }'
```

## Realm Settings

### General Tab

Configure basic realm properties:

| Setting | Description |
|---------|-------------|
| Display Name | Human-readable name shown to users |
| HTML Display Name | Display name with HTML formatting |
| Frontend URL | Override the frontend URL for this realm |
| Require SSL | SSL requirements (none, external, all) |

### Login Tab

Control login behavior and user registration:

- User registration enabled/disabled
- Email as username
- Forgot password
- Remember me
- Email verification
- Login with email

### Keys Tab

Manage cryptographic keys for:

- JWT signing (RS256, ES256, etc.)
- SAML assertions
- Cookie encryption

## Realm Roles

### Creating Roles

1. Navigate to **Realm roles**
2. Click **Create role**
3. Enter role name and description
4. Save

### Composite Roles

Combine multiple roles into one:

```json
{
  "name": "admin",
  "composite": true,
  "composites": {
    "realm": ["user", "manager"]
  }
}
```

## Default Groups and Roles

### Default Roles

Automatically assign roles to new users:

1. Go to **Realm settings > User registration**
2. Configure **Default roles**

### Default Groups

Automatically add users to groups:

1. Go to **Realm settings > User registration**
2. Configure **Default groups**

## Realm Events

### User Events

Track user activities:

- Login/logout events
- Registration
- Password changes
- Account updates

### Admin Events

Track administrative actions:

- User creation/deletion
- Role assignments
- Client configuration changes

## Best Practices

### Realm Organization

- Create separate realms for different environments (dev, staging, prod)
- Use meaningful realm names
- Document realm purposes

### Security

- Always enable SSL requirement for production
- Configure appropriate session timeouts
- Enable audit logging

## Next Steps

- [User Management](/wiki/user-guide/users/) - Manage users in your realms
- [Authentication Flows](/wiki/user-guide/authentication/) - Configure authentication
- [Security Best Practices](/wiki/administration/security/) - Harden your realms

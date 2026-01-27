---
title: REST API Reference
description: Complete reference for the Keycloak Admin REST API available through IAM OnDemand.
category: api
order: 40
lang: en
page_id: wiki-rest-api
---

## Overview

The Keycloak Admin REST API provides programmatic access to manage realms, users, clients, and all other Keycloak resources. IAM OnDemand exposes the full Admin API for your instances.

## Base URL

All API requests use the base URL:

```
https://your-instance.iam-ondemand.com/admin/realms/{realm}
```

## Authentication

### Obtaining Access Token

Get an admin access token:

```bash
curl -X POST \
  https://your-instance.iam-ondemand.com/realms/master/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=your-password"
```

Response:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "expires_in": 300,
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Using the Token

Include the token in all requests:

```bash
curl -X GET \
  https://your-instance.iam-ondemand.com/admin/realms/my-realm/users \
  -H "Authorization: Bearer {access_token}"
```

## User Management

### List Users

```bash
GET /admin/realms/{realm}/users
```

Query parameters:

| Parameter | Description |
|-----------|-------------|
| search | Search by username, email, name |
| username | Exact username match |
| email | Exact email match |
| first | Pagination offset |
| max | Maximum results (default 100) |

### Get User

```bash
GET /admin/realms/{realm}/users/{user-id}
```

### Create User

```bash
POST /admin/realms/{realm}/users
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "enabled": true,
  "emailVerified": true,
  "firstName": "John",
  "lastName": "Doe",
  "attributes": {
    "department": ["Engineering"]
  }
}
```

### Update User

```bash
PUT /admin/realms/{realm}/users/{user-id}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

### Delete User

```bash
DELETE /admin/realms/{realm}/users/{user-id}
```

### Reset Password

```bash
PUT /admin/realms/{realm}/users/{user-id}/reset-password
Content-Type: application/json

{
  "type": "password",
  "value": "newPassword123",
  "temporary": true
}
```

## Client Management

### List Clients

```bash
GET /admin/realms/{realm}/clients
```

### Get Client

```bash
GET /admin/realms/{realm}/clients/{client-id}
```

### Create Client

```bash
POST /admin/realms/{realm}/clients
Content-Type: application/json

{
  "clientId": "my-new-client",
  "enabled": true,
  "protocol": "openid-connect",
  "publicClient": false,
  "redirectUris": ["https://app.example.com/*"],
  "webOrigins": ["https://app.example.com"]
}
```

### Get Client Secret

```bash
GET /admin/realms/{realm}/clients/{client-id}/client-secret
```

### Regenerate Client Secret

```bash
POST /admin/realms/{realm}/clients/{client-id}/client-secret
```

## Role Management

### List Realm Roles

```bash
GET /admin/realms/{realm}/roles
```

### Create Role

```bash
POST /admin/realms/{realm}/roles
Content-Type: application/json

{
  "name": "my-role",
  "description": "Custom role description"
}
```

### Assign Role to User

```bash
POST /admin/realms/{realm}/users/{user-id}/role-mappings/realm
Content-Type: application/json

[
  {
    "id": "role-uuid",
    "name": "my-role"
  }
]
```

## Group Management

### List Groups

```bash
GET /admin/realms/{realm}/groups
```

### Create Group

```bash
POST /admin/realms/{realm}/groups
Content-Type: application/json

{
  "name": "my-group"
}
```

### Add User to Group

```bash
PUT /admin/realms/{realm}/users/{user-id}/groups/{group-id}
```

## Realm Management

### Get Realm

```bash
GET /admin/realms/{realm}
```

### Update Realm

```bash
PUT /admin/realms/{realm}
Content-Type: application/json

{
  "displayName": "My Application",
  "sslRequired": "external"
}
```

### Export Realm

```bash
GET /admin/realms/{realm}/partial-export?exportClients=true&exportGroupsAndRoles=true
```

## Events

### Get User Events

```bash
GET /admin/realms/{realm}/events
```

Query parameters:

| Parameter | Description |
|-----------|-------------|
| type | Event type (LOGIN, LOGOUT, etc.) |
| user | User ID |
| dateFrom | Start date (ISO 8601) |
| dateTo | End date (ISO 8601) |
| first | Offset |
| max | Maximum results |

### Get Admin Events

```bash
GET /admin/realms/{realm}/admin-events
```

## Error Handling

### Error Response Format

```json
{
  "error": "error_code",
  "error_description": "Human readable description"
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (success) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict (duplicate) |

## Rate Limiting

API requests are subject to rate limiting:

| Tier | Requests/minute |
|------|-----------------|
| Starter | 100 |
| Professional | 500 |
| Enterprise | Custom |

## Best Practices

- Use service accounts for API access
- Store credentials securely
- Implement token refresh
- Handle rate limiting gracefully
- Log API errors for debugging

## Next Steps

- [Admin CLI](/wiki/api/admin-cli/) - Command-line interface
- [OAuth2/OIDC](/wiki/integration/oauth-oidc/) - Application integration
- [User Management](/wiki/user-guide/users/) - User administration

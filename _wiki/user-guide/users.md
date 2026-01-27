---
title: User Management
description: Learn how to create, manage, and organize users in your IAM OnDemand Keycloak instance.
category: user-guide
order: 12
lang: en
page_id: wiki-users
---

## Overview

User management is a core function of Keycloak. This guide covers creating users, managing credentials, assigning roles, and organizing users into groups.

## Creating Users

### Via Admin Console

1. Navigate to **Users** in the left menu
2. Click **Add user**
3. Fill in the required fields:
   - **Username** (required)
   - **Email**
   - **First Name**
   - **Last Name**
4. Toggle **Email Verified** if needed
5. Click **Create**

### Via Admin API

```bash
curl -X POST \
  https://your-instance.iam-ondemand.com/admin/realms/{realm}/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "enabled": true,
    "emailVerified": true
  }'
```

## Managing Credentials

### Setting Passwords

1. Open user details
2. Go to **Credentials** tab
3. Click **Set password**
4. Enter and confirm password
5. Toggle **Temporary** (forces change on first login)
6. Click **Save**

### Password Reset

Send a password reset email:

1. Open user details
2. Click **Credentials** tab
3. Click **Reset password**
4. Select notification method

### Credential Types

Keycloak supports multiple credential types:

| Type | Description |
|------|-------------|
| Password | Standard password authentication |
| OTP | Time-based one-time passwords |
| WebAuthn | FIDO2/WebAuthn security keys |

## User Attributes

### Standard Attributes

Built-in user attributes:

- Username
- Email
- First Name
- Last Name
- Enabled status

### Custom Attributes

Add custom attributes for your needs:

1. Open user details
2. Go to **Attributes** tab
3. Add key-value pairs
4. Click **Save**

Example attributes:

```json
{
  "department": "Engineering",
  "employeeId": "EMP-12345",
  "phoneNumber": "+1-555-0123"
}
```

## Groups

### Creating Groups

1. Navigate to **Groups**
2. Click **Create group**
3. Enter group name
4. Click **Create**

### Nested Groups

Create hierarchical group structures:

```
/Organization
  /Engineering
    /Frontend
    /Backend
  /Marketing
  /Sales
```

### Assigning Users to Groups

1. Open user details
2. Go to **Groups** tab
3. Click **Join Group**
4. Select groups
5. Click **Join**

## Roles

### Realm Roles

Assign realm-level roles:

1. Open user details
2. Go to **Role mapping** tab
3. Click **Assign role**
4. Select roles from available list
5. Click **Assign**

### Client Roles

Assign application-specific roles:

1. Filter by client in Role mapping
2. Select client roles
3. Assign to user

## User Federation

### LDAP/Active Directory

Connect to existing user directories:

1. Go to **User federation**
2. Add LDAP provider
3. Configure connection settings
4. Map LDAP attributes

### Sync Options

| Mode | Description |
|------|-------------|
| Full Sync | Import all users |
| Changed Users | Only sync modified users |
| On-Demand | Sync when user logs in |

## Bulk Operations

### Import Users

Import users from JSON:

```json
{
  "users": [
    {
      "username": "user1",
      "email": "user1@example.com",
      "enabled": true,
      "credentials": [{
        "type": "password",
        "value": "temporary123",
        "temporary": true
      }]
    }
  ]
}
```

### Export Users

Export realm users:

1. Go to **Realm settings**
2. Click **Action > Partial export**
3. Select users to include
4. Download JSON

## Best Practices

### Security

- Require email verification for self-registered users
- Use temporary passwords for admin-created accounts
- Implement MFA for sensitive applications
- Regular review of user access

### Organization

- Use groups for role-based access control
- Implement naming conventions for users and groups
- Document custom attributes

## Next Steps

- [Authentication Flows](/wiki/user-guide/authentication/) - Configure how users authenticate
- [LDAP Integration](/wiki/integration/ldap/) - Connect to directory services
- [Security Best Practices](/wiki/administration/security/) - Secure your user base

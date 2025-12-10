---
title: "Users and Groups"
description: "Learn how to create and manage users, groups, and roles in your Keycloak instance."
order: 2
last_modified_at: 2025-01-15
---

Managing users and groups is a fundamental part of identity management. This guide covers how to create, organize, and manage users in your IAM On Demand Keycloak instance.

## Understanding Users

Users in Keycloak represent people who can authenticate to your applications. Each user can have:

- **Credentials**: Passwords, OTP devices, security keys
- **Attributes**: Custom data like department, employee ID, etc.
- **Role mappings**: Permissions assigned directly or via groups
- **Group memberships**: Organizational groupings

## Creating Users

### Via Admin Console

1. Navigate to **Users** in the left sidebar
2. Click **Add user**
3. Fill in the required fields:
   - **Username**: Required, must be unique
   - **Email**: Recommended for password recovery
   - **First Name** / **Last Name**: Optional but recommended
4. Click **Create**

### Setting User Credentials

After creating a user:

1. Go to the **Credentials** tab
2. Click **Set password**
3. Enter and confirm the password
4. Toggle **Temporary** if the user should change it on first login
5. Click **Save**

## Working with Groups

Groups help organize users and assign permissions efficiently. Instead of assigning roles to individual users, assign them to groups.

### Creating a Group

1. Navigate to **Groups** in the left sidebar
2. Click **Create group**
3. Enter a group name (e.g., "Developers", "Admins")
4. Click **Create**

### Group Hierarchy

Groups can be nested to create hierarchies:

```
Organization
├── Engineering
│   ├── Frontend Team
│   └── Backend Team
├── Marketing
└── Finance
```

Users inherit roles from parent groups automatically.

### Adding Users to Groups

1. Open the user's profile
2. Go to the **Groups** tab
3. Click **Join Group**
4. Select the group(s) to add
5. Click **Join**

## Role Management

Roles define what users can do. Keycloak supports two types:

### Realm Roles

Apply across all clients in the realm:

1. Navigate to **Realm roles**
2. Click **Create role**
3. Enter a name and description
4. Save

### Client Roles

Specific to a single application:

1. Navigate to **Clients** → Your client
2. Go to the **Roles** tab
3. Click **Create role**

## Assigning Roles

### To Users Directly

1. Open user profile
2. Go to **Role mapping** tab
3. Click **Assign role**
4. Select roles and click **Assign**

### To Groups (Recommended)

1. Open group details
2. Go to **Role mapping** tab
3. Assign roles
4. All group members inherit these roles

## User Federation

Connect to existing user directories:

- **LDAP**: Active Directory, OpenLDAP
- **Kerberos**: Windows domain authentication
- **Custom**: Build your own with SPI

[Learn more about User Federation →](/docs/user-federation/)

## Best Practices

1. **Use groups over direct role assignments** - Easier to manage at scale
2. **Create a group hierarchy** that mirrors your organization
3. **Use meaningful role names** - `app-admin` not `role1`
4. **Enable email verification** for self-registered users
5. **Set password policies** in Realm Settings → Authentication

## API Access

Manage users programmatically via the Admin REST API:

```bash
# Get all users
curl -X GET \
  "https://your-instance.iam-ondemand.com/admin/realms/YOUR_REALM/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Create a user
curl -X POST \
  "https://your-instance.iam-ondemand.com/admin/realms/YOUR_REALM/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "enabled": true}'
```

---

**Next**: [Configuring Social Login →](/docs/social-login/)

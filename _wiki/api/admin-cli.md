---
title: Admin CLI
description: Use the Keycloak Admin CLI (kcadm) to manage your IAM OnDemand instance from the command line.
category: api
order: 41
lang: en
page_id: wiki-admin-cli
---

## Overview

The Keycloak Admin CLI (`kcadm.sh` / `kcadm.bat`) provides a command-line interface for administering your Keycloak instance. It's useful for scripting, automation, and quick administrative tasks.

## Installation

### Download CLI Tools

Download from the Keycloak website or use the Docker image:

```bash
# Using Docker
docker run --rm -it quay.io/keycloak/keycloak:latest \
  /opt/keycloak/bin/kcadm.sh --help
```

### Direct Installation

Extract from Keycloak distribution:

```bash
tar -xzf keycloak-*.tar.gz
cd keycloak-*/bin
./kcadm.sh --help
```

## Authentication

### Login

Authenticate with your IAM OnDemand instance:

```bash
kcadm.sh config credentials \
  --server https://your-instance.iam-ondemand.com \
  --realm master \
  --user admin \
  --password your-password
```

### Using Client Credentials

For service accounts:

```bash
kcadm.sh config credentials \
  --server https://your-instance.iam-ondemand.com \
  --realm master \
  --client admin-cli \
  --secret client-secret
```

## User Management

### List Users

```bash
kcadm.sh get users -r my-realm
```

### Search Users

```bash
kcadm.sh get users -r my-realm -q search=john
kcadm.sh get users -r my-realm -q email=user@example.com
```

### Create User

```bash
kcadm.sh create users -r my-realm \
  -s username=newuser \
  -s email=user@example.com \
  -s enabled=true \
  -s emailVerified=true
```

### Update User

```bash
kcadm.sh update users/{user-id} -r my-realm \
  -s firstName=John \
  -s lastName=Doe
```

### Delete User

```bash
kcadm.sh delete users/{user-id} -r my-realm
```

### Set Password

```bash
kcadm.sh set-password -r my-realm \
  --username newuser \
  --new-password "SecurePass123!"
```

### Reset Password (Temporary)

```bash
kcadm.sh set-password -r my-realm \
  --username newuser \
  --new-password "TempPass123!" \
  --temporary
```

## Client Management

### List Clients

```bash
kcadm.sh get clients -r my-realm
```

### Create Client

```bash
kcadm.sh create clients -r my-realm \
  -s clientId=my-app \
  -s enabled=true \
  -s protocol=openid-connect \
  -s publicClient=false \
  -s 'redirectUris=["https://app.example.com/*"]'
```

### Get Client Secret

```bash
kcadm.sh get clients/{client-id}/client-secret -r my-realm
```

### Regenerate Secret

```bash
kcadm.sh create clients/{client-id}/client-secret -r my-realm
```

## Role Management

### List Roles

```bash
kcadm.sh get roles -r my-realm
```

### Create Role

```bash
kcadm.sh create roles -r my-realm \
  -s name=my-role \
  -s description="My custom role"
```

### Assign Role to User

```bash
kcadm.sh add-roles -r my-realm \
  --uusername newuser \
  --rolename my-role
```

### Remove Role from User

```bash
kcadm.sh remove-roles -r my-realm \
  --uusername newuser \
  --rolename my-role
```

## Group Management

### List Groups

```bash
kcadm.sh get groups -r my-realm
```

### Create Group

```bash
kcadm.sh create groups -r my-realm \
  -s name=my-group
```

### Add User to Group

```bash
kcadm.sh update users/{user-id}/groups/{group-id} -r my-realm
```

## Realm Management

### Get Realm Configuration

```bash
kcadm.sh get realms/my-realm
```

### Update Realm

```bash
kcadm.sh update realms/my-realm \
  -s displayName="My Application" \
  -s sslRequired=external
```

### Export Realm

```bash
kcadm.sh get realms/my-realm \
  --fields 'realm,enabled,clients,roles,users' > realm-export.json
```

### Import Realm

```bash
kcadm.sh create realms -f realm-import.json
```

## Common Options

### Output Format

```bash
# JSON output (default)
kcadm.sh get users -r my-realm

# Specific fields only
kcadm.sh get users -r my-realm --fields id,username,email

# Count only
kcadm.sh get users -r my-realm -c
```

### Pagination

```bash
kcadm.sh get users -r my-realm --offset 0 --limit 100
```

### Filtering

```bash
kcadm.sh get users -r my-realm -q enabled=true
kcadm.sh get clients -r my-realm -q clientId=my-app
```

## Scripting Examples

### Bulk User Creation

```bash
#!/bin/bash
while IFS=, read -r username email; do
  kcadm.sh create users -r my-realm \
    -s username="$username" \
    -s email="$email" \
    -s enabled=true
done < users.csv
```

### Disable Inactive Users

```bash
#!/bin/bash
# Get users who haven't logged in for 90 days
users=$(kcadm.sh get users -r my-realm --fields id,username)

for user_id in $(echo "$users" | jq -r '.[].id'); do
  kcadm.sh update users/$user_id -r my-realm -s enabled=false
done
```

### Export All Clients

```bash
#!/bin/bash
kcadm.sh get clients -r my-realm > clients-backup.json
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Authentication failed | Check credentials and server URL |
| Session expired | Re-run config credentials |
| Permission denied | Verify user has admin role |

### Debug Mode

Enable verbose output:

```bash
kcadm.sh get users -r my-realm --debug
```

## Best Practices

- Use service accounts for scripts
- Store credentials securely
- Implement error handling in scripts
- Test scripts in development first
- Version control your scripts

## Next Steps

- [REST API Reference](/wiki/api/rest-api/) - HTTP API documentation
- [User Management](/wiki/user-guide/users/) - User administration concepts
- [Security Best Practices](/wiki/administration/security/) - Secure CLI usage

---
title: LDAP / Active Directory
description: Connect IAM OnDemand to LDAP directories and Active Directory for user federation.
category: integration
order: 32
lang: en
page_id: wiki-ldap
---

## Overview

User federation allows Keycloak to authenticate users against external user directories like LDAP or Active Directory, while still managing authorization centrally.

## Adding LDAP Provider

### Basic Configuration

1. Go to **User federation**
2. Click **Add LDAP provider**
3. Configure connection:

| Setting | Description |
|---------|-------------|
| Vendor | Generic, Active Directory, etc. |
| Connection URL | ldap://server:389 or ldaps://server:636 |
| Users DN | ou=users,dc=example,dc=com |
| Bind DN | cn=admin,dc=example,dc=com |
| Bind Credential | Admin password |

### Testing Connection

Click **Test connection** and **Test authentication** to verify settings.

## Active Directory Setup

### Recommended Settings

```yaml
Vendor: Active Directory
Connection URL: ldaps://ad.example.com:636
Users DN: CN=Users,DC=example,DC=com
Bind DN: CN=ServiceAccount,CN=Users,DC=example,DC=com
User Object Classes: person, organizationalPerson, user
Username LDAP Attribute: sAMAccountName
RDN LDAP Attribute: cn
UUID LDAP Attribute: objectGUID
```

### Service Account Permissions

The bind account needs:

- Read access to user objects
- Read access to group objects
- No write access required (for basic setup)

## Attribute Mapping

### Default Mappings

| Keycloak Attribute | LDAP Attribute |
|-------------------|----------------|
| username | sAMAccountName (AD) / uid (LDAP) |
| email | mail |
| firstName | givenName |
| lastName | sn |

### Custom Mappers

Add custom attribute mappings:

1. Go to LDAP provider **Mappers**
2. Click **Add mapper**
3. Configure:

```yaml
Name: department
Mapper Type: user-attribute-ldap-mapper
User Model Attribute: department
LDAP Attribute: department
```

## Synchronization

### Sync Modes

| Mode | Description |
|------|-------------|
| Periodic Full | Complete sync on schedule |
| Periodic Changed | Only sync modified users |
| On Login | Sync user on each login |

### Full Sync

Trigger manual full sync:

1. Go to LDAP provider
2. Click **Synchronize all users**

### Changed Users Sync

Sync only modified users:

1. Click **Synchronize changed users**

### Sync Settings

```yaml
Periodic Full Sync: ON
Full Sync Period: 86400 (daily)
Periodic Changed Users Sync: ON
Changed Users Sync Period: 300 (5 minutes)
```

## Group Mapping

### LDAP Group Mapper

Map LDAP groups to Keycloak:

1. Add **group-ldap-mapper**
2. Configure:

```yaml
LDAP Groups DN: ou=groups,dc=example,dc=com
Group Name LDAP Attribute: cn
Group Object Classes: groupOfNames
Membership LDAP Attribute: member
Membership Attribute Type: DN
```

### Role Mapping

Map LDAP groups to Keycloak roles:

1. Add **role-ldap-mapper**
2. Configure group-to-role mappings

## Advanced Configuration

### Connection Pooling

For high-volume environments:

```yaml
Connection Pooling: ON
Max Pool Size: 10
Connection Timeout: 10000
```

### Kerberos Integration

Enable Kerberos with LDAP:

```yaml
Allow Kerberos Authentication: ON
Kerberos Realm: EXAMPLE.COM
Server Principal: HTTP/keycloak.example.com@EXAMPLE.COM
KeyTab: /etc/keycloak/keycloak.keytab
```

### Pagination

For large directories:

```yaml
Pagination: ON
Batch Size for Synchronization: 1000
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Connection refused | Check network/firewall |
| Invalid credentials | Verify bind DN and password |
| Users not syncing | Check Users DN path |
| SSL certificate errors | Import CA certificate |

### Debug Steps

1. Test connection from server
2. Verify bind credentials with ldapsearch
3. Check user search filter
4. Review server logs

```bash
# Test LDAP connection
ldapsearch -x -H ldap://server:389 \
  -D "cn=admin,dc=example,dc=com" \
  -W -b "ou=users,dc=example,dc=com"
```

## Best Practices

- Use LDAPS (SSL) in production
- Create dedicated service account
- Implement connection pooling
- Monitor sync status
- Document attribute mappings

## Next Steps

- [User Management](/wiki/user-guide/users/) - Managing federated users
- [OAuth2/OIDC](/wiki/integration/oauth-oidc/) - Application integration
- [Security Best Practices](/wiki/administration/security/) - Secure federation

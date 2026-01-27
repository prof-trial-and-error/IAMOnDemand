---
title: Security Best Practices
description: Implement security best practices to protect your IAM OnDemand Keycloak instance.
category: administration
order: 22
lang: en
page_id: wiki-security
---

## Overview

Security is paramount for identity management systems. This guide covers essential security configurations and best practices for your IAM OnDemand instance.

## Authentication Security

### Password Policies

Implement strong password requirements:

```
length(12)              # Minimum length
digits(1)               # At least 1 number
lowerCase(1)            # At least 1 lowercase
upperCase(1)            # At least 1 uppercase
specialChars(1)         # At least 1 special char
notUsername             # Cannot be username
passwordHistory(5)      # Cannot reuse last 5
forceExpiredPasswordChange(90)  # Expire after 90 days
```

### Multi-Factor Authentication

Always enable MFA for:

- Admin accounts (Required)
- Privileged users (Required)
- All users (Recommended)

### Brute Force Protection

Configure in **Realm settings > Security Defenses**:

| Setting | Recommended |
|---------|-------------|
| Enabled | Yes |
| Permanent Lockout | No |
| Max Login Failures | 5 |
| Wait Increment | 60 seconds |
| Max Wait | 900 seconds |

## Session Security

### Session Timeouts

Configure appropriate timeouts:

| Setting | Recommended |
|---------|-------------|
| SSO Session Idle | 15-30 minutes |
| SSO Session Max | 8 hours |
| Access Token | 5 minutes |
| Refresh Token | 30 days |

### Session Management

- Enable "Revoke Refresh Token" for sensitive apps
- Use sliding sessions where appropriate
- Monitor active sessions

## Network Security

### SSL/TLS

- Always require HTTPS in production
- Use TLS 1.2 or higher
- Configure proper SSL termination

### CORS Configuration

Restrict origins:

```json
{
  "webOrigins": [
    "https://your-app.example.com",
    "https://admin.example.com"
  ]
}
```

### Security Headers

Configure in **Realm settings > Security Defenses > Headers**:

```
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-src 'self'
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

## Client Security

### Confidential Clients

For server-side applications:

- Use client secrets
- Enable PKCE (recommended)
- Restrict valid redirect URIs

### Public Clients

For SPAs and mobile apps:

- Always use PKCE
- Implement strict redirect URI validation
- Use short-lived tokens

## Admin Console Security

### Dedicated Admin Realm

Consider using the master realm only for administration:

- Create separate realms for applications
- Limit master realm access
- Audit admin activities

### Admin Account Protection

- Use unique admin usernames
- Require MFA for all admins
- Regular access reviews
- Audit all admin actions

## Audit and Compliance

### Event Logging

Enable comprehensive logging:

```yaml
User Events:
  - LOGIN, LOGIN_ERROR
  - LOGOUT
  - REGISTER
  - UPDATE_PASSWORD
  - VERIFY_EMAIL
  - CUSTOM_REQUIRED_ACTION

Admin Events:
  - CREATE, UPDATE, DELETE
  - Include Representations: Yes
```

### Regular Audits

- Review user access quarterly
- Audit role assignments
- Check for inactive accounts
- Monitor failed login attempts

## Incident Response

### Preparation

1. Document incident response procedures
2. Identify key contacts
3. Test recovery procedures

### Detection

- Monitor for unusual activity
- Set up alerts for security events
- Review logs regularly

### Response

1. Contain the incident
2. Investigate root cause
3. Remediate vulnerabilities
4. Document lessons learned

## Checklist

- [ ] Strong password policies enabled
- [ ] MFA required for admins
- [ ] Brute force protection configured
- [ ] SSL required for all connections
- [ ] Security headers configured
- [ ] Event logging enabled
- [ ] Regular backups verified
- [ ] Access reviews scheduled

## Next Steps

- [Monitoring](/wiki/administration/monitoring/) - Monitor security events
- [Backup & Recovery](/wiki/administration/backup-recovery/) - Data protection
- [Authentication Flows](/wiki/user-guide/authentication/) - Secure authentication

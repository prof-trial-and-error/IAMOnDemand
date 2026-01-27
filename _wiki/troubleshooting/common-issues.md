---
title: Common Issues
description: Solutions to common problems encountered with IAM OnDemand and Keycloak.
category: troubleshooting
order: 50
lang: en
page_id: wiki-common-issues
---

## Overview

This guide covers common issues and their solutions when working with IAM OnDemand. If you don't find your issue here, check our [FAQ](/wiki/troubleshooting/faq/) or contact support.

## Authentication Issues

### Unable to Login

**Symptoms:** Login fails with "Invalid username or password"

**Solutions:**
1. Verify username/email is correct
2. Check if user account is enabled
3. Verify email is verified (if required)
4. Check for account lockout (brute force protection)
5. Reset password if necessary

### Session Expired Too Quickly

**Symptoms:** Users are logged out frequently

**Solutions:**
1. Check SSO Session Idle timeout in realm settings
2. Verify Access Token lifespan
3. Review client session settings
4. Check for clock synchronization issues

### Redirect URI Mismatch

**Symptoms:** Error "Invalid redirect_uri"

**Solutions:**
```
1. Go to Clients > Your Client > Settings
2. Check Valid Redirect URIs
3. Ensure exact match including protocol (https://)
4. Check for trailing slashes
5. Use wildcards carefully (e.g., https://app.example.com/*)
```

## Token Issues

### Token Expired

**Symptoms:** API calls fail with 401 Unauthorized

**Solutions:**
1. Implement token refresh in your application
2. Check Access Token lifespan settings
3. Handle token expiry gracefully
4. Use refresh tokens when available

### Invalid Token Signature

**Symptoms:** "Invalid token signature" error

**Solutions:**
1. Ensure you're using the correct realm's public key
2. Check JWKS endpoint availability
3. Verify token hasn't been tampered with
4. Check for key rotation

### Token Contains Wrong Claims

**Symptoms:** Expected claims missing from token

**Solutions:**
1. Review client scope assignments
2. Check protocol mappers configuration
3. Verify scope is requested during authentication
4. Add custom protocol mappers if needed

## Connection Issues

### Cannot Access Admin Console

**Symptoms:** Admin console shows error or is unreachable

**Solutions:**
1. Check instance status in dashboard
2. Verify network connectivity
3. Clear browser cache and cookies
4. Try incognito/private browsing
5. Contact support if instance is down

### CORS Errors

**Symptoms:** Browser console shows CORS policy errors

**Solutions:**
```javascript
// Check client configuration
1. Go to Clients > Your Client > Settings
2. Add your origin to "Web Origins"
3. For development: Web Origins = "*" (not for production!)
4. For production: Web Origins = "https://your-app.example.com"
```

### SSL Certificate Errors

**Symptoms:** Certificate-related errors

**Solutions:**
1. Verify using HTTPS
2. Check certificate validity
3. Ensure intermediate certificates are included
4. Update client CA certificates

## User Federation Issues

### LDAP Users Not Syncing

**Symptoms:** Users from LDAP not appearing in Keycloak

**Solutions:**
1. Test LDAP connection
2. Verify Users DN path
3. Check bind credentials
4. Review user search filter
5. Trigger manual sync

### LDAP Connection Timeout

**Symptoms:** LDAP operations timeout

**Solutions:**
```yaml
1. Verify network connectivity to LDAP server
2. Check firewall rules
3. Increase connection timeout settings
4. Enable connection pooling
5. Use LDAPS (port 636) instead of LDAP (389)
```

## Performance Issues

### Slow Login Times

**Symptoms:** Login takes several seconds

**Solutions:**
1. Check network latency to Keycloak
2. Review authentication flow complexity
3. Optimize LDAP queries (if federated)
4. Check instance metrics for resource issues

### High Memory Usage

**Symptoms:** Instance showing high memory consumption

**Solutions:**
1. Review active session count
2. Check for memory leaks in custom code
3. Adjust session timeouts
4. Contact support for instance scaling

## Client Application Issues

### Infinite Login Loop

**Symptoms:** Application keeps redirecting to login

**Solutions:**
1. Check session cookie settings
2. Verify redirect URI configuration
3. Review browser cookie policies
4. Check for HTTPS/HTTP mismatch

### Logout Not Working

**Symptoms:** Users remain logged in after logout

**Solutions:**
```bash
# Single logout checklist:
1. Implement backchannel logout
2. Configure frontchannel logout URL
3. Clear application session
4. Use end_session_endpoint for logout
```

Example logout URL:
```
https://your-instance.iam-ondemand.com/realms/{realm}/protocol/openid-connect/logout?
  id_token_hint={id_token}&
  post_logout_redirect_uri=https://your-app.example.com
```

## SAML Issues

### SAML Assertion Invalid

**Symptoms:** SAML authentication fails

**Solutions:**
1. Check clock synchronization
2. Verify certificate configuration
3. Review NameID format settings
4. Check assertion validity period

### Attribute Mapping Issues

**Symptoms:** User attributes not passed correctly

**Solutions:**
1. Review SAML attribute mappers
2. Check attribute name format
3. Verify SP attribute requirements
4. Test with SAML debugging tools

## Debugging Tips

### Enable Debug Logging

Check events in Admin Console:
1. Go to Realm Settings > Events
2. Enable User Events
3. Enable Admin Events
4. Review Events menu for logs

### SAML Debugging

Use browser extensions:
- SAML-tracer (Firefox)
- SAML Chrome Panel

### Token Debugging

Decode JWT tokens at jwt.io (don't use for production tokens with sensitive data).

## Getting Help

If you can't resolve your issue:

1. Check our [FAQ](/wiki/troubleshooting/faq/)
2. Review [Keycloak documentation](https://www.keycloak.org/docs/latest/)
3. Contact support with:
   - Instance details
   - Error messages
   - Steps to reproduce
   - Relevant logs

## Next Steps

- [FAQ](/wiki/troubleshooting/faq/) - Frequently asked questions
- [Security Best Practices](/wiki/administration/security/) - Prevent issues
- [Monitoring](/wiki/administration/monitoring/) - Track problems early

---
title: SAML Integration
description: Configure SAML 2.0 for enterprise single sign-on with IAM OnDemand.
category: integration
order: 30
lang: en
page_id: wiki-saml
---

## Overview

SAML 2.0 (Security Assertion Markup Language) is widely used for enterprise single sign-on. IAM OnDemand supports acting as both a SAML Identity Provider (IdP) and Service Provider (SP).

## SAML Concepts

### Key Terms

| Term | Description |
|------|-------------|
| Identity Provider (IdP) | Authenticates users and issues assertions |
| Service Provider (SP) | Relies on IdP for authentication |
| Assertion | XML document with authentication/authorization data |
| Binding | How SAML messages are transported (POST, Redirect) |

## Keycloak as Identity Provider

### SAML Descriptor

Your realm's SAML metadata is available at:

```
https://your-instance.iam-ondemand.com/realms/{realm}/protocol/saml/descriptor
```

### Creating a SAML Client

1. Go to **Clients**
2. Click **Create client**
3. Select **SAML** protocol
4. Configure:

| Setting | Description |
|---------|-------------|
| Client ID | SP entity ID |
| Valid Redirect URIs | Assertion Consumer Service URLs |
| Master SAML Processing URL | Default ACS URL |

### Client Configuration

Essential SAML client settings:

```yaml
Sign Documents: On
Sign Assertions: On
Signature Algorithm: RSA_SHA256
SAML Signature Key Name: KEY_ID
Canonicalization Method: EXCLUSIVE
```

### Attribute Mapping

Map user attributes to SAML assertions:

1. Go to client **Mappers**
2. Add **User Attribute** mapper
3. Configure:
   - Name: email
   - User Attribute: email
   - SAML Attribute Name: email
   - SAML Attribute NameFormat: Basic

## Keycloak as Service Provider

### Adding SAML IdP

1. Go to **Identity Providers**
2. Click **Add provider > SAML v2.0**
3. Import or configure:

```yaml
Single Sign-On Service URL: https://idp.example.com/sso
Single Logout Service URL: https://idp.example.com/slo
NameID Policy Format: Persistent
Principal Type: Subject NameID
```

### IdP Metadata Import

Import external IdP metadata:

1. Click **Import from URL** or **Import from file**
2. Provide IdP metadata URL/file
3. Review and save

## Certificates

### Signing Certificates

Keycloak signs SAML documents with realm keys:

1. Go to **Realm settings > Keys**
2. View or rotate RSA keys
3. Download certificate for SP configuration

### Encryption

Enable assertion encryption:

1. In SAML client settings
2. Enable **Encrypt Assertions**
3. Configure SP's encryption certificate

## Common Integrations

### Microsoft Azure AD

1. Create Enterprise Application in Azure
2. Select SAML SSO
3. Configure with Keycloak SAML descriptor
4. Map attributes

### Google Workspace

1. Go to Security > SSO with third party IdP
2. Configure SSO URL from Keycloak
3. Upload Keycloak certificate
4. Set name ID format

### AWS SSO

1. Create SAML identity provider in IAM
2. Upload Keycloak metadata
3. Configure trust relationship
4. Map SAML attributes to AWS roles

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Invalid signature | Check certificate configuration |
| NameID mismatch | Verify NameID format settings |
| Assertion expired | Check server time synchronization |
| Redirect loop | Verify ACS URL configuration |

### Debug Logging

Enable SAML debug logging:

1. Go to **Realm settings > Events**
2. Enable **User Events**
3. Include SAML-related events

## Best Practices

- Always sign assertions
- Use SHA-256 or stronger algorithms
- Implement proper certificate rotation
- Test with SAML debugging tools
- Document attribute mappings

## Next Steps

- [OAuth2/OIDC](/wiki/integration/oauth-oidc/) - Modern protocol alternative
- [LDAP Integration](/wiki/integration/ldap/) - User federation
- [Security Best Practices](/wiki/administration/security/) - Secure your SAML setup

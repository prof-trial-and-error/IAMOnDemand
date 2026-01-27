---
title: Configuration Guide
description: Learn how to configure your IAM OnDemand instance including themes, email settings, and security options.
category: getting-started
order: 3
lang: en
page_id: wiki-configuration
---

## Overview

This guide covers the essential configuration options for your IAM OnDemand instance. We'll walk through realm settings, theme customization, email configuration, and security hardening.

## Realm Configuration

### General Settings

Access realm settings via **Realm Settings** in the admin console:

| Setting | Description | Recommended Value |
|---------|-------------|-------------------|
| Display Name | Shown on login pages | Your brand name |
| HTML Display Name | HTML-formatted name | `<strong>Your Brand</strong>` |
| Frontend URL | Override default URLs | Leave blank unless needed |
| Require SSL | SSL enforcement | `external requests` |

### Login Settings

Configure the login experience under **Realm Settings > Login**:

```yaml
User Registration: ON/OFF     # Allow self-registration
Email as Username: ON/OFF     # Use email instead of username
Edit Username: OFF            # Prevent username changes
Forgot Password: ON           # Enable password reset
Remember Me: ON               # Session persistence option
Verify Email: ON              # Require email verification
```

### Token Lifespans

Configure session and token timeouts under **Realm Settings > Tokens**:

| Token Type | Default | Recommended |
|------------|---------|-------------|
| Access Token | 5 min | 5-15 min |
| SSO Session Idle | 30 min | 15-60 min |
| SSO Session Max | 10 hours | 8-12 hours |
| Refresh Token Max | 0 (unlimited) | 30 days |

## Theme Customization

### Built-in Themes

IAM OnDemand includes several pre-built themes:

- **keycloak** - Default Keycloak theme
- **keycloak.v2** - Modern Keycloak theme
- **iam-ondemand** - Our branded theme

### Applying Themes

1. Go to **Realm Settings > Themes**
2. Select themes for each component:
   - Login Theme
   - Account Theme
   - Admin Console Theme
   - Email Theme

### Custom Themes

For custom branding, contact our support team to upload custom themes. Custom themes can include:

- Custom CSS styling
- Your logo and brand colors
- Modified login page layouts
- Localized messages

## Email Configuration

### SMTP Settings

Configure email under **Realm Settings > Email**:

```yaml
Host: smtp.your-provider.com
Port: 587
From: noreply@yourdomain.com
From Display Name: Your App
Enable SSL: OFF
Enable StartTLS: ON
Enable Authentication: ON
Username: your-smtp-user
Password: ********
```

### Testing Email

1. Configure SMTP settings
2. Click **Test Connection**
3. Enter a test email address
4. Verify you receive the test email

### Email Templates

Keycloak sends various emails that can be customized:

| Template | Trigger |
|----------|---------|
| Verify Email | User registration with email verification |
| Password Reset | Forgot password request |
| Execute Actions | Admin-initiated required actions |
| Event Alert | Security event notifications |

## Security Configuration

### Password Policies

Configure password requirements under **Authentication > Policies > Password Policy**:

Add policies by selecting from the dropdown:

```
length(8)                 # Minimum 8 characters
digits(1)                 # At least 1 digit
lowerCase(1)              # At least 1 lowercase
upperCase(1)              # At least 1 uppercase
specialChars(1)           # At least 1 special character
notUsername               # Cannot be username
passwordHistory(3)        # Cannot reuse last 3 passwords
```

### Brute Force Protection

Enable under **Realm Settings > Security Defenses > Brute Force Detection**:

| Setting | Recommended Value |
|---------|-------------------|
| Enabled | ON |
| Permanent Lockout | OFF |
| Max Login Failures | 5 |
| Wait Increment | 60 seconds |
| Max Wait | 900 seconds |

### Headers Security

Configure security headers under **Realm Settings > Security Defenses > Headers**:

```yaml
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-src 'self'; object-src 'none';
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

## Authentication Flows

### Default Flows

Keycloak provides configurable authentication flows:

- **Browser Flow** - Standard web login
- **Direct Grant Flow** - Resource owner password credentials
- **Registration Flow** - User self-registration
- **Reset Credentials** - Password reset process

### Customizing Flows

1. Go to **Authentication > Flows**
2. Select a flow to customize
3. Add/remove/reorder execution steps
4. Configure step requirements (Required, Alternative, Disabled)

### Adding MFA

To add TOTP (Time-based One-Time Password):

1. Go to **Authentication > Flows**
2. Select **Browser** flow
3. Add **OTP Form** execution
4. Set to **Required** or **Conditional**

## Client Configuration

### Confidential vs Public Clients

| Type | Use Case | Secret Required |
|------|----------|-----------------|
| Confidential | Server-side apps | Yes |
| Public | SPAs, Mobile apps | No |
| Bearer-only | API services | N/A |

### Client Scopes

Manage claims in tokens via **Client Scopes**:

```json
{
  "name": "custom-scope",
  "protocol": "openid-connect",
  "attributes": {
    "include.in.token.scope": "true",
    "display.on.consent.screen": "true"
  }
}
```

## Environment-Specific Settings

### Development Environment

```yaml
Require SSL: none
Session timeouts: Extended
Logging: Verbose
Rate limiting: Relaxed
```

### Production Environment

```yaml
Require SSL: external
Session timeouts: Standard
Logging: Warnings and errors
Rate limiting: Strict
Brute force: Enabled
```

## Next Steps

- [User Management](/wiki/user-guide/users/) - Manage users and groups
- [Security Best Practices](/wiki/administration/security/) - Harden your instance
- [OAuth2/OIDC Integration](/wiki/integration/oauth-oidc/) - Connect your applications

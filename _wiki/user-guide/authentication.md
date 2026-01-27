---
title: Authentication Flows
description: Configure and customize authentication flows in Keycloak for secure and flexible user authentication.
category: user-guide
order: 13
lang: en
page_id: wiki-authentication
---

## Understanding Authentication Flows

Authentication flows in Keycloak define the sequence of steps a user must complete to authenticate. Flows are highly customizable and can be tailored to your security requirements.

## Built-in Flows

### Browser Flow

The default flow for web browser authentication:

1. Cookie check (existing session)
2. Identity Provider Redirector (optional)
3. Username/Password Form
4. OTP Form (if configured)

### Direct Grant Flow

For resource owner password credentials (API-based authentication):

1. Username validation
2. Password validation
3. OTP validation (if required)

### Registration Flow

Controls user self-registration:

1. Registration form
2. Profile validation
3. Password policy
4. reCAPTCHA (optional)

### Reset Credentials Flow

Password reset process:

1. Username input
2. Email verification
3. Password reset form

## Customizing Flows

### Copying a Flow

1. Go to **Authentication > Flows**
2. Select the flow to copy
3. Click **Duplicate**
4. Enter a new name
5. Customize the copy

### Adding Executions

1. Select your custom flow
2. Click **Add step**
3. Choose an execution type
4. Configure requirements

### Execution Requirements

| Requirement | Behavior |
|-------------|----------|
| Required | Must pass to continue |
| Alternative | One of alternatives must pass |
| Conditional | Evaluated based on conditions |
| Disabled | Skipped entirely |

## Multi-Factor Authentication

### Enabling TOTP

1. Go to **Authentication > Policies**
2. Select **OTP Policy**
3. Configure settings:
   - OTP Type: totp
   - Algorithm: HmacSHA1
   - Digits: 6
   - Period: 30

### Requiring MFA

1. Edit your browser flow
2. Add **OTP Form** execution
3. Set requirement to **Required**

### Conditional MFA

Require MFA only in certain conditions:

```
Browser Flow
├── Cookie (Alternative)
├── Kerberos (Disabled)
└── Forms (Alternative)
    ├── Username Password Form (Required)
    └── Conditional OTP
        ├── Condition - User Configured
        └── OTP Form (Required)
```

## WebAuthn / FIDO2

### Enabling WebAuthn

1. Go to **Authentication > Policies**
2. Select **WebAuthn Policy**
3. Configure:
   - Relying Party Entity Name
   - Signature Algorithms
   - Attestation Conveyance Preference

### Passwordless Authentication

Create a passwordless flow:

1. Duplicate browser flow
2. Replace password form with WebAuthn authenticator
3. Set as default browser flow

## Identity Brokering

### Social Login

Add social identity providers:

1. Go to **Identity Providers**
2. Add provider (Google, GitHub, etc.)
3. Configure client credentials
4. Map user attributes

### SAML Identity Providers

Connect to enterprise SAML providers:

```xml
<EntityDescriptor entityID="https://idp.example.com">
  <IDPSSODescriptor>
    <SingleSignOnService
      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
      Location="https://idp.example.com/sso"/>
  </IDPSSODescriptor>
</EntityDescriptor>
```

## First Login Flow

### Post-Broker Login

Configure actions after IDP authentication:

1. Review profile
2. Create user if needed
3. Link accounts
4. Verify email

### Required Actions

Force users to complete actions:

- Update password
- Configure OTP
- Update profile
- Verify email
- Accept terms

## Authentication Policies

### Password Policy

Configure password requirements:

```
length(8)
digits(1)
upperCase(1)
lowerCase(1)
specialChars(1)
notUsername
passwordHistory(3)
```

### OTP Policy

Configure one-time password settings:

| Setting | Default | Description |
|---------|---------|-------------|
| Type | totp | Time-based OTP |
| Algorithm | HmacSHA1 | Hash algorithm |
| Digits | 6 | OTP length |
| Look Ahead | 1 | Clock skew tolerance |
| Period | 30 | Seconds per code |

## Best Practices

### Security

- Always require MFA for admin accounts
- Use conditional MFA for sensitive operations
- Implement account lockout policies
- Enable audit logging

### User Experience

- Allow password-based with optional MFA for regular users
- Provide multiple MFA options
- Clear error messages for failed authentication

## Next Steps

- [OAuth2/OIDC Integration](/wiki/integration/oauth-oidc/) - Integrate with your applications
- [Security Best Practices](/wiki/administration/security/) - Harden authentication
- [SAML Integration](/wiki/integration/saml/) - Enterprise SSO setup

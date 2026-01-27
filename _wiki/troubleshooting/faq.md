---
title: Frequently Asked Questions
description: Answers to frequently asked questions about IAM OnDemand and Keycloak.
category: troubleshooting
order: 51
lang: en
page_id: wiki-faq
---

## General Questions

### What is IAM OnDemand?

IAM OnDemand is a fully managed Keycloak hosting service. We handle infrastructure, updates, security, and scaling so you can focus on building applications with enterprise-grade identity management.

### What Keycloak version do you use?

We run the latest stable version of Keycloak and apply updates regularly. Enterprise customers can request specific version requirements.

### Can I migrate my existing Keycloak instance?

Yes! We support migration from self-hosted Keycloak installations. Contact our support team for migration assistance.

### What happens if my instance goes down?

Our infrastructure includes automatic failover and redundancy. We target 99.9% uptime for all production instances.

## Account & Billing

### How do I change my plan?

1. Log into your dashboard
2. Go to **Billing**
3. Click **Change Plan**
4. Select your new plan
5. Confirm the change

### What payment methods do you accept?

We accept all major credit cards, bank transfers (for annual plans), and can arrange invoicing for Enterprise customers.

### Is there a free trial?

Yes, we offer a 14-day free trial on all plans. No credit card required to start.

### How do I cancel my subscription?

Go to **Billing** in your dashboard and click **Cancel Subscription**. Your instance will remain active until the end of your billing period.

## Technical Questions

### Can I use custom themes?

Yes! Contact support to upload custom themes for login pages, account management, and emails.

### Do you support SAML and OIDC?

Yes, IAM OnDemand fully supports both SAML 2.0 and OpenID Connect protocols.

### Can I connect to my LDAP/Active Directory?

Yes, user federation with LDAP and Active Directory is fully supported.

### What regions are available?

We currently offer deployment in:
- US East (Virginia)
- US West (Oregon)
- EU West (Ireland)
- EU Central (Frankfurt)
- Asia Pacific (Singapore)

Enterprise customers can request additional regions.

### Do you support custom domains?

Yes, Professional and Enterprise plans support custom domains (e.g., auth.yourdomain.com).

### How do backups work?

We automatically backup your data daily with 30-day retention. Enterprise customers get additional backup options and longer retention.

### Can I export my data?

Yes, you can export realms, users, and configurations via the Admin Console or REST API.

## Security Questions

### Is my data encrypted?

Yes, all data is encrypted at rest (AES-256) and in transit (TLS 1.2+).

### Do you support MFA?

Yes, Keycloak supports multiple MFA options including TOTP, WebAuthn/FIDO2, and SMS (via custom providers).

### Are you SOC 2 compliant?

Enterprise customers can request compliance documentation. Contact sales for details.

### Where is my data stored?

Your data is stored in the region you selected during instance creation. We never transfer data between regions without your consent.

### How do you handle security vulnerabilities?

We actively monitor for vulnerabilities and apply security patches promptly. Critical patches are applied within 24-48 hours.

## Integration Questions

### Which frameworks/languages do you support?

Keycloak has adapters and libraries for:
- JavaScript (React, Angular, Vue)
- Java (Spring, Quarkus)
- Node.js
- Python
- Go
- .NET
- And many more via OIDC/SAML

### Can I use social login (Google, GitHub, etc.)?

Yes, Keycloak supports social login with Google, GitHub, Facebook, Microsoft, and many other providers.

### How do I integrate with my application?

See our integration guides:
- [OAuth2/OIDC Integration](/wiki/integration/oauth-oidc/)
- [SAML Integration](/wiki/integration/saml/)

### Do you provide SDKs?

We recommend using standard Keycloak adapters and OIDC/SAML libraries. See [Integration](/wiki/integration/oauth-oidc/) for examples.

## Limits & Quotas

### How many users can I have?

| Plan | Users |
|------|-------|
| Starter | Up to 1,000 |
| Professional | Up to 10,000 |
| Enterprise | Unlimited |

### How many realms can I create?

| Plan | Realms |
|------|--------|
| Starter | 3 |
| Professional | 10 |
| Enterprise | Unlimited |

### Are there API rate limits?

| Plan | Requests/minute |
|------|-----------------|
| Starter | 100 |
| Professional | 500 |
| Enterprise | Custom |

## Support

### How do I contact support?

- **Email:** support@iam-ondemand.com
- **Dashboard:** Click "Support" in your dashboard
- **Enterprise:** Dedicated Slack channel

### What are your support hours?

- **Starter/Professional:** Business hours (9 AM - 6 PM CET)
- **Enterprise:** 24/7 support

### Do you offer professional services?

Yes, we offer:
- Migration assistance
- Custom integration support
- Architecture review
- Training sessions

Contact sales@iam-ondemand.com for details.

## Still Have Questions?

If you didn't find your answer:

1. Check our [Common Issues](/wiki/troubleshooting/common-issues/) guide
2. Email support@iam-ondemand.com
3. Enterprise customers: Use your dedicated support channel

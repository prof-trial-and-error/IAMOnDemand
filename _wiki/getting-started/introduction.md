---
title: Introduction to IAM OnDemand
description: Learn about IAM OnDemand and how managed Keycloak hosting simplifies your identity and access management.
category: getting-started
order: 1
lang: en
page_id: wiki-introduction
---

## What is IAM OnDemand?

IAM OnDemand is a fully managed Keycloak hosting service that provides enterprise-grade identity and access management without the operational overhead. We handle the infrastructure, updates, and security so you can focus on building your applications.

### Key Benefits

- **Zero Infrastructure Management** - No servers to provision, no updates to apply, no scaling to worry about
- **Enterprise Security** - Built-in security features with regular security patches and compliance support
- **High Availability** - Multi-region deployment options with automatic failover
- **Rapid Deployment** - Get started in minutes, not days or weeks

## Why Choose Managed Keycloak?

Keycloak is a powerful open-source identity and access management solution, but running it in production requires significant expertise and resources:

| Self-Hosted | IAM OnDemand |
|-------------|--------------|
| Manual server provisioning | Instant deployment |
| DIY high availability | Built-in redundancy |
| Security patching burden | Automatic updates |
| Scaling challenges | Auto-scaling included |
| 24/7 monitoring needed | Managed monitoring |

## Core Features

### Single Sign-On (SSO)

Enable seamless authentication across all your applications with industry-standard protocols:

- SAML 2.0
- OpenID Connect
- OAuth 2.0

### User Federation

Connect to existing user directories:

- LDAP integration
- Active Directory support
- Custom user storage providers

### Social Login

Allow users to authenticate with their existing social accounts:

- Google
- GitHub
- Facebook
- Microsoft
- And many more

### Multi-Factor Authentication

Add extra layers of security with built-in MFA support:

- Time-based One-Time Passwords (TOTP)
- SMS verification
- Email verification
- WebAuthn / FIDO2

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Applications                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    IAM OnDemand                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Keycloak   │  │  Database   │  │  Monitoring &       │  │
│  │  Cluster    │  │  (HA)       │  │  Alerting           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│            User Directories & Identity Providers             │
│         (LDAP, Active Directory, Social Providers)           │
└─────────────────────────────────────────────────────────────┘
```

## Next Steps

Ready to get started? Continue with our guides:

1. [Quick Start Guide](/wiki/getting-started/quick-start/) - Deploy your first instance
2. [Configuration](/wiki/getting-started/configuration/) - Customize your setup
3. [User Management](/wiki/user-guide/users/) - Add and manage users

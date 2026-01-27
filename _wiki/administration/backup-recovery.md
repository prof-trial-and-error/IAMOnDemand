---
title: Backup & Recovery
description: Learn about backup strategies and recovery procedures for your IAM OnDemand instance.
category: administration
order: 20
lang: en
page_id: wiki-backup-recovery
---

## Overview

IAM OnDemand automatically manages backups for your Keycloak instances. This guide explains our backup strategy and how to recover your data when needed.

## Automatic Backups

### Backup Schedule

Your instance data is automatically backed up:

| Backup Type | Frequency | Retention |
|-------------|-----------|-----------|
| Daily | Every 24 hours | 30 days |
| Weekly | Every Sunday | 90 days |
| Monthly | 1st of month | 1 year |

### What's Included

Backups include:

- Realm configurations
- User data and credentials
- Client configurations
- Role mappings
- Custom themes
- Event logs

## Manual Backups

### Creating a Manual Backup

1. Open your instance dashboard
2. Click **Backups** tab
3. Click **Create Backup**
4. Add an optional description
5. Click **Create**

### Exporting Data

Export specific data via Admin Console:

1. Go to **Realm settings**
2. Click **Action > Partial export**
3. Select data to export
4. Download JSON file

## Recovery Procedures

### Restoring from Backup

1. Open your instance dashboard
2. Click **Backups** tab
3. Find the backup to restore
4. Click **Restore**
5. Confirm the restore operation

> **Note:** Restoration replaces current data. Consider creating a backup before restoring.

### Point-in-Time Recovery

For Enterprise tier customers, point-in-time recovery is available:

1. Contact support
2. Specify the desired recovery time
3. We'll restore to the nearest available point

## Best Practices

- Test restore procedures regularly
- Export critical configurations separately
- Document custom configurations
- Monitor backup status in dashboard

## Next Steps

- [Monitoring](/wiki/administration/monitoring/) - Set up monitoring
- [Security Best Practices](/wiki/administration/security/) - Protect your data

---
title: Monitoring
description: Monitor your IAM OnDemand instance with built-in metrics and alerting.
category: administration
order: 21
lang: en
page_id: wiki-monitoring
---

## Overview

IAM OnDemand provides comprehensive monitoring for your Keycloak instances, including real-time metrics, historical data, and alerting capabilities.

## Dashboard Metrics

### Instance Health

Monitor overall instance health:

- **Status** - Healthy, Degraded, or Down
- **Uptime** - Current uptime percentage
- **Response Time** - Average response latency
- **Error Rate** - Percentage of failed requests

### Authentication Metrics

Track authentication activity:

| Metric | Description |
|--------|-------------|
| Login Success | Successful authentications |
| Login Failure | Failed authentication attempts |
| Active Sessions | Current active user sessions |
| Token Requests | OAuth token issuances |

### Resource Usage

Monitor resource consumption:

- CPU utilization
- Memory usage
- Database connections
- Storage usage

## Alerting

### Built-in Alerts

Default alerts include:

- Instance down
- High error rate (>5%)
- High response time (>2s)
- Storage threshold (>80%)

### Custom Alerts

Configure custom alerts:

1. Go to instance **Settings**
2. Click **Alerts**
3. Add new alert rule
4. Configure conditions and notifications

### Notification Channels

Receive alerts via:

- Email
- Slack
- Webhook
- PagerDuty (Enterprise)

## Event Logging

### User Events

Enable and view user activity:

1. Go to **Realm settings > Events**
2. Enable **User Events**
3. Select events to capture
4. View in **Events > User Events**

### Admin Events

Track administrative actions:

1. Enable **Admin Events**
2. Include representation (detailed logs)
3. View in **Events > Admin Events**

## Integration

### Prometheus Metrics

Export metrics in Prometheus format:

```
https://your-instance.iam-ondemand.com/metrics
```

### External Monitoring

Integrate with your monitoring stack:

- Grafana dashboards
- Datadog
- New Relic

## Best Practices

- Set up alerts for critical metrics
- Review logs regularly
- Establish baseline metrics
- Document incident response procedures

## Next Steps

- [Security Best Practices](/wiki/administration/security/) - Secure your monitoring
- [Backup & Recovery](/wiki/administration/backup-recovery/) - Data protection

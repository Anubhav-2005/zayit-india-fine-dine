# Security policy

## Reporting a vulnerability

Please report suspected security issues privately to
[zayitindia@gmail.com](mailto:zayitindia@gmail.com). Include the affected URL,
what you observed, reproduction steps, and the potential impact. Do not include
guest personal data, publish the issue, or perform destructive testing.

Allow up to seven days for an initial response. This project does not currently
operate a paid bug-bounty programme.

## Current scope

The public website is informational. It does not process payments, store
reservation details, create user accounts, or maintain a customer database.
Reservation and enquiry forms validate locally and prepare a message in the
visitor's own email application.

The following are in scope:

- Cross-site scripting or content-injection paths
- Security-header or framing bypasses
- Dependency or build-pipeline compromise
- Exposure of credentials or private owner assets
- Redirects or links that can be controlled by an attacker

The following are out of scope:

- Automated traffic that degrades availability
- Social engineering of restaurant staff
- Findings that only affect obsolete browsers
- Reports generated solely by automated scanners without a reproducible impact

## Operational requirements

If online payments, server-side reservations, authentication, analytics,
customer uploads, or a mailing-list provider are added, they must receive a
separate threat model, server-side validation, abuse throttling, data-retention
policy, access controls, audit logging, and privacy review before launch.

# Security Specification & Test Cases

## 1. Data Invariants
- `company_info`: Publicly readable document containing brand data, contacts, social links, and optional logoUrl.
- `app_versions`: Publicly readable APK release versions with direct download links (`apkDownloadUrl`). No raw binary payloads stored in Firestore.
- `notices`: Publicly readable announcements and updates.
- `courses`: Publicly readable educational skill courses.
- `pricing_plans`: Publicly readable booster tiers.
- `platform_stats`: Publicly readable platform operational numbers.
- `support_tickets`: Publicly creatable with strict validation (name, email, message bounds). Unauthorized users cannot list or tamper with tickets.

## 2. Dirty Dozen Threat Vectors & Mitigations
1. **Ghost Field Injection**: Adding arbitrary fields to `company_info` or `support_tickets`. Mitigated via `keys().hasOnly()`.
2. **Resource Poisoning (Oversized Strings)**: Submitting >100KB strings to spam database bandwidth. Mitigated with `.size() <= MAX` guards on all string fields.
3. **Invalid ID Attacks**: Path injection using non-alphanumeric or >128-char keys. Mitigated with `isValidId(id)` helper.
4. **Ticket Tampering**: Attempting to update or delete someone else's support ticket. Mitigated by restricting ticket updates to admins or locking after submission.
5. **Negative Numeric Counters**: Setting negative `views` or negative `downloadCount`. Mitigated with `>= 0` numeric boundary checks.
6. **APK File Upload Injection**: Storing executable blobs directly in Firestore documents. Mitigated by only allowing string URL fields (`apkDownloadUrl`).
7. **Unauthorized Admin Escalation**: Trying to modify system roles or permissions. Mitigated by isolating administrative logic and preventing client-side privilege writes.
8. **Null / Malformed Email**: Submitting invalid email strings on support tickets. Mitigated by email regex pattern checks.
9. **Mass Scraping / Unbounded Listing**: Mitigated by schema enforcement.
10. **State Corruption**: Deleting required documents such as `company_info/main`. Mitigated by write constraints.
11. **Type Mismatching**: Sending boolean for course prices or arrays where strings are required. Mitigated with `is string` and `is number` type guards.
12. **Cross-Tenant Document Forgery**: Creating orphaned records. Mitigated with schema checks.

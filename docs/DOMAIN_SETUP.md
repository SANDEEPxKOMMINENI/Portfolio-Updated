# Custom Domain Setup Guide

This guide provides step-by-step instructions for configuring your custom domain (sandeepkommineni.me) purchased from Namecheap to work with Cloudflare Pages hosting, including SSL certificate setup and verification.

## Overview

The setup process involves three main steps:
1. Configure Namecheap DNS to use Cloudflare nameservers
2. Add and verify your custom domain in Cloudflare Pages
3. Verify SSL certificate and HTTPS configuration

**Estimated Time**: 15-30 minutes (plus up to 24-48 hours for DNS propagation)

## Prerequisites

- Custom domain purchased from Namecheap (sandeepkommineni.me)
- SSL certificate (included with domain purchase)
- Cloudflare account with Pages project deployed
- Access to Namecheap domain management dashboard
- Access to Cloudflare dashboard

---

## Step 1: Configure Cloudflare Nameservers in Namecheap

### 1.1 Get Cloudflare Nameservers

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. If you haven't added your domain to Cloudflare yet:
   - Click "Add a Site" in the top navigation
   - Enter your domain: `sandeepkommineni.me`
   - Select the Free plan (or your preferred plan)
   - Click "Continue"
3. Cloudflare will scan your existing DNS records
4. Review the detected records and click "Continue"
5. Cloudflare will display your assigned nameservers (they look like):
   ```
   nameserver1.cloudflare.com
   nameserver2.cloudflare.com
   ```
   **Important**: Copy these nameservers - you'll need them in the next step

### 1.2 Update Nameservers in Namecheap

1. Log in to your [Namecheap Account](https://www.namecheap.com/myaccount/login/)
2. Navigate to "Domain List" in the left sidebar
3. Find `sandeepkommineni.me` and click "Manage"
4. Scroll down to the "Nameservers" section
5. Select "Custom DNS" from the dropdown
6. Enter the Cloudflare nameservers you copied earlier:
   - Nameserver 1: `nameserver1.cloudflare.com`
   - Nameserver 2: `nameserver2.cloudflare.com`
7. Click the green checkmark to save changes

**Note**: DNS propagation can take 24-48 hours, but typically completes within 2-4 hours.

### 1.3 Verify Nameserver Change in Cloudflare

1. Return to your Cloudflare Dashboard
2. Click "Done, check nameservers" (if still on the setup page)
3. Cloudflare will verify the nameserver change
4. You'll receive an email when the domain is active on Cloudflare
5. The status will change from "Pending Nameserver Update" to "Active"

**Tip**: You can check DNS propagation status using online tools like [WhatsMyDNS.net](https://www.whatsmydns.net/)

---

## Step 2: Add Custom Domain to Cloudflare Pages

### 2.1 Navigate to Your Pages Project

1. In the Cloudflare Dashboard, click "Workers & Pages" in the left sidebar
2. Select the "Pages" tab
3. Click on your portfolio project (the one you want to connect to your domain)

### 2.2 Add Custom Domain

1. Click the "Custom domains" tab
2. Click "Set up a custom domain"
3. Enter your domain: `sandeepkommineni.me`
4. Click "Continue"

### 2.3 Configure DNS Records

Cloudflare will automatically configure the necessary DNS records:

**For Apex Domain (sandeepkommineni.me)**:
- Cloudflare creates a CNAME record pointing to your Pages project
- Or creates A/AAAA records if CNAME flattening is needed

The DNS records are added automatically - no manual configuration needed!

### 2.4 Add WWW Subdomain (Optional but Recommended)

1. Click "Set up a custom domain" again
2. Enter: `www.sandeepkommineni.me`
3. Click "Continue"
4. Cloudflare will automatically configure DNS and set up a redirect from www to apex domain

**Result**: Visitors to `www.sandeepkommineni.me` will be redirected to `sandeepkommineni.me`

---

## Step 3: SSL Certificate Configuration and Verification

### 3.1 Automatic SSL Certificate Provisioning

Cloudflare automatically provisions SSL certificates for your custom domain:

1. In your Cloudflare Dashboard, go to "SSL/TLS" in the left sidebar
2. Verify the SSL/TLS encryption mode is set to "Full" or "Full (strict)"
   - **Recommended**: "Full (strict)" for maximum security
3. Cloudflare will automatically issue a Universal SSL certificate
4. Certificate provisioning typically takes 5-15 minutes

### 3.2 Enable Always Use HTTPS

1. In the "SSL/TLS" section, click "Edge Certificates"
2. Scroll down to "Always Use HTTPS"
3. Toggle it to "On"
4. This ensures all HTTP requests are automatically redirected to HTTPS

### 3.3 Enable HSTS (HTTP Strict Transport Security)

1. In the "SSL/TLS" section, click "Edge Certificates"
2. Scroll down to "HTTP Strict Transport Security (HSTS)"
3. Click "Enable HSTS"
4. Configure settings:
   - Max Age Header: 6 months (recommended)
   - Apply HSTS policy to subdomains: Yes
   - Preload: Yes (optional, for maximum security)
5. Click "Save"

**Warning**: HSTS is a security feature that forces browsers to only connect via HTTPS. Only enable after confirming HTTPS works correctly.

### 3.4 Verify SSL Certificate

1. Wait 5-15 minutes for certificate provisioning
2. Visit your domain: `https://sandeepkommineni.me`
3. Check for the padlock icon in the browser address bar
4. Click the padlock to view certificate details:
   - Issued by: Cloudflare
   - Valid for: sandeepkommineni.me and www.sandeepkommineni.me
   - Expiration: Cloudflare auto-renews certificates

**SSL Verification Checklist**:
- [ ] Padlock icon appears in browser
- [ ] Certificate is valid and not expired
- [ ] Certificate is issued by Cloudflare
- [ ] No mixed content warnings
- [ ] HTTP automatically redirects to HTTPS

---

## Step 4: Verify Domain Configuration

### 4.1 Test Domain Access

Test all domain variations to ensure proper configuration:

```bash
# Test apex domain
curl -I https://sandeepkommineni.me

# Test www subdomain (should redirect to apex)
curl -I https://www.sandeepkommineni.me

# Test HTTP redirect (should redirect to HTTPS)
curl -I http://sandeepkommineni.me
```

**Expected Results**:
- `https://sandeepkommineni.me` → 200 OK
- `https://www.sandeepkommineni.me` → 301/302 redirect to apex domain
- `http://sandeepkommineni.me` → 301 redirect to HTTPS

### 4.2 Verify DNS Propagation

Use online tools to check DNS propagation worldwide:

1. Visit [WhatsMyDNS.net](https://www.whatsmydns.net/)
2. Enter your domain: `sandeepkommineni.me`
3. Select record type: "A" or "CNAME"
4. Check that DNS has propagated globally (green checkmarks)

### 4.3 Test Page Load

1. Open your domain in multiple browsers:
   - Chrome
   - Firefox
   - Safari
   - Edge
2. Verify the portfolio loads correctly
3. Check browser console for any errors
4. Verify all assets (images, CSS, JS) load over HTTPS

---

## Troubleshooting

### Issue: DNS Not Propagating

**Symptoms**: Domain doesn't resolve or shows old nameservers

**Solutions**:
1. Wait longer - DNS propagation can take up to 48 hours
2. Clear your local DNS cache:
   - **Windows**: `ipconfig /flushdns`
   - **macOS**: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
   - **Linux**: `sudo systemd-resolve --flush-caches`
3. Verify nameservers are correctly set in Namecheap
4. Check DNS propagation status at [WhatsMyDNS.net](https://www.whatsmydns.net/)

### Issue: SSL Certificate Not Provisioning

**Symptoms**: "Your connection is not private" error or no padlock icon

**Solutions**:
1. Wait 15-30 minutes for certificate provisioning
2. Verify domain is "Active" in Cloudflare (not "Pending")
3. Check SSL/TLS mode is set to "Full" or "Full (strict)"
4. Disable "Always Use HTTPS" temporarily, then re-enable after certificate is issued
5. Try purging Cloudflare cache: Dashboard → Caching → Purge Everything
6. Contact Cloudflare support if issue persists after 24 hours

### Issue: WWW Subdomain Not Redirecting

**Symptoms**: www subdomain shows error or doesn't redirect to apex domain

**Solutions**:
1. Verify www subdomain is added in Cloudflare Pages custom domains
2. Check DNS records for www subdomain in Cloudflare DNS settings
3. Verify redirect rule is configured (Cloudflare Pages handles this automatically)
4. Clear browser cache and test in incognito mode
5. Check Cloudflare Page Rules for any conflicting rules

### Issue: Mixed Content Warnings

**Symptoms**: Padlock icon with warning, some assets not loading

**Solutions**:
1. Ensure all asset URLs use HTTPS or protocol-relative URLs (`//`)
2. Check for hardcoded HTTP URLs in HTML, CSS, or JavaScript
3. Update any external resources to use HTTPS
4. Use browser DevTools Console to identify mixed content sources
5. Enable "Automatic HTTPS Rewrites" in Cloudflare: SSL/TLS → Edge Certificates

### Issue: Domain Shows "Too Many Redirects"

**Symptoms**: Browser shows "ERR_TOO_MANY_REDIRECTS" error

**Solutions**:
1. Check SSL/TLS mode in Cloudflare - should be "Full" or "Full (strict)", not "Flexible"
2. Disable any redirect rules in Cloudflare Page Rules
3. Check for conflicting redirects in your application code
4. Clear browser cookies and cache
5. Verify Cloudflare Pages deployment is working correctly

### Issue: Domain Not Showing in Cloudflare Pages

**Symptoms**: Custom domain option not available or domain verification fails

**Solutions**:
1. Ensure domain is added to Cloudflare (not just Cloudflare Pages)
2. Verify domain status is "Active" in Cloudflare Dashboard
3. Wait for DNS propagation to complete
4. Try removing and re-adding the custom domain in Pages
5. Check that you have the correct permissions for the Cloudflare account

### Issue: Old Content Still Showing

**Symptoms**: Domain shows old version of site or cached content

**Solutions**:
1. Purge Cloudflare cache: Dashboard → Caching → Purge Everything
2. Verify latest deployment is active in Cloudflare Pages
3. Check deployment history and ensure correct branch is deployed
4. Clear browser cache or test in incognito mode
5. Verify DNS is pointing to correct Cloudflare Pages project

---

## DNS Record Reference

After setup is complete, your Cloudflare DNS records should look like this:

| Type  | Name | Content                          | Proxy Status | TTL  |
|-------|------|----------------------------------|--------------|------|
| CNAME | @    | your-project.pages.dev           | Proxied      | Auto |
| CNAME | www  | sandeepkommineni.me              | Proxied      | Auto |

**Note**: Cloudflare may use CNAME flattening or A/AAAA records for the apex domain depending on your configuration.

---

## Security Best Practices

### Enable Additional Security Features

1. **Enable DNSSEC** (Domain Name System Security Extensions):
   - Cloudflare Dashboard → DNS → Settings
   - Enable DNSSEC
   - Add DS records to Namecheap (Cloudflare provides instructions)

2. **Configure Security Headers**:
   - Already configured in application code
   - Verify headers using [SecurityHeaders.com](https://securityheaders.com/)

3. **Enable Bot Protection** (optional):
   - Cloudflare Dashboard → Security → Bots
   - Configure bot fight mode

4. **Set Up Firewall Rules** (optional):
   - Cloudflare Dashboard → Security → WAF
   - Create rules to block malicious traffic

### Monitor Domain Health

1. **Set Up Cloudflare Analytics**:
   - Monitor traffic, threats, and performance
   - Dashboard → Analytics & Logs

2. **Enable Email Notifications**:
   - Get alerts for SSL expiration, DNS changes, security events
   - Dashboard → Notifications

3. **Regular Security Audits**:
   - Check SSL Labs: [SSLLabs.com](https://www.ssllabs.com/ssltest/)
   - Verify security headers: [SecurityHeaders.com](https://securityheaders.com/)
   - Test DNS security: [DNSViz.net](https://dnsviz.net/)

---

## Next Steps

After completing domain setup:

1. **Submit Sitemap to Google Search Console**:
   - Add property for `https://sandeepkommineni.me`
   - Verify ownership using DNS TXT record
   - Submit sitemap: `https://sandeepkommineni.me/sitemap.xml`

2. **Configure Analytics**:
   - Set up Google Analytics 4 with your custom domain
   - Update tracking code if needed

3. **Test SEO Configuration**:
   - Use Google Rich Results Test
   - Verify Open Graph tags with Facebook Debugger
   - Test Twitter Cards with Twitter Card Validator

4. **Monitor Performance**:
   - Run Lighthouse audit
   - Check PageSpeed Insights
   - Monitor Core Web Vitals

5. **Update External Links**:
   - Update portfolio links on LinkedIn, GitHub, resume
   - Update email signature
   - Update business cards or other materials

---

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Cloudflare SSL/TLS Documentation](https://developers.cloudflare.com/ssl/)
- [Namecheap DNS Management Guide](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/)
- [DNS Propagation Checker](https://www.whatsmydns.net/)
- [SSL Certificate Checker](https://www.ssllabs.com/ssltest/)

---

## Support

If you encounter issues not covered in this guide:

1. **Cloudflare Support**:
   - Community Forum: [community.cloudflare.com](https://community.cloudflare.com/)
   - Support Portal: [support.cloudflare.com](https://support.cloudflare.com/)

2. **Namecheap Support**:
   - Live Chat: Available 24/7
   - Support Portal: [support.namecheap.com](https://support.namecheap.com/)

3. **Check Status Pages**:
   - Cloudflare Status: [www.cloudflarestatus.com](https://www.cloudflarestatus.com/)
   - Namecheap Status: [status.namecheap.com](https://status.namecheap.com/)

---

**Last Updated**: February 2026  
**Version**: 1.0

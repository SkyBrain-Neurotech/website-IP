# Cloudflare Configuration for SkyBrain Website

## Free Tier DDoS Protection & Performance Setup

### DNS Settings
```
Type: A
Name: @
Content: YOUR_SERVER_IP
Proxy: ON (Orange Cloud) ✅
TTL: Auto

Type: CNAME  
Name: www
Content: skybrain.com
Proxy: ON (Orange Cloud) ✅
TTL: Auto
```

### SSL/TLS Settings
- **Encryption Mode**: Full (Strict)
- **Minimum TLS Version**: 1.2
- **HSTS**: Enabled
  - Max Age: 12 months
  - Include Subdomains: Yes
  - Preload: Yes
- **Always Use HTTPS**: ON

### Speed Optimization
- **Auto Minify**: 
  - JavaScript: ON
  - CSS: ON
  - HTML: ON
- **Brotli**: ON
- **Rocket Loader**: OFF (for better analytics tracking)
- **Mirage**: ON
- **Polish**: Lossless

### Security Settings
- **Security Level**: Medium
- **Browser Integrity Check**: ON
- **Challenge Passage**: 30 minutes
- **Privacy Pass Support**: ON

### Page Rules (Free Tier - 3 rules max)

#### Rule 1: Force HTTPS
- **URL Pattern**: `http://*skybrain.com/*`
- **Settings**: Always Use HTTPS

#### Rule 2: Cache Everything for Static Assets
- **URL Pattern**: `*skybrain.com/*.{css,js,png,jpg,jpeg,gif,svg,woff,woff2}`
- **Settings**: 
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 month

#### Rule 3: Security for Admin Areas (if applicable)
- **URL Pattern**: `*skybrain.com/admin/*`
- **Settings**: Security Level: High

### Firewall Rules (Free Tier - 5 rules max)

#### Rule 1: Block Known Bad Bots
- **Expression**: `(cf.client.bot and not cf.verified_bot)`
- **Action**: Block

#### Rule 2: Rate Limiting for Forms
- **Expression**: `(http.request.uri.path contains "/api/" and http.request.method eq "POST")`
- **Action**: Rate Limit (10 requests per minute)

#### Rule 3: Geo-blocking (Optional)
- **Expression**: `(ip.geoip.country in {"CN" "RU" "KP"})`
- **Action**: Challenge (Captcha)

#### Rule 4: Block Common Attack Patterns
- **Expression**: `(http.user_agent contains "sqlmap" or http.user_agent contains "nikto" or http.user_agent contains "scanner")`
- **Action**: Block

#### Rule 5: Protect Demo Endpoint
- **Expression**: `(http.request.uri.path contains "/demo" and rate(5m) > 10)`
- **Action**: Challenge

### Analytics & Monitoring
- **Web Analytics**: ON (Free version available)
- **Bot Management**: View bot traffic insights
- **Security Events**: Monitor attacks and threats

### Custom Error Pages
Create custom error pages for:
- 403 Forbidden
- 404 Not Found  
- 500 Server Error
- 522 Connection Timed Out

### Performance Recommendations

#### Cloudflare Workers (Paid feature - future upgrade)
```javascript
// Demo form rate limiting
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Rate limiting logic for demo requests
  if (request.url.includes('/demo')) {
    // Implement rate limiting
  }
  return fetch(request)
}
```

### Free Tier Limitations & Workarounds

#### Limitations:
- 3 Page Rules max
- 5 Firewall Rules max
- Basic analytics only
- No custom Workers
- Limited rate limiting

#### Workarounds:
- Use `.htaccess` for additional rules
- Implement rate limiting in application code
- Use Google Analytics for detailed analytics
- Monitor with free tier and upgrade when needed

### Setup Instructions

1. **Add Domain to Cloudflare**
   - Sign up at cloudflare.com
   - Add skybrain.com domain
   - Copy nameservers to domain registrar

2. **Update Nameservers**
   ```
   Replace existing nameservers with:
   - ada.ns.cloudflare.com
   - carter.ns.cloudflare.com
   ```

3. **Configure SSL Certificate**
   - Wait for SSL certificate activation (usually 15 minutes)
   - Test HTTPS access
   - Enable HSTS

4. **Set Up Analytics**
   - Enable Cloudflare Web Analytics
   - Install tracking code (alternative to GA4)
   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
           data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
   ```

5. **Test Protection**
   - Run DDoS simulation tools
   - Test form submission limits
   - Verify geographical restrictions

### Monitoring Commands
```bash
# Test SSL certificate
curl -I https://skybrain.com

# Check response headers
curl -I https://skybrain.com | grep -i security

# Test compression
curl -H "Accept-Encoding: gzip" -I https://skybrain.com

# Check DNS propagation
dig skybrain.com
```

### Performance Metrics to Track
- **Page Load Time**: < 3 seconds
- **TTFB (Time to First Byte)**: < 200ms
- **SSL Handshake Time**: < 100ms
- **CDN Cache Hit Ratio**: > 80%
- **Bandwidth Savings**: > 40%

### Security Metrics
- **Blocked Attacks**: Daily count
- **Challenge Solve Rate**: > 95%
- **False Positive Rate**: < 1%
- **Bot Traffic**: Percentage of total traffic

### Cost Optimization
- Start with Free tier ($0/month)
- Monitor usage and upgrade triggers:
  - Traffic > 100GB/month: Consider Pro ($20/month)
  - Need advanced security: Business ($200/month)
  - Enterprise needs: Enterprise (custom pricing)

### Backup Configuration
Export current settings regularly:
```bash
# Using Cloudflare API
curl -X GET "https://api.cloudflare.com/client/v4/zones/ZONE_ID/settings" \
     -H "Authorization: Bearer YOUR_API_TOKEN" \
     -H "Content-Type: application/json"
```

This configuration provides enterprise-level DDoS protection and performance optimization using only Cloudflare's free tier, perfect for SkyBrain's current needs while allowing for easy scaling as the business grows.
# Quick Test Commands

## 🧪 Run Form Tests

### Test with Indian Users (10 submissions):
```bash
node test-indian-users.js
```

### Test with Previous Submissions (7 submissions):
```bash
node test-submissions.js
```

### Start Development Server:
```bash
npm run dev
```

### Test Single Contact Form:
```bash
curl -X POST http://localhost:3005/api/contact -H "Content-Type: application/json" -d "{\"firstName\":\"Test\",\"lastName\":\"User\",\"email\":\"test@example.com\",\"message\":\"Test message\",\"interestArea\":\"Testing\"}"
```

## 📊 Check Results

### Google Sheets URL:
https://docs.google.com/spreadsheets/d/1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI/edit

### Expected Sheets After Test:
- 📊 Dashboard (summary metrics)
- Contact_Forms (contact submissions)
- Beta_Signups (beta program signups)
- Demo_Requests (demo requests)
- Newsletter_Subs (newsletter subscriptions)
- 🚨 Urgent Tracking (repeat users)

## 🔧 Troubleshooting

### If webhook not working:
1. Check .env file has: `GOOGLE_APPS_SCRIPT_URL=...`
2. Verify Apps Script is deployed with "Anyone" access
3. Test with: `node test-indian-users.js`

### If timestamps wrong:
- Make sure you deployed the enhanced Apps Script code
- Should show IST format like: "Aug 22, 07:47 AM"

### If data not separated:
- You're using the basic version, deploy the enhanced code
- Enhanced version creates individual columns instead of JSON dump
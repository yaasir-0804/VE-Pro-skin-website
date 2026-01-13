# Razorpay Payment Gateway Setup Guide

## Step 1: Get Razorpay Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in to your account
3. Navigate to **Settings** → **API Keys**
4. Click on **Generate Test Keys** (for testing) or **Generate Live Keys** (for production)
5. Copy your **Key ID** and **Key Secret**

## Step 2: Update Backend Environment Variables

Open `/app/backend/.env` and update these lines:

```bash
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE
```

**Important:** 
- For testing: Use keys starting with `rzp_test_`
- For production: Use keys starting with `rzp_live_`

## Step 3: Restart Backend Server

After updating the .env file, restart the backend:

```bash
sudo supervisorctl restart backend
```

## Step 4: Test Payment Flow

### Test Cards for Razorpay Test Mode:

**Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payment:**
- Card Number: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Expiry: Any future date

**UPI for Testing:**
- UPI ID: `success@razorpay`
- This will always succeed in test mode

### Test the Complete Flow:

1. Visit http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Fill in delivery details
5. Click "Pay Securely"
6. Use test cards above
7. Verify order success page

## Step 5: Webhook Setup (Optional but Recommended)

1. In Razorpay Dashboard, go to **Settings** → **Webhooks**
2. Add webhook URL: `https://your-domain.com/api/orders/webhook`
3. Select events: `payment.captured`, `payment.failed`
4. Copy the **Webhook Secret**
5. Add to `.env`: `RAZORPAY_WEBHOOK_SECRET=your_webhook_secret`

## Payment Methods Supported

- ✅ Credit/Debit Cards (Visa, Mastercard, RuPay, Amex)
- ✅ UPI (Google Pay, PhonePe, Paytm, BHIM)
- ✅ Net Banking (All major banks)
- ✅ Wallets (Paytm, PhonePe, Mobikwik, etc.)
- ✅ Cash on Delivery (COD)

## Security Notes

- Never commit `.env` file to version control
- Use test keys for development
- Switch to live keys only in production
- Enable 2FA on Razorpay dashboard
- Regularly rotate API keys

## Troubleshooting

**Issue: Payment fails with "Invalid key"**
- Solution: Check if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are correctly set in .env

**Issue: "Razorpay SDK failed to load"**
- Solution: Check internet connection, Razorpay script might be blocked

**Issue: Payment succeeds but order not created**
- Solution: Check backend logs: `tail -f /var/log/supervisor/backend.out.log`

## Going Live Checklist

- [ ] Get Live API keys from Razorpay
- [ ] Complete KYC verification on Razorpay
- [ ] Update .env with live keys
- [ ] Test with small real transactions
- [ ] Set up webhooks with production URL
- [ ] Enable SSL/HTTPS on your domain
- [ ] Configure payment methods you want to accept
- [ ] Set up settlement account

For more details, visit: https://razorpay.com/docs/

# 🚀 Complete Setup Guide - SaaS Subscription Frontend

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Detailed Setup](#detailed-setup)
3. [Backend Configuration](#backend-configuration)
4. [Testing the Application](#testing-the-application)
5. [Common Issues & Solutions](#common-issues--solutions)
6. [Production Deployment](#production-deployment)

---

## ⚡ Quick Start

```bash
# 1. Navigate to project directory
cd saas-frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# Application will open at http://localhost:3000
```

---

## 📖 Detailed Setup

### Step 1: Prerequisites Check

Make sure you have:
- ✅ Node.js (v14 or higher) - Check: `node --version`
- ✅ npm (v6 or higher) - Check: `npm --version`
- ✅ Spring Boot backend running on port 8080

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- react (v18.2.0)
- react-dom (v18.2.0)
- react-router-dom (v6.20.0)
- axios (v1.6.2)
- react-scripts (v5.0.1)

### Step 3: Configure API URL

Open `src/services/api.js` and verify the backend URL:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

**For different environments:**
- Development: `http://localhost:8080/api`
- Production: `https://your-domain.com/api`

### Step 4: Start Development Server

```bash
npm start
```

Server starts at: `http://localhost:3000`

---

## 🔧 Backend Configuration

Your Spring Boot backend needs these configurations:

### 1. CORS Configuration

Create `WebConfig.java`:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")  // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### 2. JWT Configuration

Ensure your backend returns JWT token on login:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### 3. Expected API Responses

#### Login Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### Get Subscription Response:
```json
{
  "id": 1,
  "planName": "BASIC",
  "status": "ACTIVE",
  "startDate": "2024-01-01T00:00:00",
  "expiryDate": "2024-12-31T23:59:59",
  "autoRenewal": true
}
```

#### Get Plans Response:
```json
[
  {
    "id": 1,
    "name": "FREE",
    "price": 0,
    "duration": 30
  },
  {
    "id": 2,
    "name": "BASIC",
    "price": 9.99,
    "duration": 30
  }
]
```

---

## 🧪 Testing the Application

### Test Flow:

1. **Landing Page**
   - Visit `http://localhost:3000`
   - Click "Get Started" → Should navigate to `/pricing`
   - Click "Sign In" → Should navigate to `/login`

2. **Registration**
   - Go to `/login`
   - Click "Sign Up"
   - Fill form and submit
   - Should redirect to `/dashboard`

3. **Login**
   - Go to `/login`
   - Enter credentials
   - Should redirect to `/dashboard`

4. **Pricing Page**
   - Visit `/pricing`
   - Should display all plans from backend
   - Click "Subscribe" without login → Redirects to `/login`
   - Click "Subscribe" after login → Creates subscription

5. **Dashboard**
   - Visit `/dashboard` (must be logged in)
   - Should display subscription details
   - Test "Cancel Subscription" button
   - Test "Upgrade Plan" button

6. **Admin Dashboard** (Admin users only)
   - Login as admin
   - Visit `/admin`
   - Create new plan
   - Delete plan
   - View all users

### Test API Calls:

```bash
# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test get plans
curl http://localhost:8080/api/subscription/plans

# Test get user subscription (with token)
curl http://localhost:8080/api/subscription/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## ❗ Common Issues & Solutions

### Issue 1: "npm install" fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 2: CORS errors
**Symptoms:** Browser console shows CORS errors

**Solution:**
- Ensure backend CORS is configured correctly
- Check if backend is running on port 8080
- Verify allowedOrigins includes `http://localhost:3000`

### Issue 3: Login not working
**Possible causes:**
- Backend not returning proper JWT token
- Token format incorrect
- Backend not running

**Solution:**
```javascript
// Check browser console for errors
// Check Network tab in DevTools
// Verify API response format matches expected structure
```

### Issue 4: Protected routes not working
**Solution:**
- Clear localStorage: `localStorage.clear()`
- Login again
- Check if token is being sent in headers

### Issue 5: "Module not found" errors
**Solution:**
```bash
npm install react-router-dom axios
```

---

## 🌐 Production Deployment

### 1. Build Production Version

```bash
npm run build
```

This creates optimized build in `/build` folder.

### 2. Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

**Configure Netlify:**
- Build command: `npm run build`
- Publish directory: `build`
- Add environment variable for API URL

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 4. Deploy to AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name

# Configure CloudFront distribution
```

### 5. Environment Variables

Create `.env` file for different environments:

**.env.development**
```
REACT_APP_API_URL=http://localhost:8080/api
```

**.env.production**
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

Update `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

---

## 📊 Performance Optimization

### 1. Code Splitting
Already implemented with React Router

### 2. Lazy Loading
```javascript
import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
```

### 3. Image Optimization
- Use WebP format
- Compress images
- Use CDN for static assets

---

## 🔒 Security Best Practices

1. **Never commit `.env` files**
2. **Use HTTPS in production**
3. **Sanitize user inputs**
4. **Implement rate limiting on backend**
5. **Use Content Security Policy headers**
6. **Keep dependencies updated**

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix
```

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review browser console errors
3. Check Network tab in DevTools
4. Verify backend is running correctly

---

## 🎯 Next Steps

After basic setup:
1. ✅ Customize branding and colors
2. ✅ Add more features
3. ✅ Implement analytics
4. ✅ Add payment integration (Stripe/PayPal)
5. ✅ Set up CI/CD pipeline
6. ✅ Add unit tests

---

**Happy Coding! 🚀**

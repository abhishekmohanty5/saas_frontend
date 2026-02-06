# SaaS Subscription Management Frontend

A modern React-based frontend for managing SaaS subscriptions with Spring Boot backend integration.

## 🚀 Features

- **Landing Page** - Attractive homepage with features and CTA
- **Authentication** - Login & Registration with JWT
- **Pricing Page** - Display subscription plans
- **User Dashboard** - View and manage subscriptions
- **Admin Dashboard** - Manage users and plans
- **Protected Routes** - Role-based access control
- **Responsive Design** - Works on all devices

## 📁 Project Structure

```
saas-frontend/
├── src/
│   ├── components/          # Reusable components
│   │   └── ProtectedRoute.js
│   ├── pages/              # Page components
│   │   ├── LandingPage.js
│   │   ├── AuthPage.js
│   │   ├── PricingPage.js
│   │   ├── Dashboard.js
│   │   └── AdminDashboard.js
│   ├── services/           # API integration
│   │   └── api.js
│   ├── utils/              # Utilities
│   │   └── AuthContext.js
│   ├── App.js              # Main app component
│   ├── App.css
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
└── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Spring Boot backend running on `http://localhost:8080`

### Step 1: Install Dependencies
```bash
cd saas-frontend
npm install
```

### Step 2: Configure Backend URL
Open `src/services/api.js` and update the backend URL if needed:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Step 3: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔗 Backend Integration

### API Endpoints Used

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Subscriptions
- `GET /api/subscription/plans` - Get all plans
- `POST /api/subscription/subscribe` - Subscribe to plan
- `GET /api/subscription/user` - Get user subscription
- `POST /api/subscription/cancel` - Cancel subscription
- `PUT /api/subscription/upgrade` - Upgrade subscription

#### Admin
- `POST /admin/plans` - Create new plan
- `PUT /admin/plans/{id}` - Update plan
- `DELETE /admin/plans/{id}` - Delete plan
- `GET /admin/users` - Get all users

## 📱 Pages & Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | LandingPage | Public | Homepage |
| `/login` | AuthPage | Public | Login/Register |
| `/pricing` | PricingPage | Public | View plans |
| `/dashboard` | Dashboard | Protected | User dashboard |
| `/admin` | AdminDashboard | Admin Only | Admin panel |

## 🎨 Styling

- Custom CSS with modern gradients
- Responsive design (mobile-first)
- Smooth animations and transitions
- Professional color scheme

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected requests
5. AuthContext manages user state globally

## 📦 Dependencies

- **react** - UI framework
- **react-router-dom** - Routing
- **axios** - HTTP client

## 🚦 Usage

### For Users:
1. Visit landing page
2. Click "Get Started" → View pricing
3. Register/Login
4. Subscribe to a plan
5. Manage subscription in dashboard

### For Admins:
1. Login with admin credentials
2. Access `/admin` route
3. Create/Delete plans
4. View all users

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## 🌐 Backend Requirements

Your Spring Boot backend should have:
- CORS enabled for `http://localhost:3000`
- JWT authentication
- All API endpoints listed above

Example CORS configuration:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 📸 Screenshots

### Landing Page
Modern hero section with features grid and CTA

### Pricing Page
Beautiful pricing cards with feature lists

### Dashboard
Clean user dashboard with subscription details

### Admin Dashboard
Comprehensive admin panel for management

## 🤝 Contributing

Feel free to fork and submit PRs!

## 📄 License

MIT License

## 👨‍💻 Author

Built for SaaS Subscription Management System

---

**Note**: Make sure your Spring Boot backend is running before starting the frontend!

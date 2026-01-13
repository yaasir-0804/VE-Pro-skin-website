# VÉ PRO SKIN - Product Requirements Document

## Original Problem Statement
Build a high-conversion, luxury-affordable skincare ecommerce website for an Indian dermo-tested, cruelty-free brand targeting 14-30 year olds. The website must sell 12 SKUs across 4 categories (Cleanser, Moisturiser, Serum, Sunscreen), each with 3 skin-type variants (Oily/Acne-Prone, Normal/Combination, Dry/Sensitive).

## User Personas
- **Primary**: Indian Gen-Z and Millennials (14-30 years)
- **Skin Concerns**: Acne, pigmentation, dullness, dryness, sensitivity
- **Shopping Behavior**: Mobile-first, trust-driven, value-conscious
- **Expectations**: Clinical efficacy, ingredient transparency, affordable luxury

## Core Requirements (Static)
1. Mobile-first, fast, minimal design (The Ordinary, CeraVe, Minimalist style)
2. Trust-building elements (dermatologist tested, cruelty-free badges)
3. 12 SKUs with detailed product information
4. AI-powered skin quiz for personalized recommendations
5. Full ecommerce functionality with Razorpay payment gateway
6. Social proof and urgency triggers
7. Luxury minimalist design system

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS (via App.css), Shadcn UI
- **Backend**: FastAPI, Python
- **Database**: MongoDB (Motor async driver)
- **Integrations**: 
  - OpenAI GPT-5.1 (via Emergent LLM Key) for AI skin quiz
  - Razorpay for payments
- **Design System**: Luxury Minimalist (warm neutrals, sharp edges, generous spacing)

## What's Been Implemented (Phase 1 - January 13, 2025)

### Frontend (Complete with Mock Data)
1. **Design System**
   - Luxury minimalist color palette (warm neutrals: #fffef2, #f6f5e8)
   - Typography system with exceptional hierarchy
   - Sharp-edged buttons (0px border radius)
   - Generous spacing and white space
   - Responsive mobile-first layout

2. **Pages Created**
   - Homepage with hero, categories, best sellers, trust section
   - Products listing page with category and skin type filters
   - Product detail pages with urgency timers and social proof
   - Shopping cart with bundle discounts
   - Skin quiz (5-step questionnaire)
   - Quiz results page with AI recommendations

3. **Components**
   - Header with navigation and cart count
   - Footer with links and trust badges
   - Product cards with ratings, pricing, stock info
   - Urgency triggers (countdown timers, social proof)

4. **Mock Data**
   - All 12 SKU products with complete details
   - Product images, ingredients, benefits, descriptions
   - Rating and review counts
   - Stock levels and pricing

5. **User Features**
   - Product browsing and filtering
   - Add to cart functionality (localStorage)
   - Cart management (update quantity, remove items)
   - Skin quiz flow
   - Quiz-based product recommendations

### Backend (Pending)
- MongoDB models for Products, Users, Orders, Cart, Quiz Results
- Authentication with JWT
- Product APIs (CRUD operations)
- Cart management APIs
- AI Quiz API integration with OpenAI
- Razorpay payment processing
- Order management

## Prioritized Backlog

### P0 Features (Next - Phase 2)
1. Backend development:
   - MongoDB models and schemas
   - Product APIs (GET /products, GET /products/:id)
   - Cart APIs (POST /cart, GET /cart, PUT /cart, DELETE /cart)
   - User authentication (register, login, JWT)
   - AI Quiz API with OpenAI integration
   - Razorpay payment integration
   - Order creation and tracking

2. Frontend-Backend Integration:
   - Replace mock data with API calls
   - Connect cart to backend
   - Implement user authentication flow
   - Checkout page with Razorpay
   - Order confirmation and tracking

### P1 Features (Future Enhancements)
1. User account dashboard
2. Order history and tracking
3. Wishlist functionality
4. Product reviews and ratings system
5. Email notifications
6. Admin panel for product management
7. Inventory management
8. Analytics and reporting

### P2 Features (Nice to Have)
1. Bundle deals and promotions
2. Referral program
3. Subscription model
4. Blog/content section
5. Live chat support
6. Advanced search with filters
7. Product comparison
8. Social media integration

## Next Tasks
1. Build backend with MongoDB models
2. Create authentication system
3. Implement product APIs
4. Build AI quiz backend with OpenAI
5. Integrate Razorpay for payments
6. Connect frontend to backend APIs
7. Test end-to-end flows
8. Deploy to production

## Design Guidelines Applied
- Warm neutral color palette (no bright gradients)
- Sharp rectangular buttons (0px border radius)
- Generous white space (80-120px section padding)
- Minimal typography (2-3 font weights max)
- No AI emoji icons (using lucide-react instead)
- Product-focused imagery
- Subtle interactions and transitions

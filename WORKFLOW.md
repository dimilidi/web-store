## Workflow
1. Create Angular App
- create projects folder
- create app as frontend
2. Add Header
- generate component (ng g c header)
- install angular material (ng add @angular/material)
- add HTML
- add CSS
3. List Products
- create Product Model
- create data.ts
 - add sample produccts
- add images to assets
- create Product Service
- create Home Component
  - add HTML
  - add CSS
  - add ts
4. Search
- add method to Product Service
- add search route
- show rearch result in Home component
- generate Search Comppnent
  -  add it to Home Component
  - add ts
  - add html
  - add css
5. Product Page
- add method to Product Service
- generate Product Page Component
  - add Route
  - add ts
  - add html
  - add css
6. Tags Bar
- create Tag Model
- add sample tags to data.ts
- Food Service
  - add get all tags method
  - add get all foods by tag method
- add Tags Route
- show Tags in Home Component
- generate Tag Component
  - add to Home Component
  - add ts
  - add html
  - add css
7. Cart Page
- create CartItem Model
- create Cart Model
- generate Cart Service
- add to cart button in Product Page
- generate Cart Page Component
  - add Route
  - add ts
  - add html
  - add css
8. Not Found
- Generate Component
  - add ts
  - add html
  - add css
- Add to Pages
  - Home Page
  - Food Page
  - Cart Page
9. Connect to Backend
- create backend folder
- npm init
- npm install typescript
- create tsconfig.json
- create gitignore
- copy data.ts to backend/src
- npm install express cors
- create server.ts
  - install @types
  - add endpoints
  - npm install nodemone ts-node --save-dev
  - add urLs.ts to frontend
  - add HTTPClient Module
  - update Product Service
10. Loading
- add Image
- add Component
- add Service
- add Interceptor
11. Login
- generate component
  - add to routes
  - add ts
  - add html + import Reactive Forms Module
  - add css
- add Login Endpoint
  - use json
  - add jsonwebtoken
  - test using Postman
 - generate User Service 
   - generate User Model
   - add User Subject
   - add Login Method
     - add User Urls
     - generate UserLogin Interface
     - add ngx-toaster
       - import Module
       - import BrowserAnimationsModule
       - add styles in angular.json
     - add to Header
   - add Local Storage Methods
   - add Logout Method 
12. Make Components for Login Page
- Input Container
- Input Validation
- Text Input
- Default Button
13. Connect Login Api to MongoDB Atlas
- move Endpoints into routers
- create .env.file
- install
  - mongoose
  - dotenv
  - bcryptjs
  - express-async-handler
- connect to MongoDB Atlas
- use MongoDB instead of data.ts in apis
14. Register User
- add Register Api
- add Register Service method
- add Register link
- add Register Component
15. Checkout Page
- create Order Model
- create Checkout Page Component and add it to router
- add curent User to User Service
- add latest Cart to Cart Service
- create Order Items List Component
- add Map to the Checkout Page
  - add Leaflet npm package
    - add @types/leaflet
    - add CSS to angular.json
  - add AddressLatLng to Order Model
  - create Map Component
    - add ts
    - add html
    - add css
  - add Auth Guard
16. Save Order
  - add Order Model
  - add Order Status Enum
  - add Auth Middleware
  - add Order Router
    - add Create Api
  - add Order Urls to urls.ts
  - add Order Service
    - add Create Method
  - add Auth Interceptor
17. Payment Page
  - generate Component
  - add getOrderForCurrentUser api
  - add Order Service method
  - connect Component to Service
  - make Map readonly
18. Paypal
- generate Component 
   - add it to Payment Page
- get Paypal Client Id
- add Paypayl JS to index.html
- set up Paypal Button
- add Pay Api to Order Router
- get Paypal Sandbox Account
  <!-- 
  https://developer.paypal.com/dashboard/accounts/edit/5340612346208803333?accountName=sb-g5uzq26620194@personal.example.com

  sb-g5uzq26620194@personal.example.com

  v0Zg/>9Q
  -->

19. Order Track Page
- generate Component
  - add it to routes
- add api
 - add it to url.ts
- add method to Order Service
- add html
- add css
20. Deploy on Render
21. Edit-account
22. Orders Page
23. Favourites
24. Star Rating


## TODO:

- unsubscribe on Destroy
- product lazy loading || home page pagination
- email custom validator
- Admin Dashboard




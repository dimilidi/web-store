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





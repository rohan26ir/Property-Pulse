# PropertyPulse - Client Side  

## Live URL  
[PropertyPulse](https://propertys-pulse.web.app/)  

## Purpose  
The client side of PropertyPulse is the front-end interface for users, members, and admins to interact with the Building Management System. The client handles authentication, dynamic UI rendering, and interaction with the server via API endpoints.  

---

## meaning of user 

 - user is = Tenant
 - member is = Resident
 - admin is = Manager

---

## Key Features  

1. **Authentication System**  
   - Email and password-based login and registration.  
   - OAuth with Google/GitHub.  
   - Password strength validation and error messages.  
   - Persistent private routes after reloading.  

2. **Responsive Design**  
   - Fully responsive for mobile, tablet, and desktop views.  

3. **Dynamic Navigation**  
   - Navbar with conditional icons based on login status.  
   - Profile dropdown with user-specific options.  

4. **Home Page Highlights**  
   - Auto-sliding banner showcasing apartments.  
   - About section with building details in elegant typography.  
   - Coupons displayed attractively for easy visibility.  
   - Location map using a third-party npm package.  

5. **Apartment Management**  
   - Paginated apartment list with details (image, floor, rent, etc.).  
   - Apartment agreement feature with database integration.  
   - Search functionality with rent range filtering.  

6. **Dashboard Pages**  
   - **User Dashboard**: Profile and announcements.  
   - **Member Dashboard**: Profile, payment system, payment history, and announcements.  
   - **Admin Dashboard**: User management, announcements, agreements, and coupon management.  

7. **Secure API Calls**  
   - All Firebase configuration keys and MongoDB credentials are secured with environment variables.  

8. **Data Fetching**  
   - TanStack Query (React Query) for GET requests to enhance performance and caching.  

9. **Notifications**  
   - SweetAlert2 and toastify notifications for CRUD operations and user feedback.  

10. **Animations**  
    - Framer Motion for smooth transitions and animations.  

---

## Tech Stack  

- **React.js**: Frontend library.  
- **Tailwind CSS**: For elegant and responsive UI.  
- **React Router DOM**: For routing and private route management.  
- **TanStack Query**: Efficient data fetching and state management.  
- **SweetAlert2 / Toastify**: Enhanced notifications.  
- **React Icons**: Beautiful icons for UI.  
- **Framer Motion**: Animations for better user experience.  

---

## Notable Commits  

- Added login & registration system with validation.  
- Integrated private routing with token persistence.  
- Designed the responsive apartment listing with pagination & search.  
- Implemented TanStack Query for GET requests.  
- Secured environment variables for Firebase.  

---

## Deployment  
Deployed on Firebase Hosting. Ensure domain is added to Firebase authentication settings.  

---

Requirement pdf :
 - https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-rohan26ir/blob/main/assignment12_category_12.pdf

## Repository Links  
- [Client Repository](https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-rohan26ir.git)

- [Server Repository](https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-rohan26ir.git)

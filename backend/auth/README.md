This folder contains the rewritten authentication module.
Files:
- controllers.js  (login, register, refresh, logout, profile)
- middleware.js   (protect, optionalProtect)

The app's route file backend/routes/authRoutes.js was updated to import from ../auth/*.js

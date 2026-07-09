# Internship Portal - Setup Instructions

## Prerequisites
- MySQL Server installed and running
- Node.js installed

## Database Setup

### Step 1: Connect to MySQL
```bash
mysql -u root -p
```
Enter password: `admin`

### Step 2: Run the setup script
```sql
source setup.sql
```

Or manually copy and paste the contents of `setup.sql` in the MySQL command line.

### Verify the setup
```sql
USE internship;
SHOW TABLES;
DESCRIBE users;
```

## Backend Setup

### Step 1: Install dependencies
```bash
cd backend
npm install
```

### Step 2: Start the server
```bash
node server.js
```

You should see:
```
✅ MySQL Connected Successfully
🚀 Server Running on Port 3000
```

## Common Issues & Solutions

### Error 1: "Database Error" when registering
**Cause:** The `internship` database or `users` table doesn't exist
**Solution:** Run `setup.sql` as shown above

### Error 2: "ECONNREFUSED" or "connect ECONNREFUSED"
**Cause:** MySQL server is not running
**Solution:** Start MySQL server:
- **Windows:** Open Services and start MySQL80 (or your MySQL version)
- **Mac:** `brew services start mysql`
- **Linux:** `sudo service mysql start`

### Error 3: "Access denied for user 'root'@'localhost'"
**Cause:** Wrong MySQL credentials
**Solution:** Update db.js with correct credentials:
```javascript
const db = mysql.createConnection({
    host: "localhost",
    user: "root",      // Change this
    password: "admin", // Change this
    database: "internship"
});
```

### Error 4: "Email already registered"
**Cause:** User already exists with the same email
**Solution:** Use a different email address

## Testing the Application

1. Open `frontend/register.html` in a browser
2. Fill in the registration form
3. Click "Sign Up"
4. If setup correctly, you should see "Signup Successful" message
5. You'll be redirected to login page

## Database Credentials
- **Host:** localhost
- **User:** root
- **Password:** admin
- **Database:** internship
- **Port:** 3306 (default)

## Server Details
- **URL:** http://localhost:3000
- **Register Endpoint:** POST /signup
- **Login Endpoint:** POST /login

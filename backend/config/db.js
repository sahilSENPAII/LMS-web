const { Pool } = require('pg');

const pool = new Pool({
  user: 'lms_user1',          // your role created in pgAdmin
  host: 'localhost',          // PostgreSQL runs locally
  database: 'lms_db2',        // your database
  password: 'password123',     // the password you set
  port: 5432,
});

module.exports = pool;
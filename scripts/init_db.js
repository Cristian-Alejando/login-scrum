// Simple Node script to run the SQL file using mysql CLI if available.
// This script assumes `mysql` client is installed and available in PATH.

const { exec } = require('child_process');
const path = require('path');
const sqlFile = path.join(__dirname, 'init_db.sql');

const host = process.env.DB_HOST || '127.0.0.1';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'login_scrum';

const cmd = `mysql -h ${host} -u ${user} ${password ? `-p${password}` : ''} < "${sqlFile}"`;
console.log('Running:', cmd);

exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error('Error running SQL script:', err);
    process.exit(1);
  }
  console.log('DB initialized');
});

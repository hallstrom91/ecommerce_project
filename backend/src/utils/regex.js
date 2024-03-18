const app = require("../server.js");

/*
===============================================
Email Regex Function
===============================================
*/
// Email Regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/*
===============================================
Password Regex Function
===============================================
*/

/* * - Minimum length of 8 characters.
 * - Must include at least one lowercase letter.
 * - Must include at least one uppercase letter.
 * - Must include at least one digit (0-9).
 * - Must include at least one special character among @$!%*?&. */

// Password Regex
const validatePasswordStrength = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  validateEmail,
  validatePasswordStrength,
};

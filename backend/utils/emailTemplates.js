export const getVerificationEmailTemplate = (name, verificationToken) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .otp-code {
          font-size: 32px;
          font-weight: bold;
          color: #4CAF50;
          text-align: center;
          padding: 20px;
          background-color: #f4f4f4;
          border-radius: 5px;
          margin: 20px 0;
          letter-spacing: 5px;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Verification</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi ${name},</p>
          <p>Thank you for signing up! Please use the following OTP to verify your email address:</p>
          <div class="otp-code">${verificationToken}</div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getPasswordResetEmailTemplate = (name, resetURL) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          background-color: #f44336;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .button {
          display: inline-block;
          padding: 15px 30px;
          font-size: 18px;
          color: #fff;
          background-color: #f44336;
          border: none;
          border-radius: 5px;
          text-decoration: none;
          text-align: center;
          margin: 20px 0;
          cursor: pointer;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi ${name},</p>
          <p>You requested to reset your password. Click the button below:</p>
          <a href="${resetURL}" class="button">Reset Password</a>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getWelcomeEmailTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          background-color: #2196F3;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome!</h1>
        </div>
        <div style="padding: 20px;">
          <p>Hi ${name},</p>
          <p>Welcome to our platform! Your email has been successfully verified.</p>
          <p>You can now access all features of your account.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};


export const getPasswordResetSuccessTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .success-icon {
          text-align: center;
          font-size: 48px;
          color: #4CAF50;
          margin: 20px 0;
        }
        .info-box {
          background-color: #f9f9f9;
          border-left: 4px solid #4CAF50;
          padding: 15px;
          margin: 20px 0;
        }
        .security-tip {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          font-size: 16px;
          color: #fff;
          background-color: #4CAF50;
          border: none;
          border-radius: 5px;
          text-decoration: none;
          text-align: center;
          margin: 20px 0;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
        .alert {
          background-color: #ffebee;
          border-left: 4px solid #f44336;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Successful</h1>
        </div>
        <div style="padding: 20px;">
          <div class="success-icon">✓</div>
          
          <p>Hi ${name},</p>
          
          <div class="info-box">
            <strong>Your password has been successfully reset.</strong>
            <p style="margin: 10px 0 0 0;">You can now log in to your account using your new password.</p>
          </div>

          <p>If you made this change, no further action is required.</p>

          <div class="alert">
            <strong>⚠️ Didn't make this change?</strong>
            <p style="margin: 10px 0 0 0;">If you did not reset your password, please contact our support team immediately. Your account may be compromised.</p>
          </div>

          <div class="security-tip">
            <strong>🔒 Security Tips:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Use a strong, unique password</li>
              <li>Never share your password with anyone</li>
              <li>Enable two-factor authentication if available</li>
              <li>Avoid using the same password across multiple sites</li>
            </ul>
          </div>

          <div style="text-align: center;">
            <a href="${process.env.CLIENT_URL}/login" class="button">Go to Login</a>
          </div>

          <p style="margin-top: 20px;">If you have any questions or concerns, please don't hesitate to contact our support team.</p>
        </div>
        <div class="footer">
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p>This is an automated security notification. Please do not reply to this email.</p>
          <p>If you need assistance, contact us at support@yourdomain.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
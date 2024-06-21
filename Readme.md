# Donation Website

This is a simple donation website built with Node.js and Express, featuring Razorpay payment gateway integration. The website allows users to make donations and receive email notifications with an invoice upon successful payment.

## Project Details

- **Project Name:** Payment Gateway Integration (Web Development Tasks)
- **Organization:** The Sparks Foundation
- **Internship:** Graduate Rotational Internship Program (GRIP) June 2024 (GRIPJUNE24)

## Features

- Home page with a donate button
- Payment page for entering donation amount and email
- Razorpay integration for secure payments
- Invoice generation and email notification on successful payment

## Installation

### Prerequisites

- Node.js and npm installed on your machine

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/som-123/Donation-Site.git
   cd Donation-Site
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Razorpay and email credentials:
   ```bash
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
4. Start the application:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to access the website.

## Acknowledgements

- This project was completed as part of The Sparks Foundation Graduate Rotational Internship Program (GRIP) June 2024 (GRIPJUNE24).
- Special thanks to The Sparks Foundation for providing this opportunity.

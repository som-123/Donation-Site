var express = require('express');
var router = express.Router();
const razorpay = require('../razorpayConfig');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Donate' });
});

router.post('/donate', async (req, res) => {
  const { amount, email } = req.body;

  const options = {
    amount: amount * 100, // amount in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.render('payment', { order_id: order.id, amount, email });
  } catch (error) {
    res.status(500).send('Error creating order');
  }
});

router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, email } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Donation Receipt',
      text: `Thank you for your donation of ₹${amount}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.render('success', { amount });
  } else {
    res.status(400).send('Payment verification failed');
  }
});

router.get('/cancel', (req, res) => {
  res.render('cancel');
});

module.exports = router;

const https = require("https");
const data = JSON.stringify({
  service_id: 'test_service',
  template_id: 'test_template',
  user_id: 'test_user',
  template_params: {
    from_name: 'x',
    from_email: 'x@x.com',
    phone: '123',
    journey_type: 'umrah',
    message: 'hi'
  }
});
const options = {
  hostname: 'api.emailjs.com',
  path: '/api/v1.0/email/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};
const req = https.request(options, (res) => {
  console.log('status', res.statusCode, res.statusMessage);
  res.on('data', (chunk) => process.stdout.write(chunk));
});
req.on('error', console.error);
req.write(data);
req.end();

// pages/api/submit-form.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, email, phone, message } = req.body;
  
      try {
        const response = await fetch('https://finance.uiexpertz.com/wp-json/contact-form-7/v1/contact-forms/5905238/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            your_name: name,
            your_email: email,
            your_phone: phone,
            your_message: message,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          res.status(200).json({ success: true, message: 'Form submitted successfully!' });
        } else {
          res.status(400).json({ success: false, message: data.message });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong!' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  
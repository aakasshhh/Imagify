# Imagify

**Imagify** is an AI-powered image generation web application that transforms user prompts into stunning visuals. Built with the MERN stack, Imagify allows users to generate high-quality images using advanced AI, manage downloads in multiple formats, and authenticate securely via Google OAuth and OTP-based email verification. Users are initially provided with 5 free credits to try out the service and can purchase more credits as needed via Razorpay integration.

![Screenshot 2025-04-20 135124](https://github.com/user-attachments/assets/4c4a2b54-e505-461a-98d2-a0b55b91ac6a)


---

## 🌟Features

- **Prompt-Based Image Generation**: Users enter text prompts and receive unique AI-generated images.
- **Free Credits**: Each user gets 5 free credits to explore the app before making any purchases.
- **Google OAuth**: Simplified and secure login using Google accounts.
- **OTP Email Verification**: Added layer of security during sign-up using One-Time Passwords sent to email.
- **Razorpay Integration**: Seamless and secure payment gateway to buy more image generation credits.
- **Multi-Format Download**: Download generated images in **JPG**, **PNG**, or **PDF** formats.
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices.
- **Secure User Data**: Passwords and user data are encrypted and stored securely in MongoDB.
- **Credit System**: Purchase additional image generation credits as per requirement.


![Screenshot 2025-04-20 135155](https://github.com/user-attachments/assets/e466bb3f-424b-4676-a309-7d9e6cba39f4)

---

## 🛠Technologies Used

### **Frontend**
- React.js
- HTML
- CSS
- JavaScript

### **Backend**
- Node.js
- Express.js

### **Database**
- MongoDB

### **Authentication & Mailing**
- Google OAuth
- Nodemailer (for OTP verification)

### **Payment Integration**
- Razorpay (for credit purchasing system)

---
![Screenshot 2025-04-20 135416](https://github.com/user-attachments/assets/ece7bef2-96d0-40f7-9612-696c7d597a6b)


## 🚀Installation

Follow the steps below to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Imagify.git
   
2. **Navigate to the project directory**
   ```bash
   cd Imagify

3. **Install dependencies**
   ### Backend and Frontend
   ```bash
   cd server
   cd client
   npm install

4. **Setup Enviornment Variables**
   ### Create a .env file in the backend directory and add:**
   ```bash
   MONGO_URL=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MAIL_USER=your-email@example.com
   MAIL_PASS=your-email-password
   PORT=5000

5. **Run the backend**
   ```bash
   cd backend
   npm start
   
6. **Run the frontend**
   ```bash
   cd frontend
   npm start
   
---

## 🧑‍💻Usage
- **Sign Up/Log In:** Use your Google account or email verification to sign up and log in.
- **Generate Images:** Enter prompts and generate images using credits.
- **Download:** Choose from JPG, PNG, or PDF formats to download generated images.
- **Purchase Credits:** Add more credits to continue generating images beyond the free limit.

---

## 🤝Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

---

## 📜 License
Distributed under the MIT License. See LICENSE for more information.

---


## 📬Contact
For any questions or feedback, feel free to reach out at **Email:** aakashjainonline18@gmail.com or **Linkedin:** https://www.linkedin.com/in/aakash-jain-/

---


## 🙏 Acknowledgements
- OpenAI (for image generation APIs)
- MongoDB Documentation
- React.js Documentation
- CSS Tricks
- FreeCodeCamp
- Stack Overflow Community

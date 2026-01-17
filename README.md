
# GOYAL TEXTILES E-commerce Store: Full Setup Guide

Hello! This guide is your new, all-in-one manual for setting up, running, and deploying your e-commerce website on a completely free, modern technology stack.

This project uses:
- **Frontend Hosting**: Cloudflare Pages (Free)
- **Backend API**: Cloudflare Workers (Free)
- **Database**: MongoDB Atlas (Free)
- **Payments**: Razorpay
- **Code Storage**: GitHub

---

## Part 1: Setup Your Services (One-Time Setup)

First, we need to create accounts and get the necessary keys from each service. Do this once, and save the keys securely in a text file on your computer for the next steps.

### 1.1. Create a GitHub Repository

This is where your website's code will live.
1.  Sign up or log in at [GitHub.com](https://github.com).
2.  Create a new repository. You can name it `goyal-textiles-website`. Make it **Private**.
3.  On your new repository's page, click `Add file` > `Upload files`.
4.  Drag and drop **all the project files** I have provided into the browser window.
5.  Click `Commit changes` to save the files.

### 1.2. Get Razorpay API Keys

This allows you to accept payments.
1.  Sign up or log in at [Razorpay.com](https://razorpay.com/).
2.  You might need to complete KYC to accept real payments. For now, you can work in **Test Mode**.
3.  In your Razorpay Dashboard, navigate to `Settings` > `API Keys`.
4.  Click `Generate Key` to get your `Key ID` and `Key Secret`.
5.  **Copy and save both of these somewhere safe.**

### 1.3. Set Up MongoDB Atlas Database

This is where your order information will be stored.
1.  Sign up or log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Create a new project.
3.  Click `Build a Database` and choose the **FREE M0 cluster**.
4.  It will ask you to create a database user. Enter a **username** and **password**. Save them securely.
5.  In the "Network Access" section, click `Add IP Address`. Select **"ALLOW ACCESS FROM ANYWHERE"** and confirm. (This is for simplicity; for higher security, you can restrict this later).
6.  Go back to your database cluster, click `Connect` > `Drivers`.
7.  You will see a "connection string" (URI). It looks like `mongodb+srv://...`. **Copy this string.**
8.  **Important**: Replace `<password>` in the string with the actual database user password you created.

### 1.4. Create a Cloudflare Account

This is the service that will run your website.
1.  Sign up for a free account at [Cloudflare.com](https://dash.cloudflare.com/sign-up). No credit card is required.

---

## Part 2: Local Development (Testing on Your Computer)

This lets you run the website on your own machine to see changes before they go live.

### 2.1. Install Tools
-   **Visual Studio Code (VS Code):** A free code editor. [Download here](https://code.visualstudio.com/).
-   **Node.js:** A JavaScript runtime. [Download the "LTS" version here](https://nodejs.org/).

### 2.2. Get the Code
1.  Open VS Code. Go to `File` > `Open Folder...` and select the project folder you downloaded.
2.  In the VS Code menu, go to `Terminal` > `New Terminal`.

### 2.3. Install Dependencies
In the terminal, type this command and press Enter. This downloads all the necessary libraries for the project.
```bash
npm install
```

### 2.4. Create Local Secrets File (`.dev.vars`)
For the website to work locally, it needs your secret keys.
1.  In the VS Code file explorer, right-click in an empty space and select `New File`.
2.  Name the file exactly: `.dev.vars`
3.  Copy and paste the following into this new file:

```
MONGODB_URI="your_mongodb_connection_string"
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
```
4.  Replace the placeholder text with your actual keys from Part 1. Make sure the MongoDB URI includes your password.
5.  **This file is ignored by GitHub and will never be uploaded, keeping your secrets safe.**

### 2.5. Run the Development Server
In the terminal, type this command and press Enter:
```bash
npm run dev
```
Your website is now running at `http://localhost:8788`. Open this address in your browser to see it! You can make code changes and see them update live.

---

## Part 3: Deploy to the Internet

This will make your website live for everyone.

### 3.1. Create a Cloudflare Pages Project
1.  Log in to your Cloudflare dashboard.
2.  Go to `Workers & Pages` > `Create application` > `Pages` > `Connect to Git`.
3.  Connect your GitHub account and select your `goyal-textiles-website` repository.
4.  Click `Begin setup`.

### 3.2. Configure Build Settings
Cloudflare needs to know how to build your site. Use these settings:
-   **Project name:** `goyal-textiles-website` (or whatever you like)
-   **Framework preset:** `Vite`
-   **Build command:** `npm run build`
-   **Build output directory:** `dist`

### 3.3. Add Production Secrets
This is the most important step. We need to give the live website your secret keys.
1.  Click `Save and Deploy`. The first deployment might fail, which is okay.
2.  Go to your new project's dashboard in Cloudflare.
3.  Go to `Settings` > `Environment variables`.
4.  Under "Production", click `Add variable` for each of the following:
    -   `MONGODB_URI` - Paste your MongoDB connection string.
    -   `RAZORPAY_KEY_ID` - Paste your Razorpay Key ID.
    -   `RAZORPAY_KEY_SECRET` - Paste your Razorpay Key Secret.
5.  Click the `Encrypt` button for each secret to keep them secure.

### 3.4. Final Deployment
1.  After adding the variables, go to the `Deployments` tab of your project.
2.  Find the failed deployment, click the three dots, and choose `Retry deployment`.
3.  This time, it will build with the correct secrets and succeed.
4.  Once finished, Cloudflare will give you a live URL (e.g., `goyal-textiles.pages.dev`). Your website is now live!

---

## Part 4: How to Update Content

This is just like before. All your content is in easy-to-edit files.

### 4.1. Changing Product Details, Prices & Photos
-   **File to Edit:** `data/products.ts`
-   Open this file to change product names, descriptions, prices, and image paths.
-   To add your own photos, place them in the `public/images` folder and update the `images: [...]` array for the product (e.g., `images: ['/images/my-new-fabric.webp']`).

### 4.2. Changing Your Shop's Address and Phone Number
-   **File to Edit:** `components/Footer.tsx`
-   Open this file and find the "About Us" section to edit your contact details directly.

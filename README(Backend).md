
# GOYAL TEXTILES E-commerce Store: Full Setup Guide (Cloudflare + Render)

Hello! This guide is your new, all-in-one manual for setting up, running, and deploying your e-commerce website using a modern, scalable, and free-to-start technology stack.

This project uses:
- **Frontend Hosting**: Cloudflare Pages (Free)
- **Backend Hosting**: Render (Free tier available)
- **Database**: MongoDB Atlas (Free)
- **Code Storage**: GitHub

---

## Architecture Overview

-   **Frontend (Your Storefront):** A React application built with Vite and hosted on **Cloudflare Pages**. It's fast, globally distributed, and handles all the user-facing parts of your store.
-   **Backend (Your Server):** A Node.js application built with **Express.js** and hosted on **Render**. It handles all business logic, such as creating orders and connecting securely to the database.
-   **Database:** Your **MongoDB Atlas** database stores all your data, such as products and customer orders.

This separation is a professional standard that makes your application more robust, secure, and easier to manage.

---

## Part 1: One-Time Service Setup

First, let's get the necessary accounts and keys.

### 1.1. GitHub Repository
This is where your code lives. If you've already done this, you can skip this step.
1.  Sign up or log in at [GitHub.com](https://github.com).
2.  Create a new, **Private** repository (e.g., `goyal-textiles-website`).
3.  Upload all the project files I have provided.

### 1.2. MongoDB Atlas Database
This is where your orders and products will be stored.
1.  Sign up or log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Create a free **M0 cluster**.
3.  Create a database user with a secure **username** and **password**. Save them.
4.  Under "Network Access," select **"ALLOW ACCESS FROM ANYWHERE"**.
5.  Click `Connect` > `Drivers` and copy the **connection string** (URI).
6.  **Important**: Replace `<password>` in the string with your actual database user password. Save this complete string.

### 1.3. Cloudflare & Render Accounts
1.  **Cloudflare:** Sign up for a free account at [Cloudflare.com](https://dash.cloudflare.com/sign-up). This is for your frontend.
2.  **Render:** Sign up for an account at [Render.com](https://dashboard.render.com/). You can log in with your GitHub account. This is for your backend.

---

## Part 2: Local Development (Testing on Your Computer)

This lets you run the entire website on your machine.

### 2.1. Install Tools
-   **Visual Studio Code (VS Code):** [Download here](https://code.visualstudio.com/).
-   **Node.js:** [Download the "LTS" version here](https://nodejs.org/).

### 2.2. Configure Environment Variables
Secrets and configuration are managed in `.env` files.

1.  **Frontend Configuration:**
    -   In the **root directory** of the project, create a new file named `.env`.
    -   Add the following line. This tells your frontend where to find the backend when running locally.
    ```
    VITE_API_BASE_URL="http://localhost:3001"
    ```

2.  **Backend Configuration:**
    -   Navigate into the `backend/` directory.
    -   Create a new file named `.env`.
    -   Add the following, replacing the placeholder with your MongoDB connection string from Part 1.
    ```
    # Your MongoDB connection string
    MONGODB_URI="your_mongodb_connection_string"

    # The port the backend server will run on locally
    PORT="3001"

    # The URL of your frontend for Cross-Origin Resource Sharing (CORS)
    FRONTEND_URL="http://localhost:5173"
    
    # Set node environment to development
    NODE_ENV="development"
    ```

### 2.3. Install Dependencies & Seed Database
You only need to run commands from the root directory.

1.  Open a terminal in VS Code (`Terminal` > `New Terminal`).
2.  Run the installation command. This will install dependencies for both the frontend and the backend automatically.
    ```bash
    npm install
    ```
3.  **Seed the Database (CRITICAL STEP):** Your backend needs product data in MongoDB to work. Run the following command from the root directory to import all products.
    ```bash
    npm run import-data --prefix backend
    ```
    You should see a "Data Imported!" message. You only need to do this once.

### 2.4. Run the Development Servers
1.  Run the main development command from the root directory.
    ```bash
    npm run dev
    ```
This command uses `concurrently` to start both the frontend and backend servers at the same time.
-   Your frontend will be available at `http://localhost:5173`.
-   Your backend should be running on `http://localhost:3001`.

You can now test the full checkout flow locally. When you place an order, it will be saved to your live MongoDB Atlas database.

---

## Part 3: Deploying to the Internet

We will deploy the backend first, then the frontend.

### 3.1. Deploy the Backend to Render
1.  Log in to your Render dashboard.
2.  Click `New` > `Web Service`.
3.  Select your GitHub repository.
4.  Configure the service:
    -   **Name:** `goyal-textiles-backend` (or similar)
    -   **Root Directory:** `backend`
    -   **Environment:** `Node`
    -   **Build Command:** `npm install && npm run build`
    -   **Start Command:** `npm start`
5.  Click `Advanced` and go to `Environment Variables`. Add the following:
    -   `MONGODB_URI`: Paste your full MongoDB connection string.
    -   `FRONTEND_URL`: Leave this blank for now. We'll add it after deploying the frontend.
    -   `NODE_ENV`: `production`
6.  Click `Create Web Service`. Render will build and deploy your backend.
7.  Once deployed, copy the public URL provided by Render (e.g., `https://goyal-textiles-backend.onrender.com`).

### 3.2. Deploy the Frontend to Cloudflare Pages
1.  Log in to your Cloudflare dashboard.
2.  Go to `Workers & Pages` > `Create application` > `Pages` > `Connect to Git`.
3.  Select your GitHub repository.
4.  Configure the build settings:
    -   **Framework preset:** `Vite`
    -   **Build command:** `npm run build`
    -   **Build output directory:** `dist`
5.  Go to `Environment variables` and click `Add variable`. This is the most important step.
    -   **Variable name:** `VITE_API_BASE_URL`
    -   **Variable value:** Paste the **Render URL** you copied in the previous step.
6.  Click `Save and Deploy`. Cloudflare will build and deploy your frontend.
7.  Once finished, you will get a live URL (e.g., `goyal-textiles.pages.dev`). **This is your live website URL.**

### 3.3. Final Step: Connect Frontend and Backend
1.  Go back to your **Render project's `Environment` tab**.
2.  Update the `FRONTEND_URL` variable with your live **Cloudflare URL**.
3.  This tells your backend to accept requests from your live frontend, enabling the checkout process to work in production. Your backend will automatically redeploy with the new variable.

**Your site is now live!** The Cloudflare frontend is successfully communicating with the Render backend.

---

## Part 4: Customization & Content Management

This section explains how to safely update the website's content and visual style.

### 4.1. Managing Products
-   All product data is now managed in the backend database.
-   To add, remove, or edit products, you should modify the `backend/src/data/products.ts` file.
-   After making changes, you must run the seeder script again to update the database:
    ```bash
    # Run from the root directory
    npm run import-data --prefix backend
    ```
    **Warning:** This script will delete all existing products and orders before importing the new data. This is suitable for development but will need a more advanced migration strategy for a live production site with real orders.

### 4.2. Animation & Interaction Philosophy

The website's animations are designed to feel **calm, premium, and trustworthy**. The goal is to provide smooth, subtle feedback to user actions without being distracting.

-   **Motion:** Interactions use gentle `ease-out` easing curves for a natural feel.
-   **Interactions:** Cards use a consistent "lift" (`translate`) effect on hover and a "press" (`scale`) effect on tap to feel responsive and tangible.
-   **Performance:** All animations are lightweight, CSS-driven transformations to ensure the site remains fast and fluid, even on less powerful devices.

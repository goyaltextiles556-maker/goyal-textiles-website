
# GOYAL TEXTILES E-commerce Store: Full Setup Guide (Railway + Cloudflare)

Hello! This guide is your new, all-in-one manual for setting up, running, and deploying your e-commerce website using a modern, scalable, and free-to-start technology stack.

This project uses:
- **Frontend Hosting**: Cloudflare Pages (Free)
- **Backend Hosting**: Railway (Free tier available)
- **Database**: MongoDB Atlas (Free)
- **Code Storage**: GitHub

---

## Architecture Overview

-   **Frontend (Your Storefront):** A React application built with Vite and hosted on **Cloudflare Pages**. It's fast, globally distributed, and handles all the user-facing parts of your store.
-   **Backend (Your Server):** A Node.js application built with Hono and hosted on **Railway**. It handles business logic, like creating orders and connecting to the database.
-   **Database:** Your **MongoDB Atlas** database stores all your data, such as customer orders.

This separation is a professional standard that makes your application more robust and easier to manage.

---

## Part 1: One-Time Service Setup

First, let's get the necessary accounts and keys.

### 1.1. GitHub Repository
This is where your code lives. If you've already done this, you can skip this step.
1.  Sign up or log in at [GitHub.com](https://github.com).
2.  Create a new, **Private** repository (e.g., `goyal-textiles-website`).
3.  Upload all the project files I have provided.

### 1.2. MongoDB Atlas Database
This is where your orders will be stored.
1.  Sign up or log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Create a free **M0 cluster**.
3.  Create a database user with a secure **username** and **password**. Save them.
4.  Under "Network Access," select **"ALLOW ACCESS FROM ANYWHERE"**.
5.  Click `Connect` > `Drivers` and copy the **connection string** (URI).
6.  **Important**: Replace `<password>` in the string with your actual database user password. Save this complete string.

### 1.3. Cloudflare & Railway Accounts
1.  **Cloudflare:** Sign up for a free account at [Cloudflare.com](https://dash.cloudflare.com/sign-up). This is for your frontend.
2.  **Railway:** Sign up for an account at [Railway.app](https://railway.app/). You can log in with your GitHub account. This is for your backend.

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
    ```

### 2.3. Install Dependencies & Run
You only need to run one command from the root directory.

1.  Open a terminal in VS Code (`Terminal` > `New Terminal`).
2.  Run the installation command. This will install dependencies for both the frontend and backend.
    ```bash
    npm install
    ```
3.  Run the development server.
    ```bash
    npm run dev
    ```
This command starts both the frontend and backend servers at the same time.
-   Your frontend will be available at `http://localhost:5173`.
-   Your backend will be running on `http://localhost:3001`.

You can now test the full checkout flow locally. When you place an order, it will be saved to your live MongoDB Atlas database.

---

## Part 3: Deploying to the Internet

We will deploy the backend first, then the frontend.

### 3.1. Deploy the Backend to Railway
1.  Log in to your Railway dashboard.
2.  Click `New Project` > `Deploy from GitHub repo`.
3.  Select your `goyal-textiles-website` repository.
4.  Railway will detect it's a Node.js project. It might ask for a "Root Directory". Enter: `backend`.
5.  Once the project is created, go to the `Variables` tab.
6.  Add two variables:
    -   `MONGODB_URI`: Paste your full MongoDB connection string.
    -   `PORT`: `3001` (Railway will manage the public-facing port, but our app needs to know which internal port to use).
    -   `FRONTEND_URL`: Leave this blank for now. We'll get the URL from Cloudflare in the next step.
7.  Go to the `Settings` tab for your project. Under "Domains", you will find a public URL (e.g., `goyal-backend-production.up.railway.app`). **Copy this URL.** This is your live backend API address.

### 3.2. Deploy the Frontend to Cloudflare Pages
1.  Log in to your Cloudflare dashboard.
2.  Go to `Workers & Pages` > `Create application` > `Pages` > `Connect to Git`.
3.  Select your `goyal-textiles-website` repository.
4.  Configure the build settings:
    -   **Framework preset:** `Vite`
    -   **Build command:** `npm run build`
    -   **Build output directory:** `dist`
5.  Go to `Environment variables` and click `Add variable`. This is the most important step.
    -   **Variable name:** `VITE_API_BASE_URL`
    -   **Variable value:** Paste the **Railway URL** you copied in the previous step.
6.  Click `Save and Deploy`. Cloudflare will build and deploy your frontend.
7.  Once finished, you will get a live URL (e.g., `goyal-textiles.pages.dev`). **This is your live website URL.**

### 3.3. Final Step: Connect Frontend and Backend
1.  Go back to your **Railway project's `Variables` tab**.
2.  Update the `FRONTEND_URL` variable with your live **Cloudflare URL**.
3.  This tells your backend to accept requests from your live frontend, enabling the checkout process to work in production. Your backend will automatically redeploy with the new variable.

**Your site is now live!** The Cloudflare frontend is successfully communicating with the Railway backend.

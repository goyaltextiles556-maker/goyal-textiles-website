
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
You only need to run commands from the root directory.

1.  Open a terminal in VS Code (`Terminal` > `New Terminal`).
2.  Run the installation command. This will install dependencies for both the frontend and the backend automatically.
    ```bash
    npm install
    ```
3.  Run the development server.
    ```bash
    npm run dev
    ```
This command uses `concurrently` to start both the frontend and backend servers at the same time.
-   Your frontend will be available at `http://localhost:5173`.
-   Your backend should be running on `http://localhost:3001`.

You can now test the full checkout flow locally. When you place an order, it will be saved to your live MongoDB Atlas database.

#### **Troubleshooting: If the Backend Doesn't Start**
If you run `npm run dev` and find that only the frontend starts (e.g., checkout fails with a network error), your system might have an issue with the `concurrently` script. You can run the servers manually in separate terminals instead:

**Terminal 1: Start the Backend**
1. Open a new terminal in VS Code.
2. Run the following command from the project's root directory:
   ```bash
   npm run dev:backend
   ```
3. Leave this terminal running. You should see a message that the server is on port 3001.

**Terminal 2: Start the Frontend**
1. Open a second terminal (click the `+` icon in the terminal panel).
2. Run the following command from the project's root directory:
   ```bash
   npm run dev:frontend
   ```
3. Your frontend will now be running on `http://localhost:5173`.

#### **Troubleshooting: Fixing MongoDB `querySrv ECONNREFUSED` Error**
If your backend fails to start and you see an error like `Failed to connect to MongoDB Atlas Error: querySrv ECONNREFUSED`, it means your current network (ISP, firewall, or router) is blocking the type of DNS lookup required by the `mongodb+srv://` connection string.

**The Solution:** Use the "Standard Connection String" which lists the servers directly and doesn't rely on the special SRV DNS record.

Follow these steps to get the correct string:

1.  **Go to your MongoDB Atlas dashboard.**
2.  Navigate to your cluster and click the **Connect** button.
3.  Select the **Drivers** connection method (it should be selected by default).
4.  You will see a "Connection String" section. **Do not copy the default string.**
5.  Instead, find the version dropdown (it might say "Node.js" and a version number). Click it and select a version that is **2.2.12 or later**. This is a trick to make Atlas show the older, standard connection string format.
6.  A new connection string will appear. It will start with `mongodb://` instead of `mongodb+srv://`. It will also be longer and list multiple hosts. **This is the one you need.**
7.  Click the **Copy** button.
8.  Open your `backend/.env` file.
9.  **Replace the entire `MONGODB_URI`** with this new string you just copied.
10. Remember to replace `<password>` with your actual database user password in the string.
11. **Restart your backend server** (`npm run dev:backend` or the full `npm run dev` command).

After this change, your backend terminal should now show the message: `Successfully connected to MongoDB Atlas!` and your checkout process will work correctly.

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
    -   `MONGODB_URI`: Paste your full MongoDB connection string. (Use the new `mongodb://` string here as well, it's more robust).
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

---

## Part 4: Customization & Content Management

This section explains how to safely update the website's content, translations, and visual style.

### 4.1. How to Manage Website Language (Internationalization)

The website is now fully bilingual (English/Hindi). All text is managed from central files, making it easy for you to add or edit translations without touching the application's logic.

**There are two types of text to translate:**

1.  **Static UI Text:** Labels, buttons, titles, policy pages, etc.
2.  **Dynamic Content Text:** Product names, descriptions, categories, etc.

#### **Editing Static UI Text (e.g., Buttons, Policy Pages, FAQ)**

1.  **Open the file:** `translations/locales.ts`
2.  This file contains an object with two keys: `en` for English and `hi` for Hindi.
3.  To add a Hindi translation, find the matching key under the `hi` object and replace the placeholder text.

**Example: Translating the "Add to Cart" button**

```javascript
// Inside translations/locales.ts

export const translations = {
  en: {
    // ... other text
    addToCart: 'Add to Cart',
  },
  hi: {
    // ... other text
    // 1. Find the key 'addToCart'
    // 2. Replace the placeholder with your Hindi translation
    addToCart: 'कार्ट में डालें', // Changed from '[हिन्दी] Add to Cart'
  }
};
```
That's it! The website will automatically pick up the new translation when you switch to Hindi.

#### **Editing Dynamic Product & Category Text**

1.  **Open the file:** `data/products.ts`
2.  Find the product or category you want to translate.
3.  Each object now has fields ending in `_hi` (e.g., `name_hi`, `description_hi`).
4.  Add your Hindi translation as the value for these fields.

**Example: Translating a category name**

```javascript
// Inside data/products.ts

export const categories: Category[] = [
  {
    id: 'suiting',
    name: 'Suiting Fabric',
    // 1. Find the 'name_hi' field
    // 2. Replace the placeholder with your Hindi translation
    name_hi: 'सूटिंग फैब्रिक', // Changed from '[हिन्दी] Suiting Fabric'
    image: '...'
  },
  // ... other categories
];
```

The website will automatically display the `_hi` version when the language is set to Hindi. If a `_hi` field is empty, it will safely fall back to the English version.

#### **Editing FAQ Content**

1.  **Open the file:** `translations/locales.ts`
2.  Scroll to the `faq` section inside both the `en` and `hi` objects.
3.  You can edit, add, or remove questions by modifying the `questions` array. Each item in the array is an object with a `q` (question) and `a` (answer).

**Example: Adding a new FAQ item**
```javascript
// Inside the 'questions' array for English
{
    q: 'What are your store hours?',
    a: 'Our physical store is open from 10 AM to 8 PM, Monday to Saturday.'
}

// And for Hindi
{
    q: '[हिन्दी] What are your store hours?',
    a: '[हिन्दी] Our physical store is open from 10 AM to 8 PM, Monday to Saturday.'
}
```

### 4.2. Animation & Interaction Philosophy

The website's animations are designed to feel **calm, premium, and trustworthy**. The goal is to provide smooth, subtle feedback to user actions without being distracting.

-   **Motion:** Interactions use gentle `ease-out` easing curves for a natural feel.
-   **Interactions:** Cards use a consistent "lift" (`translate`) effect on hover and a "press" (`scale`) effect on tap to feel responsive and tangible.
-   **Performance:** All animations are lightweight, CSS-driven transformations to ensure the site remains fast and fluid, even on less powerful devices.

### 4.3. How to Customize Animations & Interactions

You can easily tweak the feel of the card interactions by changing a few Tailwind CSS classes.

-   **Files to Edit:**
    -   `components/CategoryCard.tsx`
    -   `components/ProductCard.tsx`

**Example: Adjusting the "Lift" on a Product Card**

1.  Open `components/ProductCard.tsx`.
2.  Find the main `div` with a `className` attribute.
3.  Look for the `hover:-translate-y-1.5` class. This class is what makes the card move up on hover.
    -   To make the lift **higher**, change it to `hover:-translate-y-2`.
    -   To make it **more subtle**, change it to `hover:-translate-y-1`.
    -   To **remove it**, delete the class entirely.

**Example: Adjusting the Animation Speed**

1.  In the same component, find the `duration-300` class. This controls the animation speed (300 milliseconds).
    -   To make the animation **faster**, use a smaller number like `duration-200`.
    -   To make it **slower**, use a larger number like `duration-500`.

By changing these simple classes, you can fine-tune the site's animations to your exact preference while maintaining the core structure.
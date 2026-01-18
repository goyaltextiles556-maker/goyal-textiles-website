
# Content & Customization Guide

Hello! This guide is your go-to manual for safely updating the content, images, and styles on your GOYAL TEXTILES website.

This guide is designed for non-developers. If you follow these instructions, you can confidently customize your site's look and feel without breaking any core functionality.

## Editing Philosophy: Stay Safe!

Think of your website like a car. This guide shows you how to change the paint color, seat covers, and what's playing on the radio. It will **not** tell you how to modify the engine.

-   **Make small changes and check your work.** Change one thing, then look at the website to see the result.
-   **Focus on content and style.** Stick to changing text, images, and colors.
-   **When in doubt, don't change it.** If a piece of code looks complex or involves logic, it's best to leave it alone.

---

## 1. How to Change Images

Your website's images are easy to change. The process is always the same:
1.  Add your new image file to the `public/images/` folder.
2.  Find the line of code for the image you want to replace.
3.  Update the path to point to your new image file (e.g., change `'https://picsum.photos/...'` to `'/images/my-new-fabric.webp'`).

Here is a map of where to find each image:

| Image Type          | File to Edit                                 | How to Find It                                                                          | Recommended Size/Ratio |
| ------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------- |
| **Hero Banner**     | `pages/HomePage.tsx`                         | Look for the `<img ... />` tag with `src="https://picsum.photos/seed/hero-fabric/..."`.   | Landscape (e.g., 16:9) |
| **Category Images** | `data/products.ts`                           | In the `categories` list, find the `image:` property for each category.                 | Landscape (3:2)        |
| **Product Images**  | `data/products.ts`                           | In the `products` list, find the `images:` property. You can list multiple images here. | Square (1:1)           |

---

## 2. How to Style the Checkout Page

You can safely change the appearance of the checkout page.

-   **File to Edit:** `pages/CheckoutPage.tsx`

This file uses **Tailwind CSS classes** to style everything. These are the short names inside the `className="..."` attribute.

#### Safe Changes:
-   **Order Summary Box:** Find the `div` with `bg-white p-6 border...`.
    -   To change the background color, edit `bg-white`.
    -   To change the padding (internal spacing), edit `p-6`.
    -   To change the roundness of corners, edit `rounded-lg`.
-   **Form Fields:** The `<input>` tags and their `<label>`s are styled with classes.
    -   You can change border colors (`border-gray-300`), focus ring colors (`focus:ring-primary-blue`), and spacing between fields (`space-y-4` on the parent `div`).

#### ❗️ Risky / Unsafe Changes (Do Not Touch!):
-   Do not change or remove `name` or `id` attributes on the `<input>` tags.
-   Do not change the `onSubmit={handlePlaceOrder}` function on the `<form>` tag.
-   Do not edit any code inside the `handlePlaceOrder` function. This handles the payment logic.

---

## 3. How to Update the "About Us" Section

The "About Us" and contact details are located in the website footer.

-   **File to Edit:** `components/Footer.tsx`

Open this file and scroll to the section with the `<!-- About Us Section -->` comment. You can edit the text directly:

```jsx
// ...
<div>
  <h3 ...>About Us</h3>
  <p className="font-bold text-white">GOYAL TEXTILES</p>
  <p className="text-sm text-gray-200 mt-2">123 Fabric Lane, Textile Market</p> {/* <-- Change Address Here */}
  <p className="text-sm text-gray-200">New Delhi, India</p> {/* <-- And Here */}
  <p className="mt-2 text-sm text-gray-200">Mobile: +91 98765 43210</p> {/* <-- Change Phone Here */}
</div>
// ...
```

---

## 4. The Golden Rules: Safe vs. Unsafe Changes

This is the most important part of the guide. Stick to the "Safe" list.

### ✅ Safe Changes (Go for it!)
-   **Text:** Any visible text on the page is safe to change.
-   **Images:** Any image URL or path is safe to change.
-   **Styling (Tailwind CSS):** It's safe to change classes related to:
    -   **Colors:** `bg-`, `text-`, `border-` (e.g., `bg-primary-blue`, `text-gray-800`).
    -   **Spacing:** `p-` (padding), `m-` (margin), `space-` (e.g., `p-4`, `mt-8`).
    -   **Sizing:** `w-` (width), `h-` (height) (e.g., `w-full`, `h-24`).
    -   **Font:** `font-`, `text-` (e.g., `font-bold`, `text-lg`).
    -   **Borders:** `border`, `rounded-` (e.g., `border-2`, `rounded-full`).

### ❌ Unsafe Changes (Danger Zone!)
-   **Logic:** Any file ending in `.ts` or `.tsx` that contains functions, `useState`, `useEffect`, `useCart`, `onClick={...}`, or complex calculations.
-   **Routing:** Do not edit `App.tsx` or any `<Route ...>` components.
-   **State Management:** Do not edit `context/CartContext.tsx` or `hooks/useCart.ts`.
-   **Backend/API:** Do not edit anything in the `functions/` folder. This handles payments and the database.
-   **File Names:** Do not rename or move files or folders.

---

## 5. Quick File-by-File Map

"If I want to change X, I should edit file Y."

| To Change...                                      | Edit This File...                                             |
| ------------------------------------------------- | ------------------------------------------------------------- |
| **Global Colors & Fonts**                         | `index.html` (inside the `<script>` with `tailwind.config`)     |
| **Header Text ("GOYAL TEXTILES")**                  | `components/Header.tsx`                                       |
| **Footer Content (Address, Links)**               | `components/Footer.tsx`                                       |
| **Homepage Hero Title & Text**                    | `pages/HomePage.tsx`                                          |
| **Category Names & Images**                       | `data/products.ts` (in the `categories` array)                |
| **Category Card Layout/Spacing**                  | `pages/HomePage.tsx` (the `grid` container)                   |
| **Product Details, Prices, Images & Descriptions** | `data/products.ts` (in the `products` array)                  |
| **Product List Page Title & Layout**              | `pages/ProductListPage.tsx`                                   |
| **Cart Page Text & Titles**                       | `pages/CartPage.tsx`                                          |
| **Checkout Page Text & Layout**                   | `pages/CheckoutPage.tsx`                                      |

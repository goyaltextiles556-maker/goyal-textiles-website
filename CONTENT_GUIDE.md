
# Content & Customization Guide

Hello! This guide is your go-to manual for safely updating the content, images, and styles on your GOYAL TEXTILES website.

This guide is designed for non-developers. If you follow these instructions, you can confidently customize your site's look and feel without breaking any core functionality.

## Editing Philosophy: Stay Safe!

Think of your website like a car. This guide shows you how to change the paint color, seat covers, and what's playing on the radio. It will **not** tell you how to modify the engine.

-   **Make small changes and check your work.** Change one thing, then look at the website to see the result.
-   **Focus on content and style.** Stick to changing text, images, and colors.
-   **When in doubt, don't change it.** If a piece of code looks complex or involves logic, it's best to leave it alone.

---

## Quick File-by-File Map

"If I want to change X, I should edit file Y."

| To Change...                                      | Edit This File...                                             |
| ------------------------------------------------- | ------------------------------------------------------------- |
| **All Product & Category Info**                   | `data/products.ts`                                            |
| **Global Colors & Fonts**                         | `index.html` (inside the `<script>` with `tailwind.config`)     |
| **Header Text ("GOYAL TEXTILES")**                  | `components/Header.tsx`                                       |
| **Footer Content (Address, Links)**               | `components/Footer.tsx`                                       |
| **Homepage Hero Image, Title & Text**             | `pages/HomePage.tsx`                                          |
| **Product List Page Title & Layout**              | `pages/ProductListPage.tsx`                                   |
| **Cart Page Text & Titles**                       | `pages/CartPage.tsx`                                          |
| **Checkout Page Text & Layout**                   | `pages/CheckoutPage.tsx`                                      |

---

## 1. How to Manage Images

### Changing an Image
Your website's images are easy to change. The process is always the same:
1.  Add your new image file to the `public/images/` folder (see recommended structure below).
2.  Find the line of code for the image you want to replace (usually in `data/products.ts`).
3.  Update the path to point to your new image file (e.g., change `'https://picsum.photos/...'` to `'/images/suiting/my-new-fabric.webp'`).

### Recommended Image Folder Structure
To keep your images organized as your collection grows, we recommend creating folders for each category inside `public/images/`.

**Example Structure:**
```
public/
└── images/
    ├── suiting/
    │   ├── classic-navy-wool.webp
    │   └── charcoal-pinstripe.webp
    ├── shirting/
    │   └── crisp-white-cotton.webp
    └── gifting/
        └── premium-combo.webp
```

When you use this structure, your image paths in `data/products.ts` will look like this:
`images: ['/images/suiting/classic-navy-wool.webp']`

This is just for organization and makes finding images much easier. It does not change how the website works.

---

## 2. How to Manage Products & Categories

All your product and category information is stored in a single, easy-to-edit file.

-   **File to Edit:** `data/products.ts`

Inside this file, you will see two main lists: `categories` and `products`. They are simple JavaScript arrays of objects, which look like a structured list.

### Adding a New Product
Follow these steps carefully to add a new product:

1.  **Open `data/products.ts`.**
2.  Scroll down to the `export const products` list.
3.  **Copy an entire existing product object**, from the opening `{` to the closing `}` including the comma.
4.  Paste it at the end of the list, before the closing `];`.
5.  **Change the values** for your new product.

Here is a template for a new product:
```javascript
{
  id: 's003', // REQUIRED: Must be unique! No spaces or special characters.
  name: 'New Light Grey Fabric', // REQUIRED
  brand: 'YourBrand', // Optional
  description: 'A short, one-sentence description for the product list page.', // REQUIRED
  longDescription: 'A longer, more detailed description for the product detail page.', // REQUIRED
  price: 1500, // REQUIRED: The selling price. Just the number.
  originalPrice: 1800, // Optional: If you add this, a discount will be shown.
  unit: 'meter', // REQUIRED: Can be 'meter' or 'set'.
  category: 'suiting', // REQUIRED: Must exactly match a category 'id'.
  images: ['/images/suiting/new-light-grey.webp'], // REQUIRED: Path to image(s).
  intendedUse: 'Formal suits, blazers.', // REQUIRED
  materialDetails: '90% Wool, 10% Silk.', // REQUIRED
},
```

### Editing an Existing Product
1.  Open `data/products.ts`.
2.  Find the product you want to edit in the `products` list. You can search for it by `name` or `id`.
3.  Change any of the values like `name`, `price`, `description`, etc. It is safe to edit any field.
4.  **Best Practice:** Avoid changing a product's `id` after it's been created, as this could affect historical data if you had an analytics system.

### Managing Prices & Discounts
-   **Price:** The `price` field is the final selling price. It must be a number without commas or currency symbols (e.g., `1200`).
-   **Discounts:** To show a discount, add the `originalPrice` field. The website will automatically calculate the percentage off and show the original price with a strikethrough. If a product is not on sale, simply remove the `originalPrice` line for that product.

### Common Mistakes to Avoid
-   **Duplicate IDs:** Every product `id` MUST be unique. If you duplicate one, the website may show the wrong product or behave incorrectly.
-   **Wrong Category ID:** The `category` field on a product (e.g., `'suiting'`) must exactly match an `id` from the `categories` list at the top of the file. If it doesn't match, the product won't appear on that category's page.
-   **Broken Image Paths:** Double-check that the path in the `images` array is correct and the image file actually exists in the `public/images/` folder.

### ✅ Safe Product Editing Checklist
Before you save the `data/products.ts` file, run through this quick checklist for any new product you've added:

-   [ ] Is the `id` unique?
-   [ ] Does the `category` value match an existing category `id`?
-   [ ] Is the image path correct (e.g., `/images/suiting/my-product.webp`)?
-   [ ] Is the `price` a plain number (e.g., `1200`)?

---

## 3. How to Style Pages & Change Static Text

### Styling the Checkout Page
-   **File to Edit:** `pages/CheckoutPage.tsx`

This file uses **Tailwind CSS classes** (the short names inside `className="..."`) to style everything.

-   **Order Summary Box:** Find the `div` with `bg-white p-6 border...`.
    -   To change background color, edit `bg-white`.
    -   To change padding (internal space), edit `p-6`.
    -   To change corner roundness, edit `rounded-lg`.
-   **❗️ Do Not Change:** Anything related to `name`, `id`, or `onSubmit`. These are required for the payment form to work.

### Updating the "About Us" Section
The "About Us" and contact details are in the website footer.

-   **File to Edit:** `components/Footer.tsx`

Open this file and find the `<!-- About Us Section -->` comment. You can edit the address and phone number text directly inside the HTML tags.

---

## 4. The Golden Rules: Safe vs. Unsafe Changes

### ✅ Safe Changes (Go for it!)
-   **Text:** Any visible text on the page.
-   **Images:** Any image URL or path.
-   **Styling (Tailwind CSS):** Classes for `color`, `spacing`, `sizing`, `font`, and `borders`.

### ❌ Unsafe Changes (Danger Zone!)
-   **Logic:** Any file ending in `.ts` or `.tsx` that contains functions, `useState`, `useEffect`, `useCart`, `onClick={...}`, or complex calculations.
-   **Routing:** Do not edit `App.tsx` or any `<Route ...>` components.
-   **State Management:** Do not edit `context/CartContext.tsx` or `hooks/useCart.ts`.
-   **Backend/API:** Do not edit anything in the `functions/` folder. This handles payments.
-   **File Names:** Do not rename or move files or folders.

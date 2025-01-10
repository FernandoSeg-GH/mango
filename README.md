# Mango - Technical Test

## Live URL: https://mango-tawny.vercel.app

### Author: Fernando R. Segre

1. **Installation & Configuration**
2. **Environment Variables**
3. **Project Objectives & Use Cases**
4. **Project Structure & Implementation**
5. **Styling**
6. **Testing Strategy**
7. **Running the App**

## 1. **Installation & Configuration**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/FernandoSeg-GH/mango.git
   cd mango
   ```

2. **Create Environment Variables**  
   Create a file named `.env.local` in the root of your project and add the following:

   ```bash
   MOCKABLE_RANGE_URL="https://demo0232710.mockable.io/range"
   MOCKABLE_FIXED_RANGE_URL="https://demo0232710.mockable.io/fixed-range"
   NODE_TLS_REJECT_UNAUTHORIZED="0"
   ```

   - `MOCKABLE_RANGE_URL` and `MOCKABLE_FIXED_RANGE_URL` point to **mock** APIs serving your range data.
   - We have set `NODE_TLS_REJECT_UNAUTHORIZED="0"` **only** for this exercise so that Node.js can fetch data from the mockable server without valid TLS certificates.  
     In a **production** scenario, you would not disable TLS verification. Instead, we would configure secure routes with appropriate certificates/headers.

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   By default, the app is served at [http://localhost:8080](http://localhost:8080) (or whichever port is in your config).

## 2. **Objective & Use Cases**

The main objective is to implement a **custom** `<Range />` component with **two usage modes**:

1. **Normal Range** (Exercise 1)

   - **✅ - Done** - Use a custom range (not HTML5 `<input type="range">`).
   - **✅ - Done** - The user can drag **two** handles.
   - **✅ - Done** - The user can manually change min/max by clicking on labels (text inputs).
   - **✅ - Done** - The min/max values must **not** cross each other.
   - **✅ - Done** - Provide mocked HTTP service returning `{min: 1, max: 100}`.
   - **✅ - Done** - Implement unit/integration tests.

2. **Fixed Values Range** (Exercise 2)
   - **✅ - Done** - Again, a custom range (not `<input type="range">`).
   - **✅ - Done** - The user can only select from a **fixed** list of currency values: `[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]`.
   - **✅ - Done** - Provide mocked HTTP service returning an array of currency values.
   - **✅ - Done** - The user drags two handles, but the range snaps to the **closest** fixed value.
   - **✅ - Done** - In this scenario, currency values **are not** manually editable by input.
   - **✅ - Done** - Implement unit/integration tests.

### **Routes**

- **Home Page**: [http://localhost:8080](http://localhost:8080)  
  Contains links:

  1. **Exercise 1** -> `/exercise1`
  2. **Exercise 2** -> `/exercise2`

- **Exercise 1**: [http://localhost:8080/exercise1](http://localhost:8080/exercise1)  
  Normal range (1–100).

- **Exercise 2**: [http://localhost:8080/exercise2](http://localhost:8080/exercise2)  
  Fixed range with currency values `[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]`.

## 3. **Project Structure & Implementation**

This **Next.js 15** uses the `app directory`, here are some key files and folders:

```
├─ __tests__/
│  ├─ integration/
│  |  ├─ getFixedRange.test.tsx     # Exercise 2 IT
│  |  └─ getRange.test.tsx          # Exercise 1 IT
│  └─ unit/                         # Range Component UT
│     ├─ Handle.test.tsx
│     ├─ Price.test.tsx
│     ├─ Rage.test.tsx
│     └─ Slider.test.tsx
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                # Home page with links to exercises
│  ├─ exercise1/page.tsx      # Exercise 1 route
│  └─ exercise2/page.tsx      # Exercise 2 route
├─ actions/
│  └─ getData.ts              # getRange() and getFixedRange() server actions
├─ components/
│  └─ range/
│     ├─ index.tsx            # Range component
│     ├─ price.tsx            # Price component
│     ├─ handle.tsx           # Handle component
│     └─ slider.tsx           # Slider component
├─ .env.local                 # Environment variables
├─ package.json
└─ ...
```

### **Server Actions**

- **`getRange()`** fetches `MOCKABLE_RANGE_URL` to retrieve `{ min: number, max: number }`.
- **`getFixedRange()`** fetches `MOCKABLE_FIXED_RANGE_URL` to retrieve an array of currency values.

These are **async** functions. The **Exercise1** and **Exercise2** page components call these functions on the server side, then pass the data to the `<Range />` component.

## 4. **Custom Range Component**

Instead of an `<input type="range">`, we built our own slider from scratch:

1. **`<Range />`:**

   - Maintains two states: `handle1` (min handle) and `handle2` (max handle).
   - If **not** in fixed mode, the user can type in the “Min Value” / “Max Value” fields.
   - If in **fixed mode**, the user can only drag the handles, and values **snap** to the nearest fixed point.

2. **`<Handle />`:**

   - Draggable circle that represents one side of the range.
   - Contains mouse and keyboard event listeners.
   - Updates the parent `<Range />` state via an `onDrag` callback.

3. **`<Slider />`:**

   - Renders the actual “track” of the slider.
   - Shows a black bar indicating the **range** between the two handles.

4. **`<Price />`:**
   - Renders either a numeric `<input />` or a **read-only** `<span />` if `isFixed` is true.
   - Displays error messages if min > max or vice versa.

**Styling** is mainly handled via **Tailwind CSS** (e.g., `className="relative w-full h-2 bg-gray-300 rounded-full"`).  
Where needed (like `style={{ left: ... }}` for `<Handle />`), we use inline style for dynamic positioning.

## 5. **Tailwind CSS**

- We rely on Tailwind classes (`bg-gray-300`, `border`, `rounded`, etc.) for most styling.
- Inline styles are used only for **dynamic** positions (like the handle’s `left` property).

## 6. **Testing Strategy**

We implemented **unit** and **integration** tests using **Jest + React Testing Library**:

### **Unit Tests** (e.g., `__tests__/unit/Price.test.tsx`)

- **Scope:** Test components individually in isolation.
- **Examples:**
  - `<Handle />` ensuring `onDrag` is called.
  - `<Price />` ensuring input vs. read-only labels.
  - `<Range />` ensuring min cannot cross max in normal mode.

### **Integration Tests** (e.g., `__tests__/integration/getRange.test.ts`)

- **Scope:** Test how multiple parts work together, or how a function interacts with external data.
- **Examples:**
  - `getRange()` and `getFixedRange()` verifying they handle successful responses vs. error responses.
  - Potentially, you could test how the entire page integrates the fetched data into the `<Range />` component.

## 7. **Running the App & Tests**

1. **Start the Next.js Dev Server**

   ```bash
   npm run dev
   ```

   Access the app at [http://localhost:8080](http://localhost:8080).

2. **Run the Tests**

   ```bash
   npm run test
   ```

   - **Unit tests** are stored under `__tests__/unit/`.
   - **Integration tests** are under `__tests__/integration/`.

3. **Usage**
   - Visit [http://localhost:8080/exercise1](http://localhost:8080/exercise1) to see the **normal** range slider.
   - Visit [http://localhost:8080/exercise2](http://localhost:8080/exercise2) to see the **fixed** range slider.

## 8. **Error Handling**

- Server-side functions (getRange and getFixedRange): We validate API responses(with a corresponding typed promise), and throw detailed errors for invalid or missing data.

- On the client-side, errors are caught and displayed using a reusable ErrorMessage component,

---

We’ve covered:

- **Server-side data fetching** using a Mockable API,
- **Front-end** Responsive UI, Aria Labels for Accessibility, Resuable Components
- **Tailwind CSS** for styling,
- **Unit & Integration** tests with Jest.

In a real production scenario:

- Secure your API calls with TLS/HTTPS (rather than disabling TLS checks)
- Add Authorization Headers on the API calls
- Secure route with sessions

# Pastebin‑Next 📝

A full‑stack **Pastebin‑like application** built with **Next.js App Router**, **Prisma**, and **SQLite**, supporting **time‑based expiry** and **view‑limited pastes**.
This project was built as part of a **job preliminary / technical evaluation** to demonstrate real‑world backend and full‑stack skills.

---

## 🚀 Live Demo

🔗 **Deployed on Vercel:**
[https://pastebin-next.vercel.app](https://pastebin-next.vercel.app)

*(Replace with your actual Vercel URL if different)*

---

## ✨ Features

* ✅ Create a paste containing arbitrary text
* 🔗 Receive a **shareable URL** for each paste
* ⏳ **Time‑based expiry (TTL)** support
* 👀 **View‑count limit** support
* ❌ Automatic unavailability when:

  * Paste expires
  * View limit is exceeded
* 📄 Server‑rendered paste view page
* 🧪 REST API with proper validation and error handling

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 16** (App Router)
* React
* Tailwind CSS

### Backend

* Next.js API Routes
* Prisma ORM
* SQLite (for simplicity & demo)

### Tooling

* pnpm
* TypeScript
* Vercel (deployment)

---

## 📂 Project Structure

```
app/
├── page.tsx                  # Home page (Create Paste UI)
├── pastes/
│   └── [id]/
│       └── page.tsx          # Paste view page
├── api/
│   ├── healthz/route.ts      # Health check endpoint
│   └── pastes/route.ts       # Create & fetch pastes API

lib/
└── prisma.ts                 # Prisma client singleton

prisma/
├── schema.prisma             # Database schema
└── dev.db                    # SQLite database
```

---

## 🔌 API Endpoints

### 🩺 Health Check

**GET** `/api/healthz`

Response:

```json
{ "ok": true }
```

---

### ➕ Create a Paste

**POST** `/api/pastes`

#### Request Body

```json
{
  "content": "string",
  "ttl_seconds": 60,
  "max_views": 5
}
```

#### Validation Rules

* `content` **required**, non‑empty string
* `ttl_seconds` optional, integer ≥ 1
* `max_views` optional, integer ≥ 1

#### Success Response (200)

```json
{
  "id": "cmkxxxx",
  "url": "https://pastebin-next.vercel.app/pastes/cmkxxxx"
}
```

#### Error Response (400)

```json
{ "error": "content is required" }
```

---

### 📥 Fetch a Paste (API)

**GET** `/api/pastes/:id`

#### Success Response (200)

```json
{
  "content": "Hello world",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}
```

Notes:

* `remaining_views` is `null` if unlimited
* `expires_at` is `null` if no TTL
* Each successful fetch **counts as a view**

#### Unavailable Cases (404)

* Paste does not exist
* Paste expired
* View limit exceeded

Response:

```json
{ "error": "Not found" }
```

---

## 🗄️ Database Schema (Prisma)

```prisma
model Paste {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  expiresAt DateTime?
  maxViews  Int?
  views     Int      @default(0)
}
```

---

## ▶️ Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/pastebin-next.git
cd pastebin-next
```

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Setup Prisma

```bash
pnpm prisma migrate dev
```

### 4️⃣ Start development server

```bash
pnpm dev
```

Open: **[http://localhost:3000](http://localhost:3000)**

---

## 🧪 Example cURL Command

```bash
curl -X POST http://localhost:3000/api/pastes \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello","ttl_seconds":10,"max_views":2}'
```

---

## 🧠 Design Decisions

* **SQLite** chosen for simplicity and portability
* **Prisma** for type‑safe database access
* **Server Components** for paste rendering
* **REST API** instead of GraphQL for clarity
* Defensive error handling to prevent invalid access

---

## 📌 Future Improvements

* Authentication (private pastes)
* Syntax highlighting
* Paste editing
* Password‑protected pastes
* PostgreSQL support

---

GitHub: [https://github.com/kumari203](https://github.com/kumari203)

---

## ✅ Purpose

This project was created to demonstrate:

* Full‑stack application design
* API development & validation
* Database modeling
* Production deployment readiness


# Next.js Blog Challenge

A full-stack blog application built with **Next.js 16 (App Router)**, **Prisma**, and **SQLite**. This project allows users to list posts, filter them by author, and delete them.

## 🚀 Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Database:** SQLite
- **ORM:** Prisma
- **Styling:** CSS Modules

## 🛠️ Installation & Setup

Follow these steps to run the project locally.

## 1. Clone and Install

```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
```

## 2. Database Setup

To set up the database schema and populate it with initial data, run the following commands:

### Push the schema to the SQLite database

```bash
npx prisma db push
```

### Seed the database with data from JSONPlaceholder API

npx prisma db seed

## 3. Run the Server

```bash
npm run dev
```

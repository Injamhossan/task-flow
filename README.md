# ⚡ TaskFlow - Micro-Tasking Platform

![TaskFlow Banner](https://i.ibb.co/6cFYTYBN/image.png)

**TaskFlow** is a modern, full-stack micro-tasking platform that connects businesses ("Buyers") with a global workforce ("Workers"). Buyers post simple tasks, and Workers earn real money by completing them. The platform features role-based dashboards, secure payments, and a real-time leaderboard system.

---

## 🚀 Live Demo

[**Check out the Live Website**](https://taskflow-ih.vercel.app/)

--- 

## ✨ Key Features

### 👨‍💻 For Workers
*   **Earn Money**: Browse and complete tasks to earn coins.
*   **Real-time Withdrawals**: Convert coins to cash and withdraw securely.
*   **Submission Tracking**: Track the status of your work (Pending, Approved, Rejected).
*   **Leaderboard**: Compete with other workers to appear on the Top Earners list.

### 💼 For Buyers
*   **Post Tasks**: Create tasks with specific requirements and download limits.
*   **Manage Submissions**: Review worker submissions and Approve or Reject task proofs.
*   **Wallet System**: Purchase coins to fund your tasks.

### 🛡️ For Admins
*   **User Management**: Manage all users, change roles, and handle user deletions.
*   **Task Oversight**: Monitor all posted tasks and submissions.
*   **Blog Management**: Create, edit, and delete blog posts for the platform.
*   **System Controls**: Manage platform settings and withdrawals processing.

### 📰 Content & Compliance
*   **Blog System**: Integrated blog for company news and updates.
*   **Legal Compliance**: Dedicated pages for Privacy Policy, Terms, and Data Deletion instructions.
*   **Secure Contact**: Contact form with email integration.

---

## 🛠️ Technology Stack

**TaskFlow** is built with bleeding-edge web technologies for performance and scalability.

| Category | Technology |
| :--- | :--- |
| **Frontend** | [Next.js 16](https://nextjs.org/) (React), [TailwindCSS](https://tailwindcss.com/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/), [Shadcn/UI](https://ui.shadcn.com/) |
| **Backend** | Next.js API Routes (Serverless), [GraphQL](https://graphql.org/) (Apollo Server) |
| **Database** | [MongoDB](https://www.mongodb.com/) (Mongoose ODM) |
| **Auth** | [Firebase Authentication](https://firebase.google.com/) |
| **State Mgmt** | [TanStack Query](https://tanstack.com/query/latest), [Apollo Client](https://www.apollographql.com/docs/react/), Redux |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18+)
*   pnpm (recommended) or npm
*   MongoDB URI
*   Firebase Project Credentials

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Injamhossan/task-flow.git
    cd task-flow
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory and add the following:
    ```env
    # Database
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow

    # Firebase Auth
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    
    # Email Service (New)
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password
    
    # Stripe (Optional)
    STRIPE_SECRET_KEY=your_stripe_secret
    ```

4.  **Run the development server**
    ```bash
    pnpm dev
    ```

5.  **Open in Browser**
    Visit `http://localhost:3000` to see the app running.

---

## 📂 Project Structure

```bash
src/
├── app/                # Next.js App Router pages & API routes
│   ├── api/            # Backend API endpoints (Blogs, Users, Admin, Contact)
│   ├── blog/           # Public blog pages
│   ├── dashboard/      # Protected dashboard routes (Admin/Buyer/Worker)
│   └── page.jsx        # Landing page
├── components/         # Reusable React components
│   ├── Dashboard/      # Role-specific dashboard widgets
│   ├── ui/             # Shadcn/UI & Radix components
│   └── ...
├── lib/                # Utilities & Database connection
├── models/             # Mongoose Database Schemas (User, Task, Blog, etc.)
└── auth/               # Firebase configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  <p>Made with ❤️ by <b>Injamhossan</b></p>
</div>

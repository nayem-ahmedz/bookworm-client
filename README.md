# BookWorm

**A Personalized Book Recommendation & Reading Tracker Application**

BookWorm is a full-stack web application designed to help users discover books, manage their personal reading library, track progress, and receive personalized book recommendations. The platform also includes a powerful Admin panel for managing books, users, reviews, genres, and tutorials.

---

## Live Project

* **Live Site:** [https://book-wormz.vercel.app/](https://book-wormz.vercel.app/)
* **Frontend Repo:** [https://github.com/nayem-ahmedz/bookworm-client](https://github.com/nayem-ahmedz/bookworm-client)
* **Backend Repo:** [https://github.com/nayem-ahmedz/bookworm-server](https://github.com/nayem-ahmedz/bookworm-server)

---

## User Roles & Permissions

### Admin

Admins have full control over the platform:

* User Management (Promote/Demote roles)
* Book Management (Add/Edit/Delete books with cover image upload)
* Genre/Category Management
* Review Moderation (Approve/Delete pending reviews)
* Tutorial Management (Embed YouTube links)
* Dashboard analytics & overview stats

### Normal User

Users can:

* Browse and search books with filters
* Manage personal reading shelves:

  * Want to Read
  * Currently Reading (with progress tracking)
  * Read
* Write reviews & rate books (pending approval)
* Get personalized book recommendations
* Watch curated book-related tutorials
* Track reading goals and statistics

---

## Project Structure

Monorepo-style setup:

```
/frontend   → Next.js (App Router)
/backend    → Express.js API
```

## Authentication & Authorization

* Server-side authentication using **JWT**
* Secure password hashing with **bcrypt**
* All routes are protected
* No public homepage:

  * **Admin → redirected to Admin Dashboard**
  * **User → redirected to My Library**
* Role-based route protection (Admin vs User)

---

## Core Features

### Book Management (Admin)

* Create books with:

  * Title, Author, Genre
  * Description
  * Cover image upload (Cloudinary/local)
* Edit or delete books with confirmation
* Paginated book listing

### Genre Management (Admin)

* Add, edit, delete genres
* Books are linked to genres

### Reviews & Ratings

* Users submit reviews with 1–5 star ratings
* Reviews start as **pending**
* Admin approval required
* Approved reviews visible on Book Details page

### My Library (User)

* Three reading shelves
* Reading progress tracking
* Progress updates for currently reading books

### Personalized Recommendations

Recommendations are generated using:

* User’s most-read genres
* User’s average ratings
* Community-approved reviews
* Popular & highly-rated books as fallback

---

## Dashboards & Analytics

### Admin Dashboard

* Total users, books, reviews
* Pending review count
* Books per genre chart

---

## Tutorials Page

* Protected page with embedded YouTube videos
* Admin can add/remove tutorial links
* Accessible to both Admin & Users

---

## Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS and Daisy UI
* Recharts
* Axios
* Tanstack Query

### Backend

* Node.js
* Express.js
* MongoDB (mongoose)
* JWT Authentication
* Bcrypt

---

### Client Setup

```bash
git clone https://github.com/nayem-ahmedz/bookworm-client.git
cd bookworm-client
npm install
# copy .env.example to .env.local and add backend API URL
npm run dev
```

---

## Timeline

* **Started:** 12 January 2026
* **Completed:** January 14, 2026
* **Last updated:** January 14, 2026

---

## Acknowledgement

Special thanks to **Programming Hero** for this opportunity.
This project demonstrates my ability to design, develop, and deploy a production-ready, role-based full-stack application.
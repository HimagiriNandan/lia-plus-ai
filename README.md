# Blogging Website with Role-Based Access Control

A simple blogging platform where:

- **Admin** can view, create, update, and delete blog posts.  
- **User** can only view blog posts.

Authentication is implemented to secure access based on roles.

To improve user experience, toast notifications are used throughout the app to provide instant feedback on actions like creating, updating, or deleting posts.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Shadcn UI  
- **Backend:** Node.js, Express, MongoDB

---

## Setup Instructions

### 1. clone the repository


- **git clone** https://github.com/HimagiriNandan/lia-plus-ai.git
- **cd** lia-plus-ai

### 2. Run Backend

- **cd** server
- **npm install**
- **npm start**

Make sure to configure your MongoDB connection and JWT secret in a .env file inside /server.

### 3. Run Frontend
In a new terminal:

- **cd client**
- **npm install**
- **npm run dev**


## Screenshots

### Login / SignUp page:

![Screenshot 2025-06-26 115136](https://github.com/user-attachments/assets/e6f2f6f0-a32d-4e5d-9f66-78bf99321491)


### Home page

![Screenshot 2025-06-26 115152](https://github.com/user-attachments/assets/558c9008-271b-4ffa-8dce-c2cfb162907c)


### View a specific blog
![Screenshot 2025-06-26 115203](https://github.com/user-attachments/assets/a6fb571e-f3fb-493d-ba85-89212b9ac365)


### update / delete your blog

![Screenshot 2025-06-26 115217](https://github.com/user-attachments/assets/0004b9f9-7146-473a-87c5-f97e73cc8e9e)


### Create a blog


![Screenshot 2025-06-26 130423](https://github.com/user-attachments/assets/98a738d1-bf45-4c48-bf21-77c984a97300)



### Edit a blog


![Screenshot 2025-06-26 130434](https://github.com/user-attachments/assets/823129c7-9ddd-4d26-a2bf-3d09c108d16c)

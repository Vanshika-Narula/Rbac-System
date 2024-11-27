# RBAC System

This project implements a Role-Based Access Control (RBAC) system. It contains two main folders: `backend` and `frontend`. The backend handles user roles and permissions, while the frontend provides the user interface.

## Prerequisites

Before getting started, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Project Structure

/rbac-system │ ├── /backend # Backend folder (API, authentication, roles/permissions) └── /frontend # Frontend folder (UI, user management, roles interface)


## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   git clone https://github.com/your-username/rbac-system.git
   cd rbac-system

2. **Install backend dependencies**:

   Navigate to the backend folder and install the necessary packages:
   cd backend
   npm install

3. **Install frontend dependencies**:

   Navigate to the frontend folder and install the necessary packages:
   cd ../frontend
   npm install

Running the Project
After installing the dependencies, you can start both the backend and frontend.

1. **Running the Backend**
   Navigate to the backend directory and run:
   cd backend
   npm start

   The backend server will be running at http://localhost:5000 (or the port specified in your backend configuration).

2. **Running the Frontend**
   Navigate to the frontend directory and run:
   cd frontend
   npm start

   The frontend will be running at http://localhost:3000 (or the port specified in your frontend configuration).


**Features**
1. Role Management: Admins can create, edit, and delete roles.
2. Permission Management: Admins can assign and revoke permissions to roles.
3. User Management: Users can be assigned specific roles, which determine their access to resources.
4. Authentication: Secure login and session management.






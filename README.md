# Node Task

A Node.js backend project using Express.js, MongoDB, and JWT authentication.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- pnpm for package management

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [pnpm](https://pnpm.io/) installed
- MongoDB instance running (local or cloud)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ShivamKathait/node-task.git
cd node-task

2.Install dependencies using pnpm:
 pnpm install

3.Create a .env file in the root directory and add your environment variables. Example:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret_key
saltRounds = 10

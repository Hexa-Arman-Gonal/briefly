# 🔗 Briefly

**Briefly** is a high-performance, minimalist URL shortening API. This project is built using **pure Node.js** (without frameworks like Express) to demonstrate a deep understanding of core HTTP modules and asynchronous JavaScript.

---

![Briefly Banner](./logo.png)

---

## ✨ Key Features
* **Zero Dependencies:** Built using the native Node.js `http` module for maximum efficiency.
* **User Authentication:** Complete flow for user registration and login.
* **URL Management:** Full CRUD operations to shorten, list, and delete links.
* **Database Integration:** Powered by MongoDB for persistent and scalable data storage.

## 🛠 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Hexa-Arman-Gonal/briefly.git](https://github.com/your-username/briefly.git)
   cd briefly

   npm install

   PORT=3000
   DB_URI=your_mongodb_connection_string

   # For development (using nodemon)
   npm run dev



📂 Project Structure

server.js: The core entry point and custom router.
controllers/: Contains business logic for users and URL processing.
configs/: Database connection and environment configurations.
package.json: Project metadata and dependency management.

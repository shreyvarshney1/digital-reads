# 📖 **Digital Reads – Online Bookstore & Rental Platform**  

**Digital Reads** is a modern web application that allows users to **buy, read, share, and rent books online**. Built with **Next.js, React.js, Stripe, MySQL, and Prisma**, the platform offers a seamless experience for book lovers to explore, purchase, and manage their digital libraries.  


---

## 🚀 **Features**  

### 🔹 User Features  
✅ **Buy & Read Books** – Instantly purchase books and access them in a personal digital library.  
✅ **Rent & Share Books** – Borrow books for a limited time or share them with other users.  
✅ **Secure Payments** – Integrated with **Stripe** for seamless transactions.  
✅ **Advanced Search & Filtering** – Find books by genre, author, or popularity.  
✅ **User Reviews & Ratings** – Share feedback and explore top-rated books.  
✅ **Personalized Library** – Track reading progress, add favorites, and manage books.  

### 🔹 Admin Features  
✅ **Dashboard** – Manage books, authors, categories, and user transactions.  
✅ **Order & Inventory Management** – Maintain book availability and track sales.  
✅ **Role-Based Authentication** – Secure admin access and user authentication.  

---

## 🛠️ **Tech Stack**  

| Technology  | Purpose  |  
|-------------|---------|  
| **Next.js**  | Server-side rendering & frontend UI  |  
| **React.js**  | Dynamic & interactive UI  |  
| **Prisma ORM**  | Database management  |  
| **MySQL**  | Relational database for book & user data  |  
| **Stripe**  | Secure payment processing  |  
| **Tailwind CSS**  | Styling and responsive UI design  |  

---

## 📥 **Installation & Setup**  

### **1️⃣ Fork & Clone the Repository**  
1. **Star ⭐ and fork** this repository.  
2. Clone your forked repo:  
   ```bash
   git clone https://github.com/your-username/digital-reads.git
   cd digital-reads
   ```

### **2️⃣ Install Dependencies**  
```bash
pnpm install
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in the root directory and add the following:  
```env
DATABASE_URL=mysql://user:password@localhost:3306/digital_reads
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
```

### **4️⃣ Run Database Migrations**  
```bash
npx prisma migrate dev --name init
```

### **5️⃣ Start the Development Server**  
```bash
pnpm dev
```
App will be available at **http://localhost:3000** 🚀  

---

## 🛠️ **How to Contribute**  

🙌 **Contributions are welcome!** Follow these steps:  
1. **Star ⭐ and fork** the repo.  
2. Clone your fork and create a new feature branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:  
   ```bash
   git commit -m "feat: Add new feature"
   ```
4. Push and submit a **Pull Request**.  
5. Wait for review and approval.  

For detailed contribution guidelines, check **[CONTRIBUTING.md](./CONTRIBUTING.md)**.  

---

## 📜 **License**  

This project is licensed under the **MIT License**.  

---

## 📢 **Stay Connected**  
💬 Have questions or suggestions? Open an **[issue](https://github.com/shreyvarshney1/digital-reads/issues)**.  
📌 Don't forget to **star ⭐ the repo** if you like the project!  

---

Let me know if you need any modifications! 🚀📚✨

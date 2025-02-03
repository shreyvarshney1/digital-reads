Here's a **CONTRIBUTING.md** for your **Digital Reads** project:  

---

# 🚀 Contributing to **Digital Reads**  

Thank you for considering contributing to **Digital Reads**! 🎉 Your contributions help make this project better for book lovers around the world.  

## 🌟 **Before You Start**  
1. **Star the Repository** ⭐ – If you find this project helpful, please **star** it on GitHub!  
2. **Fork the Repository** 🍴 – Click the **Fork** button at the top right of the repo to create your copy.  

## 📥 **Getting Started**  

### 1️⃣ **Clone Your Fork**  
```bash
git clone https://github.com/your-username/digital-reads.git
cd digital-reads
```

### 2️⃣ **Install Dependencies**  
Make sure you have **Node.js (v18+)** and **PNPM** installed. Then, run:  
```bash
pnpm install
```

### 3️⃣ **Set Up Environment Variables**  
Create a `.env` file and add the required variables. Example:  
```env
DATABASE_URL=mysql://user:password@localhost:3306/digital_reads
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4️⃣ **Run Database Migrations**  
```bash
npx prisma migrate dev --name init
```

### 5️⃣ **Start the Development Server**  
```bash
pnpm dev
```
App will be available at **http://localhost:3000**.  

---

## 🔥 **How to Contribute**  

### 🛠️ **1. Pick an Issue**  
- Check the **[Issues](https://github.com/shreyvarshney1/digital-reads/issues)** tab.  
- Comment on the issue you’d like to work on and wait for approval.  
- If no issue matches your interest, feel free to open a **new issue**!  

### 📝 **2. Make Changes**  
- Work on a **feature branch**, not `main`.  
```bash
git checkout -b feature/your-feature-name
```
- Make your changes and **test thoroughly** before committing.  
- Follow the project’s **code style** (ESLint, Prettier).  

### ✅ **3. Commit & Push Your Changes**  
- Follow the commit message convention:  
  ```bash
  git commit -m "feat: Add new book rental feature"
  git push origin feature/your-feature-name
  ```
  
### 🔃 **4. Create a Pull Request (PR)**  
- Go to **your forked repo** → Click **New Pull Request**.  
- Fill in the PR template and submit your request.  
- Wait for a **review and approval** from maintainers.  

---

## 📜 **Contribution Guidelines**  

✅ **Be Respectful** – Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).  
✅ **Write Clean Code** – Keep code modular and well-documented.  
✅ **Test Your Changes** – Ensure your code does not break existing functionality.  
✅ **Follow the PR Template** – Provide a clear description of your changes.  

---

## 🛠️ **Need Help?**  
Feel free to **open an issue** or reach out!  

---

### 🎉 **Thank You for Contributing!** 🚀  

Your contributions help **Digital Reads** grow! Don't forget to **star ⭐ the repo** and keep reading! 📚✨  

---

Let me know if you need any modifications! 🚀😊

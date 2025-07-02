# 🎓 PTUK EduGate – Educational Platform

**A smart, centralized educational platform for Palestine Technical University – Kadoorie (PTUK) students.**  
The platform organizes academic resources and integrates an AI assistant to answer course-related questions in both Arabic and English.

---

## 📘 Overview

Students often struggle to find, organize, and access university study materials such as books, summaries, and past exams. EduGate solves this by providing:

- A centralized platform for academic materials
- Role-based access and content management
- An intelligent AI chatbot tailored to the local academic context

---

##  Features

- 🗂️ Browse & download categorized academic materials
- 🔐 Role-based access (Guest, Student, Admin, Super Admin)
- 📥 Upload files (notes, books, past exams)
- ❤️ Favorite files & courses
- 📝 Add notes directly inside the platform
- 🤖 AI chatbot for course-specific questions
- 📊 Admin dashboards for file approval & user management

---

## 🧠 AI-Powered Assistant

- **MiniLM** – Semantic search using sentence embeddings
- **LLaMA (via Groq API)** – Context-aware answer generation

**Supported Subjects:**

- Palestinian Cause  
- Islamic Studies  
- Arabic Language  
- English 1  
- Communication Skills

> The dataset includes 15,000+ Q&A pairs built from real academic content.

---

##  Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- HTML5, CSS3, JavaScript (ES6+)

### Backend
- Node.js  
- Express.js  
- MySQL  
- JWT authentication

### AI / NLP
- Python  
- HuggingFace Transformers  
- MiniLM + LLaMA (via Groq API)  
- Cosine similarity  
- Pandas, Numpy, Sklearn, PyTorch

---

## 🖼️ Screenshots

### 🏠 Home Page
> When the website is first opened  
![Home Page](./screenshots/HomePageStudent-D.png)

### 📚 Courses & Materials Page
> After selecting the department. Courses can be saved to favorites  
![Courses](./screenshots/courses.jpg)

### 📂 Files Page (Selected Course)
> Shows all files under a course with options to add notes or mark as favorite  
![Files](./screenshots/files.jpg)

### 📝 File View + Notes
> Allows viewing a file and attaching notes to it  
![Notes](./screenshots/NoteStudent-D.png)

### 🤖 AI Chatbot
> The built-in AI assistant answering course-specific questions  
![Chatbot](./screenshots/chatbot.png)

### 🛠️ Admin Dashboard
> Admin interface to manage files, students, and course materials  
![Admin Dashboard](./screenshots/Admin-Dashboard.jpg)

### 🧑‍💼 Super Admin Dashboard
> Full platform control over users, admins, departments, and content  
![Super Admin](./screenshots/Dashboard-SuperAdmin-StudentTable-D.png)

---

## 👥 User Roles

| Role            | Capabilities                                                    |
| --------------- | --------------------------------------------------------------- |
| **Guest**       | Browse and view courses/materials only                          |
| **Student**     | Upload files, add notes, save favorites                         |
| **Admin**       | All student features + approve/reject uploaded files            |
| **Super Admin** | Full control: manage users, admins, departments, and courses    |

---

## 📱 Future Enhancements

- Mobile application (iOS/Android)
- Integration with university systems (e.g., Moodle)
- Plagiarism detection system
- Faculty and instructor roles with upload permissions
- AI assistant upgrades (summarization, voice interaction, Q&A generation)
- Social features (comments, file ratings, discussions)
- Offline access support

---

## 👨‍💻 Developed By

- Ahmad Wadee Tomeh  
- Yazan Mohammed Husain  
- Yaseen Saji Ashqar  
- Yousef Taiser Jaber  

**Supervised by:** Dr. Nagham Hamad  
_Computer Systems Engineering Department – PTUK_

---

## 📜 License

This project was developed as a graduation project for the Bachelor's degree in Computer Systems Engineering at PTUK.  
It is open for academic and educational use only.

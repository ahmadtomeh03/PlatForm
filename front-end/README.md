# 🎓 PTUK EduGate – Educational Platform

**A smart, centralized educational platform for Palestine Technical University – Kadoorie (PTUK) students.**  
The platform organizes academic resources and integrates an AI assistant to answer course-related questions in both Arabic and English.

---

## 📘 Overview

Students often struggle to find, organize, and access university study materials like books, summaries, and past exams. EduGate solves this by providing:

- A centralized platform for course materials
- Role-based access and content management
- An intelligent AI chatbot tailored to local academic content

---

## 🚀 Features

- 🗂️ Browse & download categorized academic materials
- 🔐 Role-based access (Guest, Student, Admin, Super Admin)
- 📥 Upload files (notes, books, past exams)
- ❤️ Favorite files & courses
- 📝 Add notes directly inside the platform
- 🤖 AI Chatbot for course-specific questions
- 📊 Admin dashboards for file approval & user management

---

## 🧠 AI-Powered Assistant

- **MiniLM** (Semantic search using sentence embeddings)
- **LLaMA (via Groq API)** (Context-aware answer generation)

**Supported Subjects:**

- Palestinian Cause
- Islamic Studies
- Arabic Language
- English 1
- Communication Skills

> Dataset includes 15,000+ Q&A pairs built from real academic content.

---

## 🛠️ Tech Stack

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
- Cosine similarity (semantic search)
- Pandas, Numpy, Sklearn, PyTorch

---

## 🖼️ Screenshots

| Description                     | Image                                  |
| ------------------------------- | -------------------------------------- |
| Home Page                       | `../screenshots/HomePageStudent-D.png` |
| Courses & Materials Page        | `./screenshots/courses.png`            |
| File View + Notes               | `./screenshots/NoteStudent.png`        |
| AI Chatbot                      | `./screenshots/chatbot.png`            |
| Admin Dashboard                 | `./screenshots/admin-dashboard.png`    |
| Super Admin - Course Management | `./screenshots/superadmin-courses.png` |

---

## 👥 User Roles

| Role            | Capabilities                                                    |
| --------------- | --------------------------------------------------------------- |
| **Guest**       | Browse and view courses/materials only                          |
| **Student**     | Upload files, add notes, favorites                              |
| **Admin**       | Same as student + approve/reject uploads                        |
| **Super Admin** | Full control: manage users, departments, courses, and materials |

---

## 📱 Future Enhancements

- Mobile app (iOS/Android)
- University system integration (e.g., Moodle)
- Plagiarism detection
- Faculty-upload role support
- AI upgrades (summarization, voice, question generation)
- Social features (comments, file ratings)
- Offline access

---

## 👨‍💻 Developed By

Ahmad Wadee Tomeh  
Yazan Mohammed Husain  
Yaseen Saji Ashqar  
Yousef Taiser Jaber

**Supervised by:** Dr. Nagham Hamad  
_Computer Systems Engineering Department – PTUK_

---

## 📜 License

This project was developed as a part of the Bachelor’s graduation project at PTUK. Free to use for academic and educational purposes.

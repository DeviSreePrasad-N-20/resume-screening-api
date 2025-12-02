📘 Resume Screening & Recruitment Backend API

A complete backend system built using Node.js, Express, MongoDB, JWT Authentication, Cloudinary file uploads, and candidate screening automation.
This API allows recruiters to register/login, manage candidates, upload resumes, score profiles, shortlist candidates, and generate analytics reports.

🚀 Features

Recruiter authentication (Register/Login/Profile)

JWT token-based authentication

Role-based protected routes

Candidate CRUD operations

Resume upload (Cloudinary)

Resume attachment to candidate profile

Automatic screening score calculation

Candidate shortlist generation

Monthly & summary reports

Pagination, search & filtering

Production-ready deployment (Render/Railway)

🧰 Tech Stack
Layer	Technology
Backend	Node.js, Express.js
Database	MongoDB + Mongoose
Auth	JWT (JSON Web Tokens)
File Upload	Multer + Cloudinary
Deployment	Render
Tools	Postman, Git, GitHub
📂 Folder Structure
root
│── src
│   ├── server.js
│   ├── config
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── candidateController.js
│   │   ├── uploadController.js
│   │   ├── screeningController.js
│   │   └── reportsController.js
│   ├── middlewares
│   │   ├── auth.js
│   │   └── roles.js
│   ├── models
│   │   ├── User.js
│   │   └── Candidate.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── candidates.js
│   │   ├── upload.js
│   │   ├── screening.js
│   │   └── reports.js
│   └── utils
│       ├── pagination.js
│       └── scoring.js
│
│── .env
│── package.json
│── README.md

⚙️ Environment Variables (.env)

Create a .env file in root:

PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/resume_db
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development

🛠️ Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/yourusername/resume-screening-api.git
cd resume-screening-api

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Add .env file with values shown above.

4️⃣ Start local development
npm run dev

5️⃣ Production start
npm start


Server runs at:

http://localhost:5000

🔥 API Documentation

All endpoints use the base URL:

https://resume-screening-api-1.onrender.com

🔐 AUTH APIs
1️⃣ Register

POST

https://resume-screening-api-1.onrender.com/api/auth/register


Headers

Content-Type: application/json


Body

{
  "name": "Test Recruiter",
  "email": "recruiter.new@example.com",
  "password": "P@ssw0rd123"
}

2️⃣ Login

POST

https://resume-screening-api-1.onrender.com/api/auth/login


Headers

Content-Type: application/json


Body

{
  "email": "recruiter.new@example.com",
  "password": "P@ssw0rd123"
}


➡️ Response contains token.

3️⃣ Profile (Protected)

GET

https://resume-screening-api-1.onrender.com/api/auth/profile


Headers

Authorization: Bearer <TOKEN>

👤 CANDIDATE APIs
4️⃣ Create Candidate

POST

https://resume-screening-api-1.onrender.com/api/candidates


Headers

Authorization: Bearer <TOKEN>
Content-Type: application/json


Body

{
  "name": "Aarav Kumar",
  "email": "aarav.kumar@example.com",
  "phone": "9876543210",
  "skills": ["Node.js","Express","MongoDB"],
  "experienceYears": 2
}

5️⃣ List Candidates (search + pagination)

GET

https://resume-screening-api-1.onrender.com/api/candidates?search=node&page=1&limit=10


Headers

Authorization: Bearer <TOKEN>

6️⃣ Get Single Candidate

GET

https://resume-screening-api-1.onrender.com/api/candidates/<CANDIDATE_ID>

7️⃣ Update Candidate

PUT

https://resume-screening-api-1.onrender.com/api/candidates/<CANDIDATE_ID>

8️⃣ Delete Candidate

DELETE

https://resume-screening-api-1.onrender.com/api/candidates/<CANDIDATE_ID>

📂 UPLOAD API
9️⃣ Upload Resume

POST

https://resume-screening-api-1.onrender.com/api/upload/resume


Headers

Authorization: Bearer <TOKEN>


Body (form-data)

resume: <Choose File>


➡️ Response example:

{
  "url": "https://res.cloudinary.com/...pdf",
  "public_id": "resumes/xyz"
}

📎 ATTACH RESUME TO CANDIDATE
🔟 Attach Resume

POST

https://resume-screening-api-1.onrender.com/api/candidates/<CANDIDATE_ID>/resume


Body:

{
  "url": "<cloudinary_url>",
  "public_id": "<public_id>"
}

🎯 SCREENING APIs
1️⃣1️⃣ Score Candidate

POST

https://resume-screening-api-1.onrender.com/api/screening/<CANDIDATE_ID>/score


Body

{
  "jobKeywords": ["node", "express"],
  "assessmentScore": 82
}


➡️ Response returns calculated score + status.

1️⃣2️⃣ Get Shortlist

GET

https://resume-screening-api-1.onrender.com/api/screening/shortlist

📊 REPORT APIs
1️⃣3️⃣ Summary Report

GET

https://resume-screening-api-1.onrender.com/api/reports/summary

1️⃣4️⃣ Monthly Report

GET

https://resume-screening-api-1.onrender.com/api/reports/monthly?year=2025

🧪 Postman Testing Guide
1. Create a new Collection
2. Add all endpoints
3. For protected APIs:

Add Header:

Authorization: Bearer <TOKEN>

4. For upload:

Use form-data → resume → File

5. Save token automatically

In Login request → Tests tab:

const json = pm.response.json();
pm.environment.set("token", json.token);

☁️ Deployment (Render)
1. Push code to GitHub
git add .
git commit -m "init"
git push origin main

2. Go to https://render.com
3. Create → Web Service → Connect GitHub Repo
4. Set Build & Start commands
Build: npm install
Start: npm start

5. Add Environment Variables

Same as .env

6. Deploy

Render gives a live URL like:

https://resume-screening-api-1.onrender.com


✔ Public
✔ Fully working
✔ HTTPS enabled

🏁 Conclusion

This backend provides a full recruitment workflow including:

Authentication

Candidate management

Resume handling

Automated scoring

Reporting dashboards

You can now integrate this API with a frontend (React/Angular/Vue).

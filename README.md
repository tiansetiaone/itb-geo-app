# ITB Geo-Location App 🌍
Aplikasi web full-stack untuk menampilkan data geolokasi bangunan di ITB.  
Dibangun dengan **React.js (Vite), Express.js, MongoDB, dan OpenWeather API**.

---

## 🚀 Fitur
✅ CRUD Bangunan  
✅ Login & Registrasi (JWT Authentication)  
✅ Peta Interaktif dengan Leaflet.js  
✅ Integrasi OpenWeather API  
✅ Filter Status Bangunan  

---

## 📦 Instalasi
### **1️⃣ Clone Repository**
```sh
git clone https://github.com/username/itb-geo-app.git
cd itb-geo-app
2️⃣ Setup Backend
sh
Copy
Edit
cd itb-geo-backend
npm install
Buat file .env di itb-geo-backend dan isi:

env
Copy
Edit
MONGO_URI=mongodb+srv://your_mongodb_url
JWT_SECRET=your_secret_key
OPENWEATHER_API_KEY=your_api_key
Jalankan backend:

sh
Copy
Edit
npm run dev
Backend berjalan di http://localhost:5000

3️⃣ Setup Frontend
sh
Copy
Edit
cd ../itb-geo-frontend
npm install
npm run dev
Frontend berjalan di http://localhost:5173

⚙️ API Endpoints (Backend)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/buildings	Get all buildings
POST	/api/buildings	Add new building (Auth)
PUT	/api/buildings/:id	Update building (Auth)
DELETE	/api/buildings/:id	Delete building (Auth)
GET	/api/weather?lat={latitude}&lon={longitude}	Get weather by coordinates
👨‍💻 Pendekatan Pengembangan
1️⃣ Backend:

Express.js untuk REST API
MongoDB sebagai database
JWT Authentication untuk login
OpenWeather API untuk cuaca
2️⃣ Frontend:

React.js (Vite) + React Router
Leaflet.js untuk peta interaktif
Tailwind CSS untuk UI
LocalStorage untuk menyimpan token
Proteksi halaman admin dengan token JWT
🎯 Cara Testing
Gunakan Postman atau cURL untuk test API.
Contoh:

sh
Copy
Edit
# Login
curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
           "username": "admin",
           "password": "admin123"
         }'
🔥 Done! Proyek siap dikumpulkan. 🚀

yaml
Copy
Edit

---

## **✅ 4. Upload `README.md` ke GitHub**
```sh
git add README.md
git commit -m "Add documentation"
git push origin main

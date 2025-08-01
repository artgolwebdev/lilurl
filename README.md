# 🔗 Simple URL Shortener (Node.js + MongoDB)

This is a super lightweight URL shortener built with **Node.js**, **Express**, and **MongoDB (Atlas)**.

It allows you to:
- Shorten long URLs
- Redirect via short URLs
- View total number of shortened URLs

---

## 🚀 Getting Started (Development)

* Clone the repository
```
git clone https://github.com/artgolwebdev/lilurl.git
cd lilurl
```

* Install dependencies
```
npm install
```

* Set up environment variables .env
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
BASE_URL=http://localhost:5000
```

* Start the server
```
npm start
```
The server will run on http://localhost:5000

## 📡 API Endpoints

### Create a Short URL

POST /api/shorten

```
{
  "originalUrl": "https://example.com"
}
```

### Redirect to Original URL    

GET /:shortId


###  Get Total Shortened URLs   

GET  /api/total/links

```
{
  "totalUrls": 42
}
```


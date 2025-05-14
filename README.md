# 🔗 LinkAnchor

**LinkAnchor** is a modern, customizable link-in-bio tool that helps users create personal pages with multiple links and track user interactions. It provides meaningful analytics such as total clicks, browser and location-based breakdowns, and daily trends using charts.

---

## 🚀 Features

- ✨ Personalized profile pages based on usernames  
- 🖼️ Custom bio, colors, and background support  
- 🔗 Add, edit, and manage external links  
- 📊 Interactive analytics dashboard (Chart.js)  
- 🌐 Breakdown of clicks by browser and location  
- 🧮 Daily link click tracking and total counts  

---

## 🧱 Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS  
- **Authentication**: NextAuth.js (Google OAuth)  
- **Charting**: Chart.js via `react-chartjs-2` or Recharts  
- **Backend**: Node.js, MongoDB, Mongoose  

---


## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/linkanchor.git
cd linkanchor
```

### 2. Install Dependencies

```bash
npm install
```

### 3.Configure Environment Variables

```bash
GOOGLE_CLIENT_ID="CLIENT_ID"
GOOGLE_CLIENT_SECRET="CLIENT_SECRET"
MONGO_URI="YOUR_MONGODB_URL"
SECRET="SECRET"
BUCKET_NAME="YOUR_S3_BUCKET"
S3_ACCESS_KEY="YOUR_S3_ACCESS_KEY"
S3_SECRET_KEY="YOUR_S3_SECRET_KEY"
S3_REGION="REGION"
```
### 4.Start the Development Server
```bash
npm run dev
```

## 📊 Analytics Overview
- Event Tracking: Each page view and link click is saved in the Event collection.
- Click Count: Clicks are also incremented directly in the Page document for performance.
- Data Visualization: Uses Chart.js to show daily trends of clicks per link.
- Breakdown: Shows breakdown by browser and location using aggregated data.

## Example Use Case
- Create a Page: After logging in with Google, set your username and customize your page.
- Add Links: Provide title, subtitle, and URL for each link you want to display.
- Share Your Page: Share your /[username] URL.
- Track Analytics: Visit the dashboard to view how many people viewed or clicked your links, when, and from where.

## 📄 License
This project is licensed under the MIT License.

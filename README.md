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

## 📁 Project Structure

linkanchor/
├── app/
│ ├── [username]/ # Public link-in-bio pages
│ ├── dashboard/analytics/ # Analytics dashboard
│ └── api/
│ ├── click/route.js # Click tracking API route
│ ├── view/route.js # View tracking API route
├── components/
│ └── Chart.js # Line chart component
├── models/
│ ├── Page.js # User profile schema
│ ├── Event.js # Click/view event schema
│ └── User.js # Authenticated user schema

yaml
Copy
Edit

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/linkanchor.git
cd linkanchor
2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env.local file in the root directory with the following:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
4. Start the Development Server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 in your browser.

📊 Analytics Overview
Event Tracking: Each page view and link click is saved in the Event collection.

Click Count: Clicks are also incremented directly in the Page document for performance.

Data Visualization: Uses Chart.js to show daily trends of clicks per link.

Breakdown: Shows breakdown by browser and location using aggregated data.

📌 Example Use Case
Create a Page: After logging in with Google, set your username and customize your page.

Add Links: Provide title, subtitle, and URL for each link you want to display.

Share Your Page: Share your /[username] URL.

Track Analytics: Visit the dashboard to view how many people viewed or clicked your links, when, and from where.

🙌 Contributing
Got a suggestion or improvement? Feel free to fork the repository and open a pull request.

📄 License
This project is licensed under the MIT License.

🔒 Security Note
Do not expose your .env.local credentials in public repositories. Use .gitignore to keep them private.
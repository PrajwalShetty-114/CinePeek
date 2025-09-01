# 🎬 CinePeek  
**Discover, Explore & Save Movies/TV Shows with TMDb API**  

CinePeek is a movie and TV show discovery web app built as a **capstone project** for my Full-Stack Web Development Bootcamp. It allows users to explore trending content, filter by genre and language, view details, and save favorites to a personal watchlist.  

---

## 🚀 Features  
- 🔍 **Search & Discover** movies/TV shows by genre, language, and media type.  
- 🎲 **Random Picks** feature for when you can’t decide what to watch.  
- ⭐ **Save to Watchlist** — persistently stored in JSON files (simulating a database).  
- ❌ **Remove from Watchlist** with instant UI feedback.  
- 🎨 **Netflix-style Dark UI** with responsive design.  
- 🌐 **TMDb API Integration** for real, up-to-date content.  

---

## 🛠️ Tech Stack  
- **Frontend:** HTML, CSS, EJS Templates  
- **Backend:** Node.js, Express.js  
- **Data Storage:** JSON files (simulating a mini database)  
- **API:** [The Movie Database (TMDb)](https://www.themoviedb.org/)  
- **Styling:** Responsive, dark theme inspired by streaming apps  

---

### 📁 Project Structure

This project is organized as follows:

-   **`public/`**
    -   `CSS/` - Stylesheets for the application.
    -   `videos/` - Video assets.
    -   `assets/` - Other miscellaneous assets.
-   **`views/`** - EJS templates for the user interface.
    -   `index.ejs`
    -   `discover.ejs`
    -   `randomPick.ejs`
    -   `watchList.ejs`
-   **`index.js`** - The main Express server file.
-   **`Movies.json`** - A local backup of movie data.
-   **`TvShows.json`** - A local backup of TV show data.
-   **`watchList.json`** - Stores the user's saved watchlist.
-   **`.env`** - API keys and sensitive environment variables (ignored by Git).
-   **`.env.example`** - An example file showing the required environment variables.
-   **`package.json`** - Lists project dependencies and scripts.
-   **`README.md`** - The main project documentation file.

---

## ⚙️ Setup Instructions  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/cinepeek.git
   cd cinepeek
2. **Install dependencies**  
   ```bash
   npm install
3. **Run the server**  
   ```bash
   node index.js
---
## 🖼️ Screenshots

---

## Credits
 Data provided by TMDb
.

Built as part of The Complete Full-Stack Web Development Bootcamp (Udemy).

---
   
## 📜 License

---

This project is for educational purposes only and not for commercial use.


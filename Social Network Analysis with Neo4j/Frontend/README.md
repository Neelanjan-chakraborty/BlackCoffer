# Social Network Analyzer - Frontend

Welcome to the **Frontend** of the **Social Network Analyzer** project! This React-based frontend provides a modern, interactive user interface for managing and visualizing a social network. It connects to a Flask backend to interact with a Neo4j graph database, enabling you to add people, create friendships, and visualize the social network.

---

## **Features**
- **Add People**: Add individuals to the social network with attributes like name, age, location, and interests.
- **Add Friendships**: Create connections between people in the network.
- **Visualize Network**: View an interactive graph of the social network, showing people, their locations, and interests.
- **Responsive Design**: Built with modern UI components and optimized for all screen sizes.

---

## **Table of Contents**
1. [Installation Guide](#installation-guide)
2. [Folder Structure](#folder-structure)
3. [Environment Variables](#environment-variables)
4. [Running the Application](#running-the-application)
5. [Connecting to the Backend](#connecting-to-the-backend)
6. [Contributing](#contributing)
7. [License](#license)

---

## **Installation Guide**

### **Prerequisites**
- Node.js 16+
- npm or yarn
- Flask backend (see [Backend README](../backend/README.md) for setup instructions)

---

### **Step 1: Clone the Repository**
Clone the repository to your local machine:
```bash
git clone [https://github.com/your-username/social-network-analyzer.git](https://github.com/Neelanjan-chakraborty/BlackCoffer.git)
cd Social Network Analysis with Neo4j/Frontend
```

---

### **Step 2: Install Dependencies**
Install the required dependencies using npm or yarn:
```bash
npm install
```
or
```bash
yarn install
```

---

### **Step 3: Configure Environment Variables**
Create a `.env` file in the `frontend` folder and add the following environment variables:
```
REACT_APP_API_URL=https://your-backend.onrender.com
```
Replace `https://your-backend.onrender.com` with the URL of your deployed Flask backend.

---

### **Step 4: Run the Application**
Start the development server:
```bash
npm start
```
or
```bash
yarn start
```

The application will be available at `http://localhost:3000`.

---

## **Folder Structure**
```
frontend/
├── public/                  # Static assets
│   ├── index.html           # Main HTML file
│   └── ...                  # Other static files
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── pages/               # Application pages
│   ├── App.js               # Main application component
│   ├── index.js             # Entry point
│   └── ...                  # Other source files
├── package.json             # Project dependencies
├── .env                     # Environment variables
└── README.md                # Frontend documentation
```

---

## **Environment Variables**
| Variable Name         | Description                                | Example Value                          |
|-----------------------|--------------------------------------------|----------------------------------------|
| `REACT_APP_API_URL`   | URL of the Flask backend                   | `https://your-backend.onrender.com`    |

---

## **Running the Application**
1. **Development Mode**:
   - Run `npm start` or `yarn start`.
   - The app will be available at `http://localhost:3000`.

2. **Production Build**:
   - Generate a production build:
     ```bash
     npm run build
     ```
   - Serve the build folder using a static server (e.g., `serve`):
     ```bash
     npm install -g serve
     serve -s build
     ```

---

## **Connecting to the Backend**
The frontend communicates with the Flask backend using the `REACT_APP_API_URL` environment variable. Ensure the backend is running and accessible at the specified URL.

### **Example API Calls**
1. **Add a Person**:
   ```javascript
   fetch(`${process.env.REACT_APP_API_URL}/api/add_person`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       name: 'Alice',
       age: 30,
       location: 'New York',
       interests: ['music', 'travel'],
     }),
   });
   ```

2. **Add a Friendship**:
   ```javascript
   fetch(`${process.env.REACT_APP_API_URL}/api/add_friendship`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       person1: 'Alice',
       person2: 'Bob',
     }),
   });
   ```

3. **Visualize Network**:
   ```javascript
   fetch(`${process.env.REACT_APP_API_URL}/api/visualize`)
     .then((response) => response.text())
     .then((html) => {
       // Render the HTML in an iframe
     });
   ```

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

---

Enjoy building and visualizing your social network! 🚀

# tech-wizards-ibm
# 🚀 Examination Portal - Full-Stack Exam System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dark Mode](https://img.shields.io/badge/Theme-Dark-blue.svg)](https://github.com/topics/dark-mode)
[![Client Side](https://img.shields.io/badge/Tech-HTML_CSS_JS-green.svg)](https://developer.mozilla.org/en-US/docs/Web)

A **production-ready**, **dark-themed** online examination portal with **subject-wise questions**, **30-minute timer**, **fullscreen mode**, and **localStorage persistence**. Perfect for coding interviews, academic assessments, or competitive programming practice.

## ✨ **Demo Features**

- **75/25 Split Layout** - Questions (75%) | Navigation (25%)
- **3 Subjects** - C Programming, COA, Front-End Development
- **15 MCQs** - 5 questions per subject (A-D options)
- **30-Minute Timer** - Auto-submit on expiry
- **Fullscreen Mode** - Immersive exam experience
- **Subject Tabs** - Switch between C/COA/Frontend
- **Question Navigation** - Clickable 1-5 grid
- **Answer Persistence** - Survives page refresh
- **Dark Theme** - Eye-friendly #121212 background
- **Responsive** - Mobile/desktop optimized


## 🎮 **Quick Start**
### 1. **Download & Run Locally**
```bash
# Clone/Download repository
git clone https://github.com/YOUR_USERNAME/examination-portal.git
cd examination-portal

# Open index.html in any browser
# OR use Live Server (VS Code extension)
```
### 2. Login Credentials:
```Username: student```

```Password: exam123```

### 3. Immediate Access:

1. Open index.html
2. Enter credentials
3. Fullscreen exam starts automatically
4. Timer counts down from 30:00
5. Submit manually or auto-submit on expiry


## 📁 Project Structure
```text
examination-portal/
├── index.html       # Main layout + login screen
├── style.css        # Dark theme + 75/25 split layout
├── app.js          # Core logic + timer + fullscreen
└── README.md       # This file
```

## ⚙️ Configuration

### Adjust Timer Duration
```javascript
// In app.js, line ~15
this.TOTAL_TIME = 1800;  // 30 minutes (1800 seconds)
// Change to: 600 (10min), 3600 (1hr), etc.
```

### Add New Questions
```javascript
// In app.js, extend questions object
cprog: [ /* Add new {id, q, opts[], correct} */ ]
```

### Change Credentials
```javascript
// In handleLogin() method
if (username === 'student' && password === 'exam123') {
    // Modify these values
}
```


## 🚀 Deployment Options
### Github Pages (Free - 2 minutes)
```bash
git add .
git commit -m "Deploy exam portal"
git push origin main
# Settings → Pages → Deploy from main branch
# Live: https://YOUR_USERNAME.github.io/examination-portal
```

### Netlify (Free - Drag & Drop)
1. netlify.com → Drag folder
2. Instant HTTPS URL provided

### Vercel (Free)
```bash
npm i -g vercel
vercel --prod
```

## 📱 Browser Support

| Browser     | Status |
| ----------- | ------ |
| Chrome 60+  | ✅ Full |
| Firefox 55+ | ✅ Full |
| Safari 11+  | ✅ Full |
| Edge 15+    | ✅ Full |

**Fullscreen Note**: Some browsers require user interaction before allowing fullscreen.

## 🎨 Design System
```text
Primary: #121212 (Background)
Text:    #e0e0e0 (Light)
Accent:  #00d4ff → #0099cc (Gradient)
Success: #28a745 (Answered)
Warning: #ffa502 (Timer)
Danger:  #ff4757 (Time Up)
```

## 📊 Subject Coverage
| Subject       | Topics Covered                            | Question Count |
| ------------- | ----------------------------------------- | -------------- |
| C Programming | printf, arrays, loops, malloc, data types | 5              |
| COA           | CPU, pipeline, ALU, cache, Von Neumann    | 5              |
| Front-End     | CSS, Flexbox, semantic HTML, frameworks   | 5              |

## 🧪 Testing
```bash
# Test login
student / exam123 → Success

# Test timer
30:00 → Auto-submit at 00:00

# Test navigation
Subject tabs ↔ Question grid ↔ Prev/Next

# Test persistence
Answer Q1 → Refresh → Q1 still answered ✓
```

## 🔧 Customization Guide
1. Branding
```css
/* style.css - Line 20 */
background: linear-gradient(135deg, #YOUR_BRAND, #SECONDARY);
```
2. Timer Colors
```css
/* Warning <2min, Danger <1min */
.timer-warning { color: #YOUR_COLOR; }
```
3. New Subjects
```javascript
// app.js - Add to questions object
newsubject: [ /* 5 questions */ ]
// Add tab button in HTML
```

## 🤝 Contributing
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License
This project is [MIT licensed](https://opensource.org/licenses/MIT)

## 🙌 Acknowledgements
Built for computer science students preparing for placements, internships, and competitive programming. Special thanks for modern CSS Grid/Flexbox for perfect layouts.

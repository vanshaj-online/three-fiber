# CyberX - Interactive 3D Car Showcase

A modern React application featuring an interactive 3D car model using Three.js and React Three Fiber. The project demonstrates advanced 3D visualization with environment mapping, camera controls, and smooth animations.

## 🚀 Features

- Interactive 3D car model visualization
- Dynamic environment lighting using HDR maps
- Smooth model rotation animations using GSAP
- Responsive design with Tailwind CSS
- Custom font integration
- Camera controls and perspective management
- Clean and modern UI components

## 🛠️ Technologies Used

- React 19
- Three.js
- React Three Fiber
- React Three Drei
- GSAP for animations
- Tailwind CSS
- Vite
- Lenis for smooth scrolling
- Leva for debug controls

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
🎮 Controls
• Use the arrow buttons to rotate the car model
• Camera position and rotation can be adjusted through debug controls (in development)
• Smooth scrolling enabled throughout the application

## 📁 Project Structure
├── public/ 
│ ├── car.glb # 3D car model 
│ ├── *.hdr # HDR environment maps 
│ └── *.webp/jpg # Background images 
├── src/ 
│ ├── components/ # React components 
│ │ ├── button.jsx # Custom button component 
│ │ ├── card.jsx # Info card component 
│ │ ├── hero.jsx # Hero section 
│ │ └── navbar.jsx # Navigation component 
│ ├── assets/ # Project assets 
│ │ └── fonts/ # Custom fonts 
│ ├── App.jsx # Main application component 
│ └── main.jsx
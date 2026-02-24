# LiveShare - Real-Time Location Tracking System

A professional, Uber-style real-time location tracking web application built with Node.js, Express, WebSocket, Leaflet.js, and OpenStreetMap. **No API keys required!**

## 🚀 Features

- **Real-time GPS Tracking** - Multiple users can share their location simultaneously
- **Live Dashboard** - Professional tracking interface with Leaflet maps
- **Route Calculation** - Real road routing using OSRM public API (free, no API key)
- **Mobile-Friendly** - Fully responsive design optimized for mobile devices
- **Modern UI** - Beautiful gradient design with glassmorphism effects
- **Auto-Reconnect** - Automatic WebSocket reconnection on disconnect
- **Smooth Animations** - Animated marker movements with rotation based on direction
- **Dark Mode** - Toggle between light and dark themes
- **No API Keys** - Completely free, works without any API keys

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Two or more devices on the same WiFi network (for testing)

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install ws express cors
   ```

2. **That's it!** No API keys needed. The app uses:
   - OpenStreetMap tiles (free, no API key)
   - OSRM public routing API (free, no API key)

## 🏃 Running the Application

1. **Start the Server**
   ```bash
   node server.js
   ```

2. **Access the Application**
   - The server will display your local IP address
   - Open your browser and navigate to:
     - **Share Page**: `http://YOUR_IP:3000/share`
     - **Track Page**: `http://YOUR_IP:3000/track`

3. **For Same WiFi Testing**
   - Use the network IP address shown in the console (not localhost)
   - Example: `http://192.168.1.100:3000/share`
   - Open on multiple devices connected to the same WiFi

## 📱 Usage

### Share Page (`share.html`)

1. Enter your name in the input field
2. Click "Start Live Sharing"
3. Allow location permissions when prompted
4. Your location will be sent to the server every 2 seconds
5. Status indicator shows connection status:
   - 🟢 **Green**: Sharing active
   - 🔴 **Red**: Disconnected

### Track Page (`track.html`)

1. Opens with a full-screen Leaflet map using OpenStreetMap
2. Sidebar shows all active users sharing their location
3. Each user appears as a colored marker on the map
4. Markers rotate based on movement direction
5. Click on a user card in the sidebar to:
   - Center map on that user
   - View distance and ETA
   - Calculate and display route using OSRM
6. Click "Show Route" to see the driving route from your location to the user
7. Toggle dark mode using the moon/sun icon in the header

## 🎨 UI Features

- **Modern Gradient Background** - Purple/blue gradient with grid pattern
- **Glassmorphism Sidebar** - Frosted glass effect sidebar panel
- **Smooth Animations** - Marker movements with rotation and UI transitions
- **Status Indicators** - Real-time connection status
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Professional Typography** - Poppins font family
- **Dark Mode** - Toggle between light and dark themes
- **Last Updated Time** - Shows when each user's location was last updated

## 🔧 Technical Details

### Server (`server.js`)
- Express server on port 3000
- WebSocket server for real-time communication
- Maintains active users map
- Broadcasts location updates to all trackers
- Auto-cleanup of disconnected users
- Auto-detects local IP for WiFi access

### Share Page (`share.html`)
- Uses `navigator.geolocation.watchPosition` for GPS tracking
- Sends location updates every 2 seconds
- WebSocket connection with auto-reconnect
- Professional mobile-first UI

### Track Page (`track.html`)
- **Leaflet.js** for map rendering
- **OpenStreetMap** tiles (no API key required)
- **OSRM Public API** for route calculation (no API key required)
- Real-time marker updates with smooth animation
- Marker rotation based on movement direction
- Sidebar dashboard with user list
- Distance and ETA calculations
- Route visualization with colored polylines
- Dark mode support

## 🌐 Network Setup for Multiple Devices

1. **Find Your IP Address**
   - Windows: Open Command Prompt → `ipconfig` → Look for IPv4 Address
   - Mac/Linux: Open Terminal → `ifconfig` or `ip addr`
   - The server will also display it when started

2. **Access from Other Devices**
   - Make sure all devices are on the same WiFi network
   - Use the IP address shown in server console
   - Example: `http://192.168.1.100:3000/share`

3. **Firewall**
   - Allow port 3000 through your firewall if needed
   - Windows: Windows Defender Firewall → Allow an app → Node.js

## 📝 Message Format

### Location Update (Share → Server)
```json
{
  "type": "location",
  "id": "UserName",
  "lat": 20.2961,
  "lng": 85.8245
}
```

### Tracker Registration (Track → Server)
```json
{
  "type": "tracker"
}
```

### Server Broadcast (Server → Track)
```json
{
  "type": "location",
  "id": "UserName",
  "lat": 20.2961,
  "lng": 85.8245,
  "timestamp": 1234567890
}
```

## 🗺️ Map & Routing Details

### OpenStreetMap Tiles
- Source: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- Free and open-source
- No API key required
- High-quality map tiles

### OSRM Routing API
- Public endpoint: `https://router.project-osrm.org/route/v1/driving/`
- Free public routing service
- No API key required
- Returns real road routes with distance and duration
- Format: `/route/v1/driving/{lng1},{lat1};{lng2},{lat2}?overview=full&geometries=geojson`

## 🐛 Troubleshooting

### Location Not Updating
- Check browser location permissions
- Ensure HTTPS or localhost (some browsers require HTTPS for geolocation)
- Check browser console for errors

### WebSocket Connection Failed
- Verify server is running
- Check firewall settings
- Ensure correct IP address is used
- Check browser console for connection errors

### Map Not Loading
- Check internet connection (needed for OpenStreetMap tiles)
- Verify Leaflet.js is loading correctly
- Check browser console for errors

### Route Not Calculating
- Check internet connection (OSRM is a public API)
- Verify OSRM API is accessible
- Check browser console for API errors
- Ensure location permissions are granted

### Markers Not Rotating
- Marker rotation is based on movement direction
- If user hasn't moved, rotation won't change
- Try moving the device to see rotation in action

## 🔒 Security Notes

- For production, use HTTPS
- Implement authentication if needed
- Rate limit WebSocket connections
- Validate and sanitize user inputs
- Consider using a private OSRM instance for production

## 📦 File Structure

```
.
├── server.js          # Express + WebSocket server
├── share.html         # Location sharing page
├── track.html         # Location tracking dashboard
└── README_LOCATION_TRACKING.md
```

## 🎯 Bonus Features Implemented

✅ **Marker Rotation** - Markers rotate based on movement direction  
✅ **Auto-Center Map** - Automatically fits map to show all users  
✅ **Last Updated Time** - Shows when each user's location was last updated  
✅ **Dark Mode** - Toggle between light and dark themes  
✅ **Professional Branding** - Clean header with app name and dark mode toggle  

## 🆚 Comparison: Google Maps vs OpenStreetMap

| Feature | Google Maps | OpenStreetMap (This App) |
|---------|-------------|--------------------------|
| API Key Required | ✅ Yes | ❌ No |
| Cost | 💰 Paid (after free tier) | 🆓 Free |
| Routing API | 💰 Paid | 🆓 Free (OSRM) |
| Setup Complexity | Medium | Low |
| Map Quality | Excellent | Very Good |
| Offline Support | Limited | Possible with caching |

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions, please check:
1. Browser console for errors
2. Server console for connection logs
3. Network tab for API requests

## 🙏 Credits

- **Leaflet.js** - Open-source JavaScript library for mobile-friendly interactive maps
- **OpenStreetMap** - Free, editable map of the world
- **OSRM** - Open Source Routing Machine (public routing service)

---

**Built with ❤️ using Node.js, Express, WebSocket, Leaflet.js, and OpenStreetMap**

**No API keys required - 100% Free!**

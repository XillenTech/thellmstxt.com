# AI Bot Tracking System

This document describes the AI bot tracking system implemented for thellmstxt.com.

## Overview

The AI bot tracking system detects and monitors visits from AI crawlers and chatbots like ChatGPT, Claude, Perplexity, Gemini, and others. It provides real-time analytics and insights into AI-driven traffic to your website.

## Features

### 🔍 **AI Bot Detection**
- **User-Agent Analysis**: Detects AI bots through custom User-Agent strings
- **Referer Tracking**: Identifies AI bots through referrer URLs from AI platforms
- **IP Range Checking**: Validates against known AI service IP ranges
- **Confidence Scoring**: Provides confidence levels for each detection

### 📊 **Real-time Dashboard**
- **Statistics Cards**: Total visits, unique bots, today's visits, weekly trends
- **Top Bots Chart**: Most frequent AI bot visitors
- **Detailed Visit Log**: Complete visit history with timestamps, IPs, and URLs
- **Pagination**: Navigate through large datasets efficiently

### 🔐 **Security & Access Control**
- **Password Protected**: Requires user authentication
- **Admin Only Access**: Restricted to authenticated users
- **JWT Token Validation**: Secure API access

## Supported AI Bots

### Major AI Platforms
- **OpenAI/ChatGPT**: `chatgpt`, `openai`, `gpt-4`, `chatgpt-user`
- **Anthropic/Claude**: `claude`, `anthropic`, `claudebot`
- **Perplexity AI**: `perplexity`, `perplexitybot`
- **Google AI**: `gemini`, `google-ai`, `googlebot-ai`
- **Microsoft AI**: `copilot`, `bing-ai`, `microsoft-ai`

### Other AI Tools
- **Poe**: `poe-bot`
- **You.com**: `you-bot`
- **Brave AI**: `brave-ai`
- **DuckDuckGo**: `duckduckgo-bot`
- **Content Tools**: `jasper`, `copy.ai`, `writesonic`, `rytr`, `simplified`

## Architecture

### Backend (Express.js)
```
central-backend/src/routes/ai-bot-tracking.ts
├── POST /api/track-ai-bot          # Track AI bot visit
├── GET /api/ai-bots-data           # Get tracking data (admin)
└── DELETE /api/ai-bots-data        # Clear tracking data (admin)
```

### Frontend (Next.js)
```
thellmstxt.com/src/
├── app/ai-bots-tracking/page.tsx   # Main dashboard page
├── components/AIBotsDashboard.tsx  # Dashboard component
├── components/AITracker.tsx        # Tracking initialization
└── utils/ai-bot-tracker.ts         # Client-side detection
```

## How It Works

### 1. **Client-Side Detection**
- Automatically runs on every page load
- Analyzes `navigator.userAgent` and `document.referrer`
- Sends detection data to backend API

### 2. **Server-Side Processing**
- Receives tracking data from frontend
- Performs additional IP range validation
- Calculates confidence scores
- Stores visit data in memory (configurable for database)

### 3. **Dashboard Display**
- Fetches tracking data via authenticated API
- Displays real-time statistics and visit logs
- Provides filtering and pagination

## Usage

### Accessing the Dashboard
1. **Login** to your account
2. **Navigate** to `/ai-bots-tracking` or use the user dropdown menu
3. **View** real-time AI bot analytics

### Testing the System
In development mode, you can test the system by running:
```javascript
// In browser console
simulateAIBotVisits()
```

This will simulate visits from various AI bots for testing purposes.

## Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000  # Backend API URL
JWT_SECRET=your-secret-key                      # JWT signing secret
```

### AI Bot Patterns
The system uses predefined patterns for detection. You can modify these in:
- **Backend**: `central-backend/src/routes/ai-bot-tracking.ts`
- **Frontend**: `thellmstxt.com/src/utils/ai-bot-tracker.ts`

## API Endpoints

### Track AI Bot Visit
```http
POST /api/track-ai-bot
Content-Type: application/json

{
  "userAgent": "Mozilla/5.0 (compatible; ChatGPT-User/1.0)",
  "referer": "https://chat.openai.com/c/abc123",
  "url": "https://thellmstxt.com/page"
}
```

### Get Tracking Data
```http
GET /api/ai-bots-data?limit=50&offset=0
Authorization: Bearer <jwt-token>
```

### Clear Tracking Data
```http
DELETE /api/ai-bots-data
Authorization: Bearer <jwt-token>
```

## Data Structure

### Visit Record
```typescript
interface AIBotVisit {
  id: string;
  timestamp: string;
  userAgent: string;
  referer: string;
  ip: string;
  url: string;
  detectedAs: string;
  confidence: number;
}
```

### Statistics
```typescript
interface AIBotStats {
  totalVisits: number;
  uniqueBots: number;
  todayVisits: number;
  thisWeekVisits: number;
  topBots: Array<{ bot: string; count: number }>;
}
```

## Security Considerations

### Privacy
- **IP Addresses**: Stored for bot detection (consider anonymization for GDPR)
- **User Agents**: Stored for analysis (contains device/browser info)
- **Referrers**: Stored for source tracking

### Access Control
- **Authentication Required**: All dashboard access requires login
- **JWT Validation**: API endpoints validate user tokens
- **Admin Only**: Data management restricted to authenticated users

## Future Enhancements

### Planned Features
- **Database Storage**: Move from in-memory to persistent storage
- **Real-time Notifications**: Alert when new AI bots are detected
- **Export Functionality**: Download tracking data as CSV/JSON
- **Advanced Analytics**: Time-based trends and patterns
- **Bot Blocking**: Option to block detected AI bots
- **Custom Rules**: User-defined detection patterns

### Performance Optimizations
- **Caching**: Implement Redis for better performance
- **Batch Processing**: Handle high-volume tracking data
- **Data Retention**: Automatic cleanup of old records
- **CDN Integration**: Distribute tracking script globally

## Troubleshooting

### Common Issues

1. **No Data Showing**
   - Check if backend is running
   - Verify API endpoint accessibility
   - Ensure user is authenticated

2. **False Positives**
   - Review detection patterns
   - Adjust confidence thresholds
   - Update bot signatures

3. **Performance Issues**
   - Monitor memory usage
   - Implement data pagination
   - Consider database migration

### Debug Mode
Enable debug logging by setting:
```env
DEBUG_AI_TRACKING=true
```

## Support

For issues or questions about the AI bot tracking system:
- Check the console for error messages
- Review the API documentation
- Contact the development team

---

**Note**: This system is designed for monitoring and analytics purposes. Ensure compliance with privacy laws and terms of service when implementing tracking systems.

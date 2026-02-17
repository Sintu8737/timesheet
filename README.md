# Ticktock - Timesheet Management Application

A modern, responsive timesheet management application built with Next.js and TailwindCSS. This application allows users to track their work hours, manage projects, and maintain comprehensive timesheet records.

## Features

- **Authentication**: Secure login system with NextAuth.js
- **Dashboard**: Clean, intuitive dashboard for managing timesheets
- **Timesheet Management**: Add, edit, and view timesheet entries
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Form Validation**: Client-side validation with error handling
- **Mock API**: Internal API routes with realistic mock data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Authentication**: NextAuth.js
- **Language**: JavaScript (ES6+)
- **Font**: Inter (Google Fonts)

## Project Structure

```
timesheet-app/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/           # NextAuth configuration
│   │   │   └── timesheets/     # Timesheet API endpoints
│   │   ├── dashboard/          # Dashboard page
│   │   ├── login/              # Login page
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Home page (redirect)
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Providers.js        # Session provider
│   │   ├── TimesheetTable.js   # Timesheet table component
│   │   └── AddEntryModal.js    # Add/Edit modal
│   └── data/
│       └── mockData.js         # Mock data for users and timesheets
├── .env.local                  # Environment variables
├── package.json
├── README.md
└── tailwind.config.js
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Add the following environment variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```
   - For production, generate a secure secret for `NEXTAUTH_SECRET`

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app will redirect to login if not authenticated

## Usage

### Login

- **Default Credentials**:
  - Email: `john.doe@example.com`
  - Password: `password123`
  
- **Alternative User**:
  - Email: `jane.smith@example.com`
  - Password: `password123`

### Dashboard Features

1. **View Timesheets**: Browse all weekly timesheet entries
2. **Filter Options**: Filter by date range and status
3. **Add Entries**: Click "Add New Entry" to create new timesheet entries
4. **Edit Entries**: Click "Update" on any timesheet to edit
5. **Status Tracking**: Visual indicators for COMPLETED, INCOMPLETE, and MISSING entries

### Timesheet Statuses

- **COMPLETED**: All required hours (40) logged for the week
- **INCOMPLETE**: Some hours logged but not the full requirement
- **MISSING**: No hours logged for the week

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Timesheets
- `GET /api/timesheets` - Get all timesheets
- `POST /api/timesheets` - Create new timesheet entry
- `GET /api/timesheets/[id]` - Get specific timesheet
- `PUT /api/timesheets/[id]` - Update timesheet
- `DELETE /api/timesheets/[id]` - Delete timesheet

## Development Notes

### Code Quality

- **Component Structure**: Modular, reusable components with clear separation of concerns
- **Naming Conventions**: Descriptive variable and function names following JavaScript conventions
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **State Management**: Efficient state management using React hooks

### Assumptions

1. **Authentication**: Uses credential-based authentication with mock user data
2. **Data Persistence**: Currently uses in-memory mock data (no database)
3. **Time Tracking**: Weekly timesheets with 40-hour requirement
4. **User Roles**: Single user role (no admin/user distinction)

### Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Real-time collaboration features
- Advanced reporting and analytics
- Email notifications
- Multi-language support
- Mobile app development

## Testing

While not implemented in this version, the application is structured to support:

- **Unit Tests**: Using Jest and React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Using Cypress or Playwright

## Performance Considerations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized images
- **Caching**: API response caching for improved performance
- **Bundle Size**: Optimized bundle with tree shaking

## Security

- **Session Management**: Secure session handling with NextAuth.js
- **Input Validation**: Client-side and server-side validation
- **XSS Protection**: Built-in XSS protection with Next.js
- **CSRF Protection**: CSRF tokens for form submissions

## Deployment

### Vercel (Recommended)

1. **Push code to GitHub repository**
2. **Connect repository to Vercel**
3. **Set environment variables in Vercel dashboard**:
   ```
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-secure-secret-here
   ```
4. **Deploy automatically**

### 🔧 Vercel Deployment Troubleshooting

If login functionality fails on Vercel, check these common issues:

#### 1. Environment Variables
Ensure these are set in Vercel dashboard:
- `NEXTAUTH_URL` must be your full Vercel URL (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET` must be a secure random string

Generate a secure secret:
```bash
openssl rand -base64 32
```

#### 2. Build Issues
- Ensure all dependencies are in `package.json`
- Check Vercel build logs for errors
- Verify API routes are properly exported

#### 3. Common Solutions
```bash
# Clear local build cache
rm -rf .next

# Rebuild locally to test
npm run build
npm start
```

#### 4. Debugging Steps
1. Visit `https://your-app.vercel.app/api/health` to verify API is working
2. Check browser console for JavaScript errors
3. Review Vercel function logs for API errors
4. Ensure NextAuth routes are accessible at `/api/auth/[...nextauth]`

#### 5. Production Configuration
The app now includes:
- Proper `NEXTAUTH_SECRET` handling
- User ID conversion to string (JWT requirement)
- Production-ready error handling
- Health check endpoint at `/api/health`

### Other Platforms

The application can be deployed to any platform supporting Node.js:

- AWS (Amplify, EC2)
- Google Cloud Platform
- DigitalOcean
- Heroku

## Support

For issues or questions:

1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Review the API endpoints for proper data structure

## Time Spent

Approximately 4-5 hours for complete implementation including:
- Project setup and configuration
- Authentication implementation
- Dashboard and UI components
- API routes and mock data
- Styling and responsive design
- Documentation

---

**Built with ❤️ using Next.js and TailwindCSS**

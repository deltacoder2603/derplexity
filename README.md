# <img src="/public/logo.png" alt="Derplexity Logo" width="42" height="42" style="vertical-align: middle;"> Derplexity

Derplexity is a modern web application that provides an AI-powered search experience using Google's Gemini 2.0 model. It allows users to ask questions and receive intelligent answers with cited sources.

[Live Demo](https://derplexity.vercel.app/)

## Features

- **AI-Powered Search**: Ask questions in natural language and get comprehensive answers
- **Source Citations**: View the sources used to generate answers
- **Follow-up Questions**: Continue your research with follow-up queries
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **AI Integration**: Google Gemini 2.0 API
- **UI Components**: Custom components with shadcn/ui inspiration

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/deltacoder2603/derplexity.git
   cd derplexity
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Usage

1. Type your question in the search box on the home page
2. View the AI-generated answer along with source citations
3. Ask follow-up questions to continue your research
4. Toggle between dark and light mode using the theme button in the top-right corner

## Project Structure

- `/app`: Next.js app router pages and API routes
- `/components`: Reusable React components
- `/lib`: Utility functions and type definitions
- `/public`: Static assets

## Deployment

This application can be easily deployed on Vercel:

```bash
npm run build
# or
yarn build
```

For more deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

MIT

## Author

[deltacoder2603](https://github.com/deltacoder2603)

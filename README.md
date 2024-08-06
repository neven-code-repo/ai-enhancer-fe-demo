## Setup and Running the Project

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   VITE_BACKEND_URL=<your-backend-url> (http://localhost:3001/)
   !remember to start your backend server before trying to use any of the options on the frontend!

   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Project decissions and trade-offs

1. I limited myself to 5h for this, so some sacrifices have been made, but i believe you will be able to see what my idea was.
2. Styling / CSS or how CSS is being handled was done as simple as possible to save on time, thats why you will notice everything is in css files
3. Both project and components / styling options could be upgraded to use styled components or some other more "industry" standard way to handle styling in react
4. ai-enhancer HOC is in lib folder to "mock" npm package functionality (importing and adding it where needed)
5. Both styled, unstyled and custom input components are provided to demonstrate how provided HOC can be used, it could be expanded and improved significantly given more time, allowing even more flexibility and use-cases for example (prepared default styles, animations, tooltips, AI suggestions to pick from etc, etc...)
6. Minimum error handling was done, this was intentional to save time, could be improved significantly
7. I've created separate backend with graph and rest endpoints (REST is disabled, but i left it for you to review)
8. I decided not to use any complicated prompts but rather keep it simple just for this demostration, you will see how i've set it up, any prompt combination can be added easily and this functionality can be further improved (prompt-templates.js at the backend repo)
9. I decided to remove translation as an option because i run out of the time, it required me to forward additional parameter for country and to provide that selection on frontend side so i opted out, however it can be added easily if needed.
10. TypeScript / Code Organisation, I didnt use typescript, again to keep it simple, some typechecking has been done via propTypes, code and file structure is also setup plainly

If everything goes well after setup you should see this and be able to use any of the options
![alt text](https://i.imgur.com/yJRKFrU.png)

![alt text](https://i.imgur.com/YEJwYN9.png)

## Project Structure

The project is structured as follows:

- `src/`: Contains the main source code
  - `components/`: React components
  - `styles/`: CSS files
  - `lib/`: Custom libraries and HOCs
  - `App.jsx`: Main application component
  - `main.jsx`: Entry point of the application
- `public/`: Public assets
- `index.html`: HTML template

## Functionality

### AI Enhancement

The core functionality of this project is the AI enhancement of input components. This is achieved through a Higher-Order Component (HOC) called `withAIEnhancer`. This HOC wraps input components and adds AI enhancement capabilities such as rephrasing, improving, and summarizing text.

### Components

1. **Unstyled Examples** (`src/components/unstyled-examples.jsx`):

   - Demonstrates basic usage of AI-enhanced input and textarea components without custom styling.

2. **Styled Examples** (`src/components/styled-examples.jsx`):

   - Shows AI-enhanced input and textarea components with modern styling.

3. **Custom Examples** (`src/components/custom-examples.jsx`):
   - Illustrates how to create custom AI-enhanced input components with unique styling and custom enhancement buttons.

### Styling

The project uses CSS for styling, with separate files for different components:

- `src/styles/App.css`: Global styles
- `src/styles/styled-examples.css`: Styles for the styled and custom examples

### AI Enhancement Process

When a user clicks on an enhancement button:

1. The text is sanitized and escaped.
2. A GraphQL query is sent to the backend (URL specified in `.env`).
3. The enhanced text is received and updated in the component.

## Available Scripts

- `npm run dev`: Runs the development server
- `npm run build`: Builds the project for production
- `npm run lint`: Lints the project files
- `npm run preview`: Previews the production build

## Dependencies

- React 18.3.1
- Vite 5.3.4 (for build tooling)
- ESLint for code linting

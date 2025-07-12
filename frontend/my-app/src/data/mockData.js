// Mock data for the StackIt platform
export const users = [
  {
    id: 1,
    username: 'techguru',
    name: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    reputation: 15420,
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    username: 'codewiz',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    reputation: 8950,
    joinDate: '2023-03-22'
  },
  {
    id: 3,
    username: 'devmaster',
    name: 'Michael Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    reputation: 12100,
    joinDate: '2022-11-08'
  },
  {
    id: 4,
    username: 'jsexpert',
    name: 'Emma Thompson',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    reputation: 6780,
    joinDate: '2023-05-14'
  },
  {
    id: 5,
    username: 'reactpro',
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    reputation: 9340,
    joinDate: '2023-02-28'
  }
];

export const tags = [
  { id: 1, name: 'javascript', color: 'bg-yellow-100 text-yellow-800' },
  { id: 2, name: 'react', color: 'bg-blue-100 text-blue-800' },
  { id: 3, name: 'nodejs', color: 'bg-green-100 text-green-800' },
  { id: 4, name: 'css', color: 'bg-purple-100 text-purple-800' },
  { id: 5, name: 'html', color: 'bg-orange-100 text-orange-800' },
  { id: 6, name: 'python', color: 'bg-indigo-100 text-indigo-800' },
  { id: 7, name: 'typescript', color: 'bg-blue-100 text-blue-800' },
  { id: 8, name: 'vue', color: 'bg-green-100 text-green-800' },
  { id: 9, name: 'angular', color: 'bg-red-100 text-red-800' },
  { id: 10, name: 'mongodb', color: 'bg-green-100 text-green-800' },
  { id: 11, name: 'express', color: 'bg-gray-100 text-gray-800' },
  { id: 12, name: 'jwt', color: 'bg-purple-100 text-purple-800' },
  { id: 13, name: 'api', color: 'bg-blue-100 text-blue-800' },
  { id: 14, name: 'database', color: 'bg-indigo-100 text-indigo-800' },
  { id: 15, name: 'authentication', color: 'bg-red-100 text-red-800' }
];

export const questions = [
  {
    id: 1,
    title: 'How to implement useEffect cleanup properly in React?',
    content: '<p>I\'m working on a React component that subscribes to WebSocket events, but I\'m having trouble with memory leaks. How should I properly clean up my useEffect hook?</p><p>Here\'s my current implementation:</p><pre><code>useEffect(() => {\n  const ws = new WebSocket(\'ws://localhost:8080\');\n  ws.onmessage = handleMessage;\n}, []);</code></pre><p>I notice that when the component unmounts, the WebSocket connection remains open. What\'s the best practice for handling this?</p>',
    author: users[0],
    tags: [tags[0], tags[1]],
    votes: 24,
    answers: 3,
    views: 156,
    createdAt: '2024-01-20T10:30:00Z',
    isAnswered: true
  },
  {
    id: 2,
    title: 'Best practices for Node.js error handling in async/await functions?',
    content: '<p>What are the recommended patterns for handling errors in Node.js when using async/await? Should I use try-catch blocks everywhere or is there a more elegant solution?</p><p>I\'m particularly concerned about:</p><ul><li>Unhandled promise rejections</li><li>Error propagation in middleware</li><li>Database connection errors</li></ul>',
    author: users[1],
    tags: [tags[0], tags[2]],
    votes: 18,
    answers: 5,
    views: 203,
    createdAt: '2024-01-19T14:15:00Z',
    isAnswered: true
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox: When to use which layout method?',
    content: '<p>I\'m confused about when to use CSS Grid versus Flexbox for layouts. Can someone explain the key differences and provide examples of when each is most appropriate?</p><p>I understand both are powerful, but I want to make sure I\'m using the right tool for the job.</p>',
    author: users[2],
    tags: [tags[3], tags[4]],
    votes: 31,
    answers: 4,
    views: 289,
    createdAt: '2024-01-18T09:45:00Z',
    isAnswered: true
  },
  {
    id: 4,
    title: 'How to optimize React component re-renders?',
    content: '<p>My React app is experiencing performance issues with unnecessary re-renders. What are the best strategies to prevent this and optimize component performance?</p><p>I\'ve heard about React.memo, useMemo, and useCallback, but I\'m not sure when to use each one.</p>',
    author: users[3],
    tags: [tags[1], tags[0]],
    votes: 15,
    answers: 2,
    views: 98,
    createdAt: '2024-01-17T16:20:00Z',
    isAnswered: false
  },
  {
    id: 5,
    title: 'Setting up authentication in a MERN stack application',
    content: '<p>I\'m building a MERN stack app and need to implement user authentication. What\'s the most secure way to handle JWT tokens and protect routes?</p><p>Should I store tokens in localStorage, sessionStorage, or use httpOnly cookies?</p>',
    author: users[4],
    tags: [tags[1], tags[2], tags[11], tags[14]],
    votes: 22,
    answers: 6,
    views: 167,
    createdAt: '2024-01-16T11:10:00Z',
    isAnswered: true
  },
  {
    id: 6,
    title: 'TypeScript generic constraints with conditional types',
    content: '<p>I\'m trying to create a utility type that conditionally applies constraints based on the input type. How can I use TypeScript\'s conditional types effectively?</p><pre><code>type ConditionalType&lt;T&gt; = T extends string ? string[] : number[];</code></pre>',
    author: users[0],
    tags: [tags[6], tags[0]],
    votes: 12,
    answers: 1,
    views: 89,
    createdAt: '2024-01-15T13:25:00Z',
    isAnswered: true
  }
];

export const answers = [
  {
    id: 1,
    questionId: 1,
    content: '<p>You need to return a cleanup function from your useEffect. Here\'s the correct implementation:</p><pre><code>useEffect(() => {\n  const ws = new WebSocket(\'ws://localhost:8080\');\n  ws.onmessage = handleMessage;\n  \n  // Cleanup function\n  return () => {\n    ws.close();\n  };\n}, []);</code></pre><p>This ensures the WebSocket connection is properly closed when the component unmounts, preventing memory leaks.</p><p><strong>Key points:</strong></p><ul><li>Always return a cleanup function for subscriptions</li><li>The cleanup function runs when the component unmounts</li><li>It also runs before the effect runs again (if dependencies change)</li></ul>',
    author: users[1],
    votes: 32,
    isAccepted: true,
    createdAt: '2024-01-20T11:15:00Z'
  },
  {
    id: 2,
    questionId: 1,
    content: '<p>Additionally, you might want to handle connection errors and reconnection logic:</p><pre><code>useEffect(() => {\n  let ws;\n  \n  const connect = () => {\n    ws = new WebSocket(\'ws://localhost:8080\');\n    ws.onmessage = handleMessage;\n    ws.onerror = (error) => console.error(\'WebSocket error:\', error);\n    ws.onclose = () => {\n      // Attempt to reconnect after 3 seconds\n      setTimeout(connect, 3000);\n    };\n  };\n  \n  connect();\n  \n  return () => {\n    if (ws) {\n      ws.close();\n    }\n  };\n}, []);</code></pre><p>This approach adds error handling and automatic reconnection.</p>',
    author: users[2],
    votes: 18,
    isAccepted: false,
    createdAt: '2024-01-20T12:30:00Z'
  },
  {
    id: 3,
    questionId: 2,
    content: '<p>I recommend creating a wrapper function for async operations:</p><pre><code>const asyncWrapper = (fn) => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\n// Usage\napp.get(\'/api/users\', asyncWrapper(async (req, res) => {\n  const users = await User.find();\n  res.json(users);\n}));</code></pre><p>This eliminates the need for try-catch in every route handler and ensures all errors are properly caught and passed to your error handling middleware.</p>',
    author: users[0],
    votes: 25,
    isAccepted: true,
    createdAt: '2024-01-19T15:00:00Z'
  },
  {
    id: 4,
    questionId: 3,
    content: '<p><strong>CSS Grid</strong> is best for 2D layouts (rows and columns), while <strong>Flexbox</strong> excels at 1D layouts (either row or column).</p><p><strong>Use Grid when:</strong></p><ul><li>Creating complex page layouts</li><li>You need precise control over both dimensions</li><li>Building responsive card layouts</li><li>Creating magazine-style layouts</li></ul><p><strong>Use Flexbox when:</strong></p><ul><li>Aligning items in a single direction</li><li>Creating navigation bars</li><li>Centering content</li><li>Distributing space between items</li></ul><p>Here\'s a practical example:</p><pre><code>/* Grid for overall page layout */\n.page-layout {\n  display: grid;\n  grid-template-areas: \n    "header header"\n    "sidebar main"\n    "footer footer";\n}\n\n/* Flexbox for navigation items */\n.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}</code></pre>',
    author: users[3],
    votes: 41,
    isAccepted: true,
    createdAt: '2024-01-18T10:30:00Z'
  },
  {
    id: 5,
    questionId: 5,
    content: '<p>For MERN stack authentication, I recommend using <strong>httpOnly cookies</strong> for storing JWT tokens. Here\'s why:</p><p><strong>Security Benefits:</strong></p><ul><li>Not accessible via JavaScript (prevents XSS attacks)</li><li>Automatically sent with requests</li><li>Can be marked as Secure and SameSite</li></ul><p><strong>Implementation:</strong></p><pre><code>// Server-side (Express)\napp.post(\'/login\', async (req, res) => {\n  // Validate user credentials\n  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);\n  \n  res.cookie(\'token\', token, {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === \'production\',\n    sameSite: \'strict\',\n    maxAge: 24 * 60 * 60 * 1000 // 24 hours\n  });\n  \n  res.json({ success: true });\n});</code></pre><p>For route protection, use middleware to verify the token from cookies.</p>',
    author: users[2],
    votes: 28,
    isAccepted: true,
    createdAt: '2024-01-16T14:20:00Z'
  }
];

export const notifications = [
  {
    id: 1,
    userId: 1,
    type: 'answer',
    message: 'Someone answered your question about React useEffect cleanup',
    questionId: 1,
    isRead: false,
    createdAt: '2024-01-20T11:15:00Z'
  },
  {
    id: 2,
    userId: 1,
    type: 'mention',
    message: 'You were mentioned in a comment on "Best practices for Node.js error handling"',
    questionId: 2,
    isRead: false,
    createdAt: '2024-01-19T16:45:00Z'
  },
  {
    id: 3,
    userId: 1,
    type: 'vote',
    message: 'Your answer received 5 upvotes',
    questionId: 3,
    isRead: false,
    createdAt: '2024-01-19T14:20:00Z'
  },
  {
    id: 4,
    userId: 1,
    type: 'comment',
    message: 'New comment on your answer about CSS Grid vs Flexbox',
    questionId: 3,
    isRead: true,
    createdAt: '2024-01-18T09:30:00Z'
  },
  {
    id: 5,
    userId: 1,
    type: 'answer',
    message: 'Your question about TypeScript generics was answered',
    questionId: 6,
    isRead: true,
    createdAt: '2024-01-17T15:10:00Z'
  }
];

// Current user (for demonstration purposes)
export const currentUser = users[0];
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a Course Tutorial on the Following Detail with field as Course Name, Description,  Along with Chapter Name about, Duration: Category:'Programming', Topic: Python , Level:Basic, Duration:1 hours, NoofChapters: 5, in json format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "name": "Introduction to Python Programming",\n    "description": "This course provides a gentle introduction to the Python programming language. It\'s designed for beginners with no prior programming experience. You\'ll learn fundamental concepts and build a solid foundation for further exploration in Python.",\n    "category": "Programming",\n     "topic": "Python",\n     "level": "Basic",\n    "duration": "1 hour",\n    "noofChapters": 5,\n     "chapters": [\n      {\n        "chapterName": "Chapter 1: Getting Started with Python",\n        "duration": "10 minutes",\n        "description": "This chapter covers the basics of setting up your Python environment. We\'ll guide you through installing Python, choosing an editor, and writing your first program.",\n        "topics" : [\n          "Installing Python",\n           "Choosing an Editor",\n           "Running Your First Python Program: Hello, World!"\n        ]\n      },\n      {\n        "chapterName": "Chapter 2: Variables and Data Types",\n         "duration": "15 minutes",\n        "description": "Learn about variables and fundamental data types in Python like integers, floats, strings, and booleans. We\'ll explore how to work with them in your programs.",\n           "topics" : [\n          "Declaring and Assigning Variables",\n           "Understanding Integer, Float, String, and Boolean Data Types",\n           "Basic Arithmetic Operations"\n        ]\n      },\n      {\n        "chapterName": "Chapter 3: Operators and Expressions",\n        "duration": "10 minutes",\n         "description": "Explore Python operators (arithmetic, comparison, logical) and how they\'re used to build expressions. You\'ll learn how to evaluate conditions and make simple decisions in your code.",\n          "topics" : [\n          "Arithmetic Operators (+, -, *, /, %, **)",\n           "Comparison Operators (==, !=, >, <, >=, <=)",\n           "Logical Operators (and, or, not)",\n           "Order of Operations"\n        ]\n      },\n      {\n        "chapterName": "Chapter 4: Control Flow - If Statements",\n        "duration": "15 minutes",\n        "description": "Learn how to use if statements to control the flow of your program. We\'ll cover basic if, else, and elif statements for conditional execution of code.",\n         "topics" : [\n          "Basic If Statement",\n          "If-Else Statement",\n          "If-Elif-Else Statement",\n           "Nested If Statements"\n          ]\n      },\n         {\n        "chapterName": "Chapter 5: Introduction to Input and Output",\n        "duration": "10 minutes",\n        "description": "Learn to take input from the user and display output in Python, making your programs more interactive.",\n         "topics" : [\n          "Using the input() function to get user input",\n          "Using the print() function to display output",\n          "Formatting output strings"\n        ]\n      }\n    ]\n  }\n}\n```\n',
        },
      ],
    },
  ],
});

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "\nExplain the concept in Detail on Topic:JavaScript, Chapter:Chapter 1: Asynchronous JavaScript, in JSON Format with list of array field as title, description in detail, Code Example(Code field in <precode> format) if applicable\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"chapter\": {\n    \"title\": \"Chapter 1: Asynchronous JavaScript\",\n    \"sections\": [\n      {\n        \"title\": \"Understanding Synchronous vs. Asynchronous Programming\",\n        \"description\": \"JavaScript, by default, is single-threaded and synchronous. This means it executes code line by line, in the order it appears. A long-running operation will block the main thread, making the user interface unresponsive. Asynchronous programming allows us to perform tasks without blocking the main thread, improving the user experience.\",\n         \"code_example\": null\n      },\n      {\n        \"title\": \"The Problem with Blocking Operations\",\n         \"description\": \"In synchronous JavaScript, operations like network requests, reading files, or complex computations can take considerable time. During this time, the JavaScript engine will halt, preventing other tasks from being executed. This leads to a frozen UI and a poor user experience. Imagine a webpage waiting for a server response before it can render anything else. This is why we need asynchronous techniques.\",\n          \"code_example\": null\n       },\n       {\n        \"title\": \"Callbacks: The Traditional Approach\",\n        \"description\": \"Callbacks are functions that are passed as arguments to other functions, and are executed when the outer function finishes its operation (often an asynchronous one). Callbacks were the traditional way of handling asynchronous operations in JavaScript. However, they can lead to 'Callback Hell' or 'Pyramid of Doom' – nested callbacks that make code hard to read and maintain.\",\n         \"code_example\": {\n           \"language\": \"javascript\",\n            \"code\": \"<pre><code>function fetchData(url, callback) {\\n  setTimeout(() => {\\n    const data = `Data from ${url}`; \\n    callback(data); // Call the callback function after data is ready\\n  }, 1000);\\n}\\n\\nfetchData('api/data1', (data1) => {\\n  console.log('Data 1:', data1);\\n  fetchData('api/data2', (data2) => {\\n    console.log('Data 2:', data2);\\n    fetchData('api/data3', (data3) => {\\n      console.log('Data 3:', data3);\\n    });\\n  });\\n});\\n</code></pre>\"\n         }\n       },\n       {\n         \"title\": \"Promises: A Cleaner Approach to Asynchrony\",\n        \"description\": \"Promises provide a more structured and readable way to handle asynchronous operations compared to callbacks. A Promise represents the eventual result of an asynchronous operation. It can be in one of three states: pending, fulfilled (resolved), or rejected. Promises provide methods like `.then()` for handling successful results and `.catch()` for handling errors. They help prevent callback hell by allowing for chaining operations.\",\n           \"code_example\": {\n           \"language\": \"javascript\",\n            \"code\": \"<pre><code>function fetchDataPromise(url) {\\n  return new Promise((resolve, reject) => {\\n    setTimeout(() => {\\n      const data = `Data from ${url}`;  \\n      resolve(data); // Resolve the promise with the data\\n      // reject('Error fetching data')\\n    }, 1000);\\n  });\\n}\\n\\nfetchDataPromise('api/data1')\\n  .then(data1 => {\\n    console.log('Data 1:', data1);\\n    return fetchDataPromise('api/data2');\\n  })\\n  .then(data2 => {\\n    console.log('Data 2:', data2);\\n    return fetchDataPromise('api/data3');\\n  })\\n  .then(data3 => {\\n    console.log('Data 3:', data3);\\n  })\\n  .catch(error => {\\n     console.error('Error:', error);\\n   });\\n</code></pre>\"\n          }\n       },\n       {\n          \"title\":\"Async/Await: Syntactic Sugar for Promises\",\n          \"description\": \"Async/Await is built on top of Promises and provides an even more readable and synchronous-looking way to handle asynchronous operations.  The `async` keyword is placed before a function to make it return a Promise implicitly. The `await` keyword can only be used inside async functions and pauses the execution of that function until a promise resolves, making asynchronous code look more like synchronous code, simplifying code structure and readability.\",\n          \"code_example\": {\n            \"language\": \"javascript\",\n            \"code\": \"<pre><code>async function fetchDataAsync() {\\n  try{\\n    const data1 = await fetchDataPromise('api/data1');\\n    console.log('Data 1:', data1);\\n    const data2 = await fetchDataPromise('api/data2');\\n    console.log('Data 2:', data2);\\n    const data3 = await fetchDataPromise('api/data3');\\n    console.log('Data 3:', data3);\\n  } catch (error){\\n    console.error('Error', error);\\n  }\\n}\\n\\nfetchDataAsync();\\n</code></pre>\"\n          }\n       },\n       {\n        \"title\": \"The Event Loop: JavaScript's Asynchronous Engine\",\n        \"description\": \"The Event Loop is the core mechanism that allows JavaScript to handle asynchronous operations despite being single-threaded. It continually monitors the call stack and the callback queue. When the call stack is empty, it takes the next callback from the callback queue and pushes it onto the call stack for execution. This ensures that asynchronous operations do not block the main thread.\",\n        \"code_example\": null\n      },\n      {\n         \"title\": \"Key Takeaways\",\n         \"description\": \"Asynchronous JavaScript is crucial for building responsive and performant applications. Understanding concepts like callbacks, promises, async/await, and the event loop is essential for writing efficient JavaScript code. Utilizing these techniques prevents blocking the main thread and significantly enhances user experience.\",\n          \"code_example\": null\n      }\n    ]\n  }\n}\n```\n"},
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());

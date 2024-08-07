# Quiz Engine

Welcome to the Quiz Engine project for the React Developer role at SiPhox Health. This application allows users to take quizzes with various types of questions, including one-choice, multiple-choice, and input questions. The quiz engine supports conditional navigation based on user answers.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [JSON Structure](#json-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)

## Features

- Supports one-choice, multiple-choice, and input questions
- Conditional navigation between questions based on user answers
- Progress bar indicating quiz progress
- Option to restart the quiz after completion
- User can choose between two different quizzes at the start
- Simple and clean design using CSS/SCSS

## Setup

Follow these steps to set up the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/quiz-engine.git
    ```

2. Navigate to the project directory:

    ```bash
    cd quiz-engine
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

    The application will run at `http://localhost:3000`.

## Usage

1. Open the application in your web browser (or you can view the live demo [here](https://adiefco.github.io/quiz-engine).)
2. Enter your name and press "Start" or hit the "Enter" key.
3. Choose between the available quizzes.
4. Answer the questions one by one. If you answer incorrectly, you will receive feedback.
5. After completing the quiz, you can restart it by clicking the "Restart" button.

## JSON Structure

The quiz questions are stored in JSON files. Below is an example structure for a quiz:

```json
[
  {
    "id": "q1",
    "title": "Question 1",
    "description": "This is the first question.",
    "image": "path/to/image.jpg",
    "type": "one-choice",
    "options": [
      { "id": "1", "text": "Option 1", "correct": false },
      { "id": "2", "text": "Option 2", "correct": true },
      { "id": "3", "text": "Option 3", "correct": false }
    ],
    "feedback": "Incorrect answer. Please try again.",
    "conditionalNavigation": [
      { "optionId": "2", "nextQuestionId": "q2" },
      { "default": true, "nextQuestionId": "q1" }
    ]
  },
  {
    "id": "q2",
    "title": "Question 2",
    "description": "This is the second question.",
    "type": "input",
    "options": [],
    "feedback": "Incorrect answer. Please try again.",
    "conditionalNavigation": [
      { "correctAnswer": "42", "nextQuestionId": "q3" },
      { "default": true, "nextQuestionId": "q2" }
    ]
  },
  {
    "id": "q3",
    "title": "Question 3",
    "description": "This is the third question.",
    "type": "multiple-choice",
    "options": [
      { "id": "1", "text": "Option A", "correct": true },
      { "id": "2", "text": "Option B", "correct": true },
      { "id": "3", "text": "Option C", "correct": false }
    ],
    "feedback": "Incorrect answer. Please try again.",
    "conditionalNavigation": [
      { "optionIds": ["1", "2"], "nextQuestionId": "end" },
      { "default": true, "nextQuestionId": "q3" }
    ]
  }
]
```

## Technologies

React

CSS/SCSS


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, bug fixes, or improvements.

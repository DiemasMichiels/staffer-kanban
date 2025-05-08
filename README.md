# Technical Assignment: Kanban Board for Staffer ATS

## Mission: Operation Pipeline Flow

Welcome to your mission, should you choose to accept it! As a potential team member at Staffer, your task is to build a crucial component of our next-gen ATS: a functional Kanban board that helps recruiters visualize and manage their candidate pipeline.

## Core Requirements

Your mission is to create a minimal but production-grade Kanban board with the following capabilities:

1. **Board Structure**:

- 4 columns: "Applied", "Screening", "Interview", "Offer"
- Each column should display candidate cards
- Visual indication of column status (e.g., count of candidates)

2. **Card Functionality**:

- Draggable cards that can move between columns
- Each card should display: Candidate name, Role, Application date
- Ability to edit card details via a modal/popup
- Optional: Add a "priority" flag to cards

3. **State Management & Cross-Tab Synchronization**:

- Implement a mechanism where changes made in one browser tab are reflected in real-time in another open tab
- Use localStorage as the synchronization medium (details below)
- This simulates our eventual WebSocket implementation without requiring backend setup

4. **Technical Requirements**:

- Use TypeScript with proper type definitions (this is critical!)
- React with functional components and hooks
- Vite as the build tool
- Clean, maintainable code structure following functional programming principles
- Implement your own drag-and-drop solution (no external drag-and-drop libraries)

## Cross-Tab Synchronization Explained

Instead of WebSockets, you'll implement a localStorage-based synchronization:

1. When a user makes a change (moves a card, edits details):

- Update the application state
- Save the updated state to localStorage

2. In another tab:

- Listen for the StorageEvent
- When detected, read the updated state from localStorage
- Update the application state accordingly

This creates a pseudo-real-time experience across tabs. A user should be able to:

- Open the application in two browser tabs
- Make changes in one tab (e.g., move a card from "Applied" to "Screening")
- See those changes reflected almost immediately in the other tab

## Getting Started

To save you time, we recommend:

- Bootstrap with `npm create vite@latest kanban-staffer -- --template react-ts`
- Use a lightweight state management solution of your choice (Context API, Zustand, Jotai, etc.)

## Evaluation Focus

We'll be particularly looking at:

1. **TypeScript proficiency**: Well-defined interfaces, types, and proper composition
2. **State management**: Clean, predictable state flows
3. **Component architecture**: Sensible separation of concerns
4. **Code quality**: Readability, maintainability, and attention to detail
5. **Cross-tab synchronization**: Effective implementation of the localStorage sync mechanism

## What to Prioritize

- Focus on the core functionality and TypeScript excellence
- State synchronization between tabs
- Clean, maintainable code structure
- Your own implementation of drag-and-drop functionality

## What to De-prioritize

- Extensive styling (though the UI should be usable)
- Authentication/backend integration
- Complex animations

## Use of AI Tools

We understand that AI tools like ChatGPT or GitHub Copilot are part of modern development workflows. If you choose to use these tools during this assignment:

- That's completely acceptable
- Please document in your README:
  - Which parts of the code were assisted by AI
  - What specific problem you were trying to solve
  - How you verified and adapted the AI-generated code

This helps us understand your problem-solving approach and technical judgment.

## Submission Guidelines

- Submit a Git repository with clear commit history as an email attachment
- Include a README with:
  - Setup instructions
  - Brief explanation of your technical choices
  - Any assumptions or trade-offs you made
  - What you would improve with more time
  - Documentation of AI tool usage (if applicable)

## Time Expectation

This assignment is designed to take 4-6 hours. We respect your time, so focus on demonstrating your strengths rather than building every possible feature.

## Bonus Points (Optional)

- Unit tests for key components
- WCAG accessibility compliance
- Keyboard navigation support
- Thoughtful error handling

---

Good luck! We're excited to see your approach to this challenge. Remember, we value clean, functional code that solves the problem elegantly.

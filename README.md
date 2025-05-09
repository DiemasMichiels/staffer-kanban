# Technical Assignment: Kanban Board for Staffer ATS

## Mission: Operation Pipeline Flow

Welcome to your mission, should you choose to accept it! As a potential team member at Staffer, your task is to build a crucial component of our next-gen ATS: a functional Kanban board that helps recruiters visualize and manage their candidate pipeline.

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/kanban-staffer.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
    cd kanban-staffer
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run the Application**:

   ```bash
   npm dev
   ```

## Technical Choices

Kept everything simple.

- Zustand for state management
- Tailwind for styling
- DaisyUI because I wanted to give it a try
- react-hook-form for form management instead of what react 19 offers

## Assumptions and Trade-offs

- Store sync just replaces the whole store every change.
- No mobile touch drag en drop or functionality, the same for accessibility. Could have been solved with some arrow buttons. Now people can do it by editing the candidate.

## Improvements

- Add mobile touch drag and drop functionality.
- Add accessibility features.
- Test the form and the drag and drop functionality.
- Add a backend

## AI disclosure

Copilot is used for autocompletion and code generation. Mainly used to speed up the development process.
Daisy has a nice LLM file used by AI to quickly create styling for the html elements.
I also use Claude as a helper tool, more like a google replace.

Also: https://claude.ai/chat/569f83b7-26b3-497a-be86-52fce946d111

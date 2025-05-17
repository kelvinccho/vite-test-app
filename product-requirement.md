## This project is a React + TypeScript + Vite template

## Goal
- Test and learn how to use React with TypeScript and Vite
- Create a simple web application that can log all travel record and calcuate if it meets UK ILR/Nationalisation requirement:
  - No more than 180 days outside the UK in any 12 months
  - No more than 90 days outside the UK in the last 12 months if applying for BC
  - Travelling days are not counted as outside the UK

## Product Requirement

0. Home Page
- Showing remaining days available for outside the UK
- Showing upcoming travel

1. Travel Record View
- User can add travel record with date and duration
  - User can add details of travel record
    - Trip Title
    - Country
    - Departure Date
    - Return Date
    - Reference Number (optional) - Train / Flight ticket number
    - Travel Purpose (optional) - Business / Holiday / Other
- User can edit travel record
- User can delete travel record
- User can view travel record in a list

2.Calculation View
- options
  - User can select the calculation options
    - ILR
    - BC

- Show calculation result
  - User can see the calculation result
    - Total days outside the UK
    - Total travelling days
    - Total days outside the UK in any 12 months
    - Total days outside the UK in the last 12 months if applying for BC
    - Total travelling days in any 12 months
    - Total travelling days in the last 12 months if applying for BC
    - Remaining days available for outside the UK
  - showing green for valid and red for invalid


## Technical Requirement
- Use React with TypeScript
- Use tailwindcss for styling
- Use Vite for development

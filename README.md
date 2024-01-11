# README

## Stack
- Frontend - React
- Backend - Ruby on Rails
- Database - SQLite


## Versions
- Ruby - 3.1.4
- Rails - 7.1.2
- npm - 10.2.4
- Node - 21.5.0
- React - 18.2.0

## Instructions
1. Clone this repository
2. add `.env.development` to the client directory. In this file should be `VITE_API_URL=http://localhost:3000/api/v1`
3. In the root of the project run:
    - `bundle`
    - `rails db:migrate`
    - `rails db:seed` (Optional if you would like to seed dummy data)
    - `rails s`
4. In the client direction run:
    - `npm install`
    - `npm run dev`
5. Your app should be running @ `http://localhost:5173/`
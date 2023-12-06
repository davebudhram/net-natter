# Net Natter
Net Natter is a place for NBA fans to view past game scores and stats, comment on games. Analysts can post articles relating the NBA.

## Running the Application

### Prerequisites
- [Node.js](https://nodejs.org/en/)

### Setup
1. **Clone the repository**
    ```bash
    git clone https://github.com/davebudhram/net-natter.git
    cd net-natter
    ```
2. Running the Backend

    ```bash
    # Install nodemon if you don't have it
    npm  install  nodemon  -g

    cd server
    # Install dependencies
    npm install
    # Run the app
    nodemon src/app.ts
    ```
    - If you get an error with express in src/app.ts run 
      ```bash
      npm i --save-dev @types/express
      ```
3. Running the Frontend
    ```bash
    cd client
    npm install
    npm start
    ```

# Download 

Download the Zip file or clone the Repo.

# Open the folder in your IDE

Open a terminal at the top level directory, I.E. "C:\Users\******\Downloads\shopFront".

# Install packages

Run `npm install` to install the packages the application requires. If this fails; 
1: Follow the relevant steps in the error code.
2: Make sure you are in the correct directory (see the step above).
3: If its a dependancy error, install the relevant dependancies.
4: Try running `npm install --force`.

## Development server

Navigate to the server directory, I.E. "C:\Users\******\Downloads\shopFront\server",
Run `npx ts-node src/server.ts` to start the back-end server to connect to the Mongo dataBase.

Navigate to the client directory, I.E. ""C:\Users\******\Downloads\shopFront\src",
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` on your browser. The application will automatically reload if you change any of the source files.

# Cypress testing

Run `npx cypress open` at the top level directory (I.E. "C:\Users\******\Downloads\shopFront"). 
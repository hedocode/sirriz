# sirriz
A server/client node/js application with an API to manage viewed series.



# Installation

## Back

If you don't have node or npm installed, please do by the following command (Linux)

```bash
sudo apt-get install node npm 
sudo apt-get update
```



Open a console into the sirriz/back folder and execute the following commands 

```bash
npm install
npm update
node app.js
```

## Front

If you don't have node or npm installed, please do by the following command (Linux)

```bash
sudo apt-get install node npm 
sudo apt-get update
```



Open a console into the sirriz/client folder and execute the following commands 

```bash
npm install
npm update
npm start
```



# Usage

http://localhost:3000 - display Hello World

http://localhost:3000/series - show all the series

http://localhost:3000/api/series - returns the json of the series

http://localhost:3000/api/series?title=Assassination%20Classroom&s=1&e=3
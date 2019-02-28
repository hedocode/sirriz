# sirriz
A server/client node/js application with an API to manage viewed series.



# Installation


If you don't have yarn, node or npm installed, please do by the following commands (Linux)

```bash
sudo apt-get install nodejs npm 
sudo apt-get update
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install yarn
```

## Back


Open a console into the sirriz/back folder and execute the following commands 

```bash
yarn
yarn start
```

## Front


Open a console into the sirriz/client folder and execute the following commands 

```bash
yarn
yarn start
```



# Usage

http://localhost:3001/api/series - returns the json of the series

http://localhost:3001/api/series/Assassination%20classroom - returns the json of the Assassination classroom serie

http://localhost:3001/api/movies - returns the json of the movies


http://localhost:3001/api/movies/Shrek%202 - returns the json of the Shrek 2 Movie

http://localhost:3001/api/series?title=Assassination%20Classroom&s=1&e=3 - return the 3rd episode from the 1st Season of Assassination Classroom
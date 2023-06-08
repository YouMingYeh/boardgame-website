# boardgame-website

# How to use
***Note that you should create a .env file under server directory*** and fill it with:
```.env
MONGO_URL = <your mongodb url>
JWT_SECRET='somesuperhardstringtoguess'
PORT = 3001
```
## start server
```
cd server
npm i
npm run server
```

## start client
```
cd client
npm i
npm run start
```
Then, open `http://localhost:3000`.

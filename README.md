# node-js-getting-started

Introduction

DiningPal is an online web application allowing multiple users to make plans of dining together. After sign up/login, users can propose their favorite restaurant(s) (with ranks) and find friends (or strangers), who also prefers similar restaurant during that specific time, to have dinner together. The features of this application will include locating the user him/herself, locating/ranking/choosing/auto-(help)choosing restaurants, with future implementations including creation of chat rooms, friend/user filter system, map navigate, coupon search, weather condition check and so on. Though this application can be used to arrange other places of collective activities, such as gym, theaters, shopping malls etc, it is primarily designed to help people find dinner mates in an easy and comfortable way.



A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/ZiyiAn/DiningPal.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

'use strict'

const winston = require('winston');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore/lite');
var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");

var logLevel;

// Frebase configarations
const firebaseConfig = {
    apiKey: "AIzaSyBZG6bC8LzMWmVtCapMJCZiT1OLNUOoxQ4",
    authDomain: "vehicalregsampleproj.firebaseapp.com",
    projectId: "vehicalregsampleproj",
    storageBucket: "vehicalregsampleproj.appspot.com",
    messagingSenderId: "51872641466",
    appId: "1:51872641466:web:0a0a4b9f86571819e16d83",
    measurementId: "G-12L6LZD0TL"
  };
  
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vehicalregsampleproj-default-rtdb.firebaseio.com"
});

// Connect to the DB
initializeApp(firebaseConfig);
global.db = admin.firestore();

//records events,messages errors .............. etc 
var log = winston.createLogger({
    level: logLevel, 
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
})

module.exports.log = log;
module.exports.admin = admin;
// You are a developer in a big company, with multiple databases across the world. Your job is to assemble all the information for a user personnel profile. However, the information is distributed in different databases and services.

// Your function takes a simple id (a number) and you have to return a promise with an object as data. The object must contains all this information:

// {
//     id: A number,
//     username: A string,
//     country: A string,
//     firstname: A string,
//     lastname: A string,
//     email: A string
// }
// To achieve your task, you must use the different provided services:

// central: Due to the number of users, we can't store them in a single database. So we have 3 databases. The central database identifies in which database the users are stored. Use it like this: central(id).then(function(data) { ... }). data is a string with 3 possibles values: 'db1', 'db2' and 'db3'. If the central database has an error, your function must return a rejected promise with 'Error central' in the data.
// db1, db2 and db3 contain the basic information for the users. Use it like this: db1(id).then(function(data) { ... }). data is an object containing 2 properties: username and country. If a database has an error, your function must return a rejected promise with 'Error db1' (or 'Error db2' or 'Error db3') in the data.
// vault: Personal data is restricted by law. This particular type of data is often stored in a specific database. The vault can be used to obtain personal information about a user. Use it like this: vault(id).then(function(data) {...}). data is an object with 3 properties: firstname, lastname and email. If the vault has an error, your function must return a rejected promise with 'Error vault' in the data.
// mark: Every time someone reads a user profile, we must mark it. The mark service will create this mark. Use it like this: mark(id).then(function() { ... }). Do not call the mark service if another service is in error. Also, do not wait for the mark service to complete processing. If the mark service has an error, don't do anything specific. Just return your promise with the information.
// Every service responds in 100ms, except vault. (Security for personal data is heavier, so it's slower. It will respond in 150ms.) Your code must respond in 200ms. If multiple services are in error, return the first error you found.

let central = require("./central"),
  db1 = require("./db1"),
  db2 = require("./db2"),
  db3 = require("./db3"),
  vault = require("./vault"),
  mark = require("./mark");

module.exports = function (id) {
  // TODO
  // Reminder: The deadline is tomorrow !
  let result = {
    id: id,
    username: "",
    country: "",
    firstname: "",
    lastname: "",
    email: "",
  };
  return new Promise((resolve, reject) => {
    let vaultPromise = vault(id).catch(function () {
      return Promise.reject("Error vault");
    });
    let centralPromise = central(id)
      .catch(function () {
        return Promise.reject("Error central");
      })
      .then(function (data) {
        switch (data) {
          case "db1":
            return db1(id).catch(function () {
              return Promise.reject("Error db1");
            });
          case "db2":
            return db2(id).catch(function () {
              return Promise.reject("Error db2");
            });
          case "db3":
            return db3(id).catch(function () {
              return Promise.reject("Error db3");
            });
        }
      });
    Promise.all([centralPromise, vaultPromise])
      .then(function (arr) {
        mark(id).catch(function () {});
        result.firstname = arr[1].firstname;
        result.lastname = arr[1].lastname;
        result.email = arr[1].email;
        result.username = arr[0].username;
        result.country = arr[0].country;
        resolve(result);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

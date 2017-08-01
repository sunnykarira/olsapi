# OLSAPI

RestfulAPI for adding/deleting/editing items in Cart

### Setup Instructions

> Using Docker Image

* Build docker image and deploy

* Give persmissions to the scripts.

```
$ sudo chmod +x [scriptname]
```

* Ubuntu 14

```
$ sudo ./scriptubuntu16.sh
```

* Ubuntu 14
```
$ sudo ./scriptubuntu14.sh
```

OR

> Native Setup

* Install node version 6.11.1
* Run the following commands

```
$ sudo node application.js
```

### Testcases

>  Testcases can be ran through this command.

* Local
```
$ python localtests.py
```
* Heroku
```
$ python herokutests.py
```


### List of RestfulAPI methods


| paths | header| params | body| methods | description  | response
|---|---|---|---|---|---|---|
| `/api/signup` | | | username, password, confirmpassword as JSON | POST | sign up | 'User Added. Please visit /api/authenticate to get the web token.' |
| `/api/authenticate`| | | username, password JSON | POST | authenticate user | Generated Token |
| `/api/login`  | | | username, password JSON | POST | login user | You are logged in. Please provide apitoken for next routes. |
| `/api/product` | token |  limit, category | | GET | Get products | JSON data |
| `/api/product` | token |  | JSON data | POST | Add products | Product Added to database. |
| `/api/product` | token | id| JSON data | PUT | Add products | Product Updated. |
| `/api/product` | token | id, name, category | | DELETE | Add products | Product Updated. |
| `/logout` |   |   |   | GET | Logout user | Succesfully logged out. |


> Here is [link to postman local][] for more details.


> Here is [link to postman heroku][] for more details.



[link to postman local]: https://www.getpostman.com/collections/cf0badf3c59a1a2fba1c

[link to postman heroku]: https://www.getpostman.com/collections/517cb137a553a8a82f80

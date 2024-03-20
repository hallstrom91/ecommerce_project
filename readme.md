# Ecommerce School Project

## Project is built with Vite+React, Node.js and SQL-database (XAMPP/LAMPP).

```FRONTEND
Run frontend:
1. npm install - inside frontend dir.
2. start with command - npm run dev
```

```BACKEND
Run Backend:
1. npm install - inside backend dir.
2. configure .env file (see below)
3. configure SQL-database (XAMPP/LAMPP is used during development)
4. start with command - nodemon ./src/server.js
```

```ENVIROMENT
.ENV-setup:
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_CONNECT_LIMIT=
DB_PORT=
PORT=
JWT_SECRET=
```

### Create DB Tables

```USER
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `password_salt` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(255),
  `city` varchar(100),
  `postal_code` varchar(20),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

```CATEGORIES
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `parent_id` int(11),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

```PRODUCTS
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10, 2) NOT NULL,
  `stock` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

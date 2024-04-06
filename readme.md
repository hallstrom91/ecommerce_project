# Ecommerce School Project

## Project is built with Vite+React, Node.js and SQL-database (XAMPP/LAMPP).

### `Frontend`

- Install Dependencies: Run npm install inside the frontend directory.
- Start the Development Server: Execute npm run dev to start the development server.

### `Backend`

- Install Dependencies: Run npm install inside the backend directory.
- Configure .env File: Make sure to configure the .env file with the required environment variables.
- Configure SQL Database: Set up your SQL database (e.g., XAMPP/LAMPP during development).
- Start the Backend Server: Execute npm run dev to start the backend server.

### `Backend ENV`

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

### `Create DB Tables for SQL-DB`

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

INSERT INTO `categories` (`id`, `name`, `description`, `parent_id`, `image_url`) VALUES
	(1, "Jackor", "En samling av olika typer av jackor för alla väder.", NULL, "http://localhost:3000/images/category_jacket.png"),
	(2, "Tröjor", "Bekväma och trendiga luvtröjor för alla tillfällen.", NULL, "http://localhost:3000/images/category_hoodie.png"),
	(3, "T-shirts", "Snygga och mångsidiga t-shirts för både vardag och fest.", NULL, "http://localhost:3000/images/category_tshirt.png"),
	(4, "Kepsar", "En samling trendiga kepsar för alla tillfällen.", NULL, "http://localhost:3000/images/category_cap.png"),
	(5, "Handskar", "En samling av olika typer av handskar för olika ändamål.", NULL, "http://localhost:3000/images/blackred_combat_gloves.png"),
	(6, "Masker", "En samling av olika typer av masker för olika användningsområden.", NULL, "http://localhost:3000/images/category_facemask.png"),
	(7, "Byxor", "En samling av olika typer av byxor för alla tillfällen.", NULL, "http://localhost:3000/images/category_jeans.png");
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

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category_id`, `image_url`) VALUES
	(1, "Dollar Hat (Black)", "En trendig grön keps med ett svart dollar-tecken.", 299, 50, 4, "http://localhost:3000/images/hat_dollar_black.png"),
	(2, "Dollar Hat (White)", "En snygg grön keps med ett vitt dollar-tecken.", 249, 40, 4, "http://localhost:3000/images/hat_dollar_white.png"),
	(3, "Node Hoodie (Black)", "En cool svart luvtröja med en Node.js-liknande logo.", 599, 30, 2, "http://localhost:3000/images/hoodie_node_black.png"),
	(4, "Grå Node Hoodie", "En snygg grå luvtröja med en stiliserad logo som påminner om Node.js", 499, 20, 2, "http://localhost:3000/images/hoodie_node_grey.png"),
	(5, "Svart Skull Hoodie", "En tuff svart luvtröja med en detaljerad döskallelogo", 599, 15, 2, "http://localhost:3000/images/hoodie_skull.png"),
	(6, "Vit Ethereum Jacka", "En elegant vit jacka med en broderad Ethereum-logotyp", 799, 25, 1, "http://localhost:3000/images/jacket_eth.png"),
	(7, "Gul Fudge Jacka", "En unik gul jacka med texten \"Fudge to the police\" och en stiliserad polisbil-logotyp", 899, 10, 1, "http://localhost:3000/images/jacket_fudge.png"),
	(8, "Vit Anonymous T-shirt", "En stilren vit t-shirt med en maskerad ansiktslogotyp", 199, 60, 3, "http://localhost:3000/images/tshirt_anon.png"),
	(9, "Ljusblå Car T-shirt", "En snygg ljusblå t-shirt med en äldre amerikansk bil-logotyp", 249, 55, 3, "http://localhost:3000/images/tshirt_car.png"),
	(10, "Vit Trippy T-shirt", "En intressant vit t-shirt med en sci-fi-liknande rund logo", 299, 45, 3, "http://localhost:3000/images/tshirt_trippy.png"),
	(11, "Vit Monero T-shirt", "En stilren vit t-shirt med Monero-logotyp", 349, 50, 3, "http://localhost:3000/images/tshirt_xmr.png"),
	(12, "Svart-Röda Stridsvantar", "Tuffa svart-röda stridsvantar för att hålla händerna varma och skyddade.", 399, 50, 5, "http://localhost:3000/images/blackred_combat_gloves.png"),
	(13, "Unika Rymdhandskar", "Stiliga och funktionella handskar med rymdtema för en cool look.", 249, 50, 5, "http://localhost:3000/images/coolspace_gloves.png"),
	(14, "Rosa Handskar", "Söta rosa handskar för flickor med mönstrade detaljer.", 199, 50, 5, "http://localhost:3000/images/pink_gloves_girl.png"),
	(15, "Mörka Motorcykelhandskar", "Snygga svarta motorcykelhandskar med bra grepp och skydd.", 499, 50, 5, "http://localhost:3000/images/black_motorcycle_gloves.png"),
	(16, "Svart-Röd Ansiktsmask", "Elegant svart-röd ansiktsmask för att hålla dig skyddad med stil.", 199, 50, 6, "http://localhost:3000/images/blackred_facemask.png"),
	(17, "Svart-Röd Ansiktsmask för Tjejer", "Söt svart-röd ansiktsmask för flickor med roliga mönster.", 149, 50, 6, "http://localhost:3000/images/blackred_facemask_girl.png"),
	(18, "Svart-Röd Jacka", "Stilfull svart-röd jacka med modern design och hög kvalitet.", 999, 50, 1, "http://localhost:3000/images/blackred_jacket.png"),
	(19, "Grön Keps", "En snygg grön keps med logotyp", 499, 15, 4, "http://localhost:3000/images/cap_node_green.png"),
	(20, "Sailor T-shirt", "En snygg T-shirt med marin-tema design", 399, 20, 3, "http://localhost:3000/images/tshirt_sailor.png"),
	(21, "Rock Hoodie", "En cool hoodie med rockmusik-tema design", 699, 12, 2, "http://localhost:3000/images/hoodie_rock.png");
```

```ORDERED_PRODUCTS
CREATE TABLE `ordered_products` (
  `ordered_product_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`ordered_product_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `ordered_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `ordered_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```ORDERS
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_price` decimal(10,2) DEFAULT NULL,
  `delivery_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```PAYMENTS
CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `card_number` varchar(16) DEFAULT NULL,
  `card_name` varchar(255) DEFAULT NULL,
  `card_cvv` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

```SHOPPING_CARTS
CREATE TABLE `shopping_carts` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `cart_key` varchar(255) NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `shopping_carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `shopping_carts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

#### `CREDITS`

- All Images are created by Gencraft.com

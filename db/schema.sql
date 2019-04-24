### Schema
DROP DATABASE if exists chatbots;
CREATE DATABASE chatbots;
USE chatbots;

CREATE TABLE chatbotText
(
	id int NOT NULL AUTO_INCREMENT,
	user_input varchar(255) NOT NULL,
    user_response varchar(255) NOT NULL,
	botOn BOOLEAN DEFAULT false,

	
	PRIMARY KEY (id)
);
# create databases
CREATE DATABASE IF NOT EXISTS `person`;

# create root user and grant rights
GRANT ALL ON *.* TO 'root'@'%';

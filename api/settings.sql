DROP DATABASE senchadb;
CREATE DATABASE senchadb;
CREATE USER senchauser WITH password 'senchapass';
GRANT ALL PRIVILEGES ON DATABASE senchadb TO senchauser;

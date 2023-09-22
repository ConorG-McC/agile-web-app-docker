# agile-web-app-docker

This repository is a combination between my university module for the creation of the database, backend and frontend as well as my personal exploration of using Docker, Dockerfiles and Docker Compose.

## Pre-Requisites

You will need the latest version of Docker Desktop which can be installed following the steps at https://www.docker.com/products/docker-desktop/


## Run Locally

Clone the project

```bash
  git clone https://github.com/ConorG-McC/agile-web-app-docker.git
```
Go to the project root directory

```bash
  cd agile-web-app-docker
```

Open the project in code editor, to open in vscode:

```bash
  code .
```

Go to the agile-web-backend directory and complete the following steps:

- Use skill_audit_db.sql to create a MYSQL database. This can be using XAMPP (Installation: https://www.apachefriends.org/download.html) or using a free hosting service like Filess.io (https://filess.io/).

- Once the database is set up, copy the 'template.env' file from agile-web-backend and rename to '.env'.

- In the .env, fill in the fields with the relevant details of the created database.


Run the application from the root directory

```bash
  docker compose up
```



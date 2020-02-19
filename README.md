<h1 align="center"> <img src="./resources/views/readme/icon_people.svg" style="vertical-align: middle" width="30" /> Person Microservice </hi>

## 🚀 Getting Start

<div style="overflow: hidden;">
<img src="./resources/views/readme/icon_person.svg" width="230" height="180" style="shape-outside: ellipse();border-radius: 50%;float:left;" />

This microservice was created with the purpose of having a module, in Node js, for creating and maintaining the registration of a system. Below you will get information on what technology was used, how to run the application, among other information
</div>

## 👨‍💻 Technology
<a href="https://adonisjs.com/" style="margin: 0 10px 10px; vertical-align: middle; display: inline-block;">
    <img alt="AdonisJS" src="resources/views/readme/adonisjs.svg" height="40" />
</a>
<a href="https://github.com/adonisjs/adonis-persona" style="margin: 0 10px 10px; vertical-align: middle; display: inline-block;">
    <img alt="Adonis Person" src="resources/views/readme/adonis_person.svg" height="40" />
</a>
<a href="https://github.com/Rocketseat/adonis-bull" style="margin: 0 10px 10px; vertical-align: middle; display: inline-block;">
    <img alt="Adonis Bull" src="resources/views/readme/adonis_bull.png" height="40" />
</a>
<a href="https://redis.io/" style="margin: 0 10px 10px; vertical-align: middle; display: inline-block;">
    <img alt="Redis" src="resources/views/readme/redis.png" height="40" />
</a>
<a href="https://docker.com/" style="margin: 0 10px 10px; vertical-align: middle; display: inline-block;">
    <img alt="Docker" src="resources/views/readme/docker.png" height="40" />
</a>

## Run aplication

The application runs on the door `3333`. If you need to change, change directly in the env

1. Go to the root of the project and run the docker:

```bash
docker-compose up -d
```

2. To start Adonis js you must run

```bash
adonis server --dev
```

3. Migration run:

```bash
adonis migration:run
```
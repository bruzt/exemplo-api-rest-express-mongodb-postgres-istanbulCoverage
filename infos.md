# MONGODB

```
sudo docker run -d \
    --name mongodb-express-test \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -p 27017:27017 \
    mongo:4.0.5
```
```
sudo docker exec -ti mongodb-express-test \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('peoples').createUser({user: 'cliente1', pwd: '123', roles: [{role: 'readWrite', db: 'peoples'}]})"
```

```
mongodb://cliente1:123@localhost:27017/peoples
```

```
sudo docker exec -ti mongodb-express-test mongo peoples -u cliente1 -p '123'
```


# POSTGRES

```
sudo docker run -d \
    --name postgres-express-test \
    -e POSTGRES_USER=cliente1 \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=users \
    -p 5432:5432 \
    postgres:11.1
```

```
postgres://cliente1:123@localhost:5432/users
```

```
sudo docker exec -ti postgres-express-test psql -d users -U cliente1 -W
```


# Sequelize Migrations

```
sudo npm install -g sequelize-cli

sequelize init

sequelize migration:create --name name-the-migration

sequelize db:migrate

sequelize db:migrate:undo
```
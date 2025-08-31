# docker run --rm --pull always --name surrealdb -p 8000:8000 surrealdb/surrealdb:latest start --log info --user root --pass root
docker volume create surrealdb-data || true
docker run --rm --pull always -p 8000:8000 -v surrealdb-data:/mydata --user root surrealdb/surrealdb:latest start --log debug --user root --pass root rocksdb:/mydata/mydatabase.db
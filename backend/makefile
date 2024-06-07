start:
	docker-compose up -d --force-recreate

spring:
	mvn clean package
	java -jar target/backend-0.0.1-SNAPSHOT.jar

stop:
	docker-compose down

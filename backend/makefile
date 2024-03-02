# closes the container and runs a new one
main:
	$(MAKE) stop
	$(MAKE) start

# pulls the postgres image
pull:
	docker pull postgres

# use this command to create a disk that will store the db data even after the image is removed
create_disk:
	docker volume create postgres_data


# creates the database container
create_container_mac:
	docker run --name postgresDatabaseContainer -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d -v postgres_data:/var/lib/postgresql/data postgres

# runs the database container if it has been created before
start:
	docker start postgresDatabaseContainer

# stops the database container
stop:
	docker stop postgresDatabaseContainer

# deletes the container
delete_container:
	docker rm --force postgresDatabaseContainer
	docker inspect tomcatBackendContainer | sed -n 's/.*"IPAddress"://p'

# deletes the image
delete_image:
	docker image rm --force postgres

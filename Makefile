start:
	docker-compose up

restart:
	docker-compose down
	docker-compose up

rebuild:
	docker-compose down
	docker-compose up --build

stop:
	docker-compose down

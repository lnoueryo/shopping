start-front:
	docker-compose exec -d backend-for-frontend pnpm dev -o

start-api:
	docker-compose exec api-server poetry install
	docker-compose exec -d api-server poetry run python manage.py runserver 0.0.0.0:8000

start-all:
	make start-front
	make start-api

start:
	docker-compose up -d
	make start-all

restart:
	docker-compose down
	docker-compose up -d
	make start-all

rebuild:
	docker-compose down
	docker-compose up -d --build
	make start-all

stop:
	docker-compose down

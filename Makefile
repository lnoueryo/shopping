start:
	docker-compose  down
	docker-compose  up -d
	docker-compose exec backend-for-frontend pnpm dev -o

include frontend/.env

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

e2e:
	docker exec -it webtech-bookstore-backend-for-frontend-1 pnpm test:e2e

vitest:
	docker exec -it webtech-bookstore-backend-for-frontend-1 pnpm test:vitest:watch

deploy:
	docker build --build-arg RAKUTEN_APP_ID=$(RAKUTEN_APP_ID) \
	--build-arg RAKUTEN_API_ENDPOINT=$(RAKUTEN_API_ENDPOINT) \
	--build-arg MODE=stage \
	-f frontend/docker/production/Dockerfile \
	-t gcr.io/$(GCP_PROJECT_ID)/webtech-bookstore-bff frontend
	docker push gcr.io/$(GCP_PROJECT_ID)/webtech-bookstore-bff
	gcloud run deploy webtech-bookstore-bff-stage \
	--image gcr.io/$(GCP_PROJECT_ID)/webtech-bookstore-bff \
	--tag pr-00 \
	--platform managed \
	--region asia-northeast1 \
	--allow-unauthenticated
resource "google_cloud_run_service" "bff_service" {
  name     = var.bff_name
  location = var.gcp_region

  template {
    spec {
      containers {
        image = "gcr.io/${var.gcp_project}/webtech-bookstore-bff"

        env {
          name  = "RAKUTEN_APP_ID"
          value = var.rakuten_app_id
        }

        env {
          name  = "RAKUTEN_API_ENDPOINT"
          value = var.rakuten_api_endpoint
        }

        env {
          name  = "MODE"
          value = var.bff_mode
        }

        resources {
          limits = {
            memory = var.bff_memory
            cpu    = var.bff_cpu
          }
        }
      }

      container_concurrency = 80
    }

    metadata {
      name = "${var.bff_name}-${random_id.revision_id.hex}"
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "10"
        "run.googleapis.com/startup-cpu-boost"  = "true"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# bff_domainが空でない場合にのみドメインマッピングリソースを作成
resource "google_cloud_run_domain_mapping" "custom_domain" {
  count    = var.bff_domain != "" ? 1 : 0
  location = var.gcp_region
  name     = var.bff_domain
  project  = var.gcp_project

  metadata {
    namespace = var.gcp_project
  }

  spec {
    route_name = google_cloud_run_service.bff_service.name
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.bff_service.location
  project     = google_cloud_run_service.bff_service.project
  service     = google_cloud_run_service.bff_service.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "random_id" "revision_id" {
  byte_length = 4
}
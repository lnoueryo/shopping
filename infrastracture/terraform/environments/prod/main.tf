terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project     = var.gcp_project
  region      = var.gcp_region
}

module "cloud_run" {
  source                = "../../modules/cloud_run"
  gcp_project           = var.gcp_project
  gcp_region            = var.gcp_region
  bff_name              = var.bff_name
  bff_memory            = var.bff_memory
  bff_cpu               = var.bff_cpu
  rakuten_app_id        = var.rakuten_app_id
  rakuten_api_endpoint  = var.rakuten_api_endpoint
  bff_mode              = var.bff_mode
  bff_domain            = var.bff_domain
}

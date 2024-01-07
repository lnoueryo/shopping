variable "project_id" {
  description = "The GCP project ID for the stage environment"
}

variable "region" {
  description = "The GCP region for the stage environment"
  default     = "asia-northeast1"
}

variable "gcp_project" {
  description = "The GCP project ID"
  type        = string
}

variable "gcp_region" {
  description = "The GCP region"
  type        = string
}

variable "bff_name" {
  description = "The name of the BFF service"
  type        = string
}

variable "bff_memory" {
  description = "The memory allocation for the BFF service"
  type        = string
}

variable "bff_cpu" {
  description = "The CPU allocation for the BFF service"
  type        = string
}

variable "rakuten_app_id" {
  description = "rakuten_app_id ENV for the BFF service"
  type        = string
}

variable "rakuten_api_endpoint" {
  description = "rakuten_api_endpoint ENV for the BFF service"
  type        = string
}

variable "bff_mode" {
  description = "mode ENV for the BFF service"
  type        = string
}

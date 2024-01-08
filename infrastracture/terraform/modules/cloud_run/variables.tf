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

variable "bff_domain" {
  description = "The domain for the BFF service"
  type = string
  default     = ""
}
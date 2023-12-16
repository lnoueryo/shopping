output "cloud_run_service_url" {
  value       = module.cloud_run.service_url
  description = "The URL of the Cloud Run service in the stage environment"
}
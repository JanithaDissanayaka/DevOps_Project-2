provider "aws" {
  region = "ap-south-1"
}
#variable

variable cidr {} 
variable private_subnets {}
variable public_subnets   {}
variable cluster_name {}

data "aws_availability_zones" "azs" {
  
}
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "car-sale-vpc"
  cidr = var.cidr

  azs             = data.aws_availability_zones.azs.names
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets

  create_igw = true
  enable_nat_gateway = true
  single_nat_gateway = true
  one_nat_gateway_per_az = false
  map_public_ip_on_launch = true
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
    "kubernetes.io/role/elb"= "1"
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
    "kubernetes.io/role/internal-elb"= "1"
  }
  }

provider "kubernetes" {
  host                   = data.aws_eks_cluster.car-sale.endpoint
  token                  = data.aws_eks_cluster_auth.car-sale.token
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.app.certificate_authority[0].data)
}

data "aws_eks_cluster" "car-sale" {
  name = module.eks.cluster_name
  depends_on = [ module.eks ]
}

data "aws_eks_cluster_auth" "car-sale" {
  name = module.eks.cluster_name
  depends_on = [ module.eks ]
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = var.cluster_name
  kubernetes_version = "1.33"

  addons = {
    coredns                = {}
    eks-pod-identity-agent = {
      before_compute = true
    }
    kube-proxy             = {}
    vpc-cni                = {
      before_compute = true
    }
  }

  # Optional
  endpoint_public_access = true


  # Optional: Adds the current caller identity as an administrator via cluster access entry
  enable_cluster_creator_admin_permissions = true

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets
  

  
    eks_managed_node_groups = {
    example = {
      # Starting on 1.30, AL2023 is the default AMI type for EKS managed node groups
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["t3.micro"]

      min_size     = 1
      max_size     = 4
      desired_size = 2
    }
  }

  tags = {
    Environment = "prod"
    Terraform   = "true"
  }
}
provider "kubernetes" {
  host                   = data.aws_eks_cluster.car-sale.endpoint
  token                  = data.aws_eks_cluster_auth.car-sale.token
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.car-sale.certificate_authority[0].data)
}

data "aws_eks_cluster" "car-sale" {
  name = module.eks.cluster_name
}

data "aws_eks_cluster_auth" "car-sale" {
  name = module.eks.cluster_name
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = var.cluster_name
  kubernetes_version = "1.29"   # ✅ stable version

  enable_irsa = true            # ✅ REQUIRED

  ################################
  # ADDONS
  ################################
  addons = {
    coredns = {}

    eks-pod-identity-agent = {
      before_compute = true
    }

    kube-proxy = {}

    vpc-cni = {
      before_compute = true
    }

    aws-ebs-csi-driver = {
      most_recent              = true
      service_account_role_arn = aws_iam_role.ebs_csi_driver.arn  # ✅ REQUIRED
    }
  }

  ################################
  # NETWORK
  ################################
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  ################################
  # NODE GROUP
  ################################
  eks_managed_node_groups = {
    example = {
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["t3.small"

      ]

      min_size     = 2
      max_size     = 5
      desired_size = 3
    }
  }

  endpoint_public_access = true
  enable_cluster_creator_admin_permissions = true

  tags = {
    Environment = "prod"
    Terraform   = "true"
  }
}
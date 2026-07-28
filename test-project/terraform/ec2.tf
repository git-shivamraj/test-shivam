resource "aws_instance" "k3s_server" {
  ami                    = "ami-0f58b397bc5c1f2e8" # Ubuntu 24.04 LTS (ap-south-1)
  instance_type          = "t3.micro"
  subnet_id              = module.vpc.public_subnets[0]
  vpc_security_group_ids = [aws_security_group.k3s_sg.id]
  key_name               = "terraform-key"

  associate_public_ip_address = true
  tags = {
    Name = "${var.project_name}-k3s"
  }
}
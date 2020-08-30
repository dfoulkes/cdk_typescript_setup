import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as elb  from '@aws-cdk/aws-elasticloadbalancing';

export class CdkEc2StackStack extends cdk.Stack {
  
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'VPC',{ vpcName: 'VpcStack/automatedVpc' });

    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
    });
   
    const lb = new elb.LoadBalancer(this, 'LB', {
      vpc,
      internetFacing: true,
      healthCheck: {
        port: 80
      },
    });

    lb.addTarget(asg);
    const listener = lb.addListener({ externalPort: 80 });
    listener.connections.allowDefaultPortFromAnyIpv4('Open to the world');
 }
}

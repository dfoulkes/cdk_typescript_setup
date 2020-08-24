import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class CdkEc2Stack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpc = ec2.Vpc.fromLookup(this, 'VPC',{ vpcName: 'VpcStack/automatedVpc' });

    const linux = ec2.MachineImage.genericLinux({
      'eu-west-1': 'ami-12345678'
    });

    // The code that defines your stack goes here
    const host = new ec2.BastionHostLinux(this, 'BastionHost', {
      vpc,
      subnetSelection: { subnetType: ec2.SubnetType.PUBLIC },
    });
    host.allowSshAccessFrom(ec2.Peer.ipv4('1.2.3.4/32'));
    
  }
}

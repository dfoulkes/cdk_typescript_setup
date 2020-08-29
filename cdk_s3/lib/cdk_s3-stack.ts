import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';

export class CdkS3Stack extends cdk.Stack {
  public readonly myBucket: s3.Bucket;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'MyBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    this.myBucket = bucket;
  }
}
interface ConsumerProps extends cdk.StackProps {
  userBucket: s3.IBucket
}

export class Consumer extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props: ConsumerProps) {
      super(scope, id, props);
  
      const user = new iam.User(this, 'MyUser');
      props.userBucket.grantReadWrite(user);
    }
  }

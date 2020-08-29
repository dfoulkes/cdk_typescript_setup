#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkS3Stack, Consumer } from '../lib/cdk_s3-stack';


const app = new cdk.App();

const cdkEnv: cdk.Environment = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  }


const producer = new CdkS3Stack(app, 'ProducerStack');
new Consumer(app, 'ConsumerStack', { userBucket: producer.myBucket });

new CdkS3Stack(app, 'CdkS3Stack', {env: cdkEnv});
app.synth();
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkS3StaticWebsiteStack } from '../lib/cdk_s3_static_website-stack';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
const app = new cdk.App();
const cdkEnv: cdk.Environment = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  }

const staticWeb =  new CdkS3StaticWebsiteStack(app, 'CdkS3StaticWebsiteStack', {env: cdkEnv});
app.synth();

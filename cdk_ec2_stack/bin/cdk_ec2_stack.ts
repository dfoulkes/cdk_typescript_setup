#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEc2StackStack } from '../lib/cdk_ec2_stack-stack';


const cdkEnv: cdk.Environment = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  }

const app = new cdk.App();
new CdkEc2StackStack(app, 'CdkEc2StackStack', {env: cdkEnv});
app.synth();
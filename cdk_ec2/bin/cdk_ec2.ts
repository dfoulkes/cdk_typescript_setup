#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEc2Stack } from '../lib/cdk_ec2-stack';

const app = new cdk.App();

const cdkEnv: cdk.Environment = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
  }

new CdkEc2Stack(app, 'CdkEc2Stack', {env: cdkEnv});
app.synth();
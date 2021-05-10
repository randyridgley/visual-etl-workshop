#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GlueStudioSnowflakeStack } from '../lib/glue-studio-snowflake-stack';

const app = new cdk.App();
new GlueStudioSnowflakeStack(app, 'GlueStudioSnowflakeStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  db: 'NFL',
  schema: 'STATS',
  snowflakeAccount: app.node.tryGetContext('snowflake_account'),
  jdbcDriver: 'snowflake-jdbc-3.13.2.jar'
});

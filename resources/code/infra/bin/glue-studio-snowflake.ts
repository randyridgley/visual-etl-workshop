#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GlueStudioSnowflakeStack } from '../lib/glue-studio-snowflake-stack';

const app = new cdk.App();
new GlueStudioSnowflakeStack(app, 'GlueStudioSnowflakeStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  db: 'SNOWFLAKE_SAMPLE_DATA',
  schema: 'TPCDS_SF100TCL',
  snowflakeAccount: '[SNOWFLAKE_ACCOUNT]',
  jdbcDriver: 'snowflake-jdbc-3.13.2.jar'
});

import * as cdk from '@aws-cdk/core';
import * as glue from '@aws-cdk/aws-glue';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as iam from '@aws-cdk/aws-iam';
import * as secrets from '@aws-cdk/aws-secretsmanager';
import * as databrew from '@aws-cdk/aws-databrew';
import * as path from 'path';
import { CfnRecipe } from '@aws-cdk/aws-databrew';

interface GlueStudioSnowflakeProps extends cdk.StackProps {
  snowflakeAccount: string
  db: string
  schema: string
  jdbcDriver: string
}

export class GlueStudioSnowflakeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: GlueStudioSnowflakeProps) {
    super(scope, id, props);

    const glueRole = new iam.Role(this, 'GlueExecutionRole', {
      assumedBy: new iam.ServicePrincipal('glue.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSGlueServiceRole")
      ]
    });

    new cdk.CfnOutput(this, 'GlueRole', { value: glueRole.roleArn })

    const dataBrewRole = new iam.Role(this, 'DataBrewExecutionRole', {
      assumedBy: new iam.ServicePrincipal('databrew.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSGlueDataBrewServiceRole")
      ]
    });

    new cdk.CfnOutput(this, 'DataBrewRole', { value: dataBrewRole.roleArn })

    const snowflakeCreds = new secrets.Secret(this, 'SnowflakeCredentials', {
      secretName: 'snowflakeCreds',
      description: 'Credentials and Warehouse for Snowflake Connection',
    })
    snowflakeCreds.grantRead(glueRole)
    new cdk.CfnOutput(this, 'SnowflakeCredsSecret', { value: snowflakeCreds.secretName })

    const workingBucket = new s3.Bucket(this, 'GlueStudioBucket');
    workingBucket.grantReadWrite(glueRole)
    workingBucket.grantReadWrite(dataBrewRole)
    new cdk.CfnOutput(this, 'WorkingBucket', { value: workingBucket.bucketName })

    new s3deploy.BucketDeployment(this, 'DeployFiles', {
      sources: [s3deploy.Source.asset(path.join(__dirname, 'assets'))], 
      destinationBucket: workingBucket,
    });

    const jdbcConnector = new glue.Connection(this, 'snowflake-jdbc-connector', {
      type: new glue.ConnectionType('CUSTOM'),
      connectionName: 'snowflake-jdbc-glue-connector',
      matchCriteria: [
        "template-connection"
      ],
      properties: {
        "CONNECTOR_CLASS_NAME": "net.snowflake.client.jdbc.SnowflakeDriver",
        "CONNECTOR_TYPE": "Jdbc",
        "CONNECTOR_URL": "s3://" + workingBucket.bucketName + "/" + props.jdbcDriver,
        "JDBC_CONNECTION_URL": "[[\"default=jdbc:snowflake://" + props.snowflakeAccount + "." + cdk.Aws.REGION + ".snowflakecomputing.com/?user=${Username}&password=${Password}&warehouse=${warehouse}\"],\"&\"]"
      }
    });

    const jdbcConnection = new glue.Connection(this, 'snowflake-jdbc-connection', {
      type: new glue.ConnectionType('CUSTOM'),
      connectionName: 'snowflake-jdbc-glue-connection',
      matchCriteria: [
        "Connection",
        "snowflake-jdbc-glue-connector"
      ],
      properties: {
        "CONNECTOR_CLASS_NAME": "net.snowflake.client.jdbc.SnowflakeDriver",
        "CONNECTOR_TYPE": "Jdbc",
        "CONNECTOR_URL": "s3://" + workingBucket.bucketName + "/" + props.jdbcDriver,
        "JDBC_CONNECTION_URL": "jdbc:snowflake://" + props.snowflakeAccount + "." + cdk.Aws.REGION + ".snowflakecomputing.com/?user=${Username}&password=${Password}&warehouse=${warehouse}&db=" + props.db + "&schema=" + props.schema,
        "SECRET_ID": snowflakeCreds.secretName
      }
    });

    jdbcConnection.node.addDependency(jdbcConnector)

    const databrewRecipe = new databrew.CfnRecipe(this, 'clean-stats-recipe', {
      name: 'clean-nfl-stats-recipe',
      steps: [{
        action: {
          operation: "CHANGE_DATA_TYPE",
          parameters: {
            "columnDataType": "integer",
            "sourceColumn": "team_id"
          }
        }
      },
      {
        action: {
          operation: "CHANGE_DATA_TYPE",
          parameters: {
            "columnDataType": "integer",
            "sourceColumn": "player_id"
          }
        }
      },
      {
        action: {
          operation: "DELETE",
          parameters: {
            "sourceColumns": "[\"blocked_fgs\",\"blocked_kicks\",\"blocked_pat\",\"blocked_punts\",\"def_fums\",\"def_fums_lost\",\"fg_atts\",\"fg_convs\",\"fg_convs_details\",\"fg_long\",\"fg_missed_details\",\"fgs_blocked\",\"kick_ret_atts\",\"kick_ret_long\",\"kick_ret_long_is_td\",\"kick_ret_tds\",\"kick_ret_yds\",\"kick_rets_over_40_yds\",\"kick_rets_over_40_yds_for_td\",\"misc_tkls\",\"net_yds_per_punt\",\"pat_atts\",\"pat_blocked\",\"pat_convs\",\"punt_long\",\"punt_ret_atts\",\"punt_ret_fair_catches\",\"punt_ret_long\",\"punt_ret_long_is_td\",\"punt_ret_tds\",\"punt_rets_over_40_yds\",\"punt_rets_over_40_yds_for_td\",\"punt_return_yds\",\"punt_returns\",\"punt_touch_backs\",\"punt_yds\",\"punts\",\"punts_blocked\",\"punts_in_20\",\"special_teams_fums\",\"special_teams_fums_lost\",\"special_teams_tkl_asts\",\"special_teams_tkls\",\"misc_tkls_asts\"]"
          }
        }
      }],
      description: 'Recipe to clean stats and remove columns not needed'
    })
  }
}

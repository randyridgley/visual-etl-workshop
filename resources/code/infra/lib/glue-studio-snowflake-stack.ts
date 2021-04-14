import * as cdk from '@aws-cdk/core';
import * as glue from '@aws-cdk/aws-glue';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as iam from '@aws-cdk/aws-iam';
import * as secrets from '@aws-cdk/aws-secretsmanager';
import * as lf from '@aws-cdk/aws-lakeformation';
import * as path from 'path';

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
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('glue.amazonaws.com'), 
        new iam.ServicePrincipal('lakeformation.amazonaws.com')
      ),
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

    const bucketResource = new lf.CfnResource(this, 'WorkingBucketResource', {
      resourceArn: workingBucket.bucketArn,
      roleArn: glueRole.roleArn,
      useServiceLinkedRole: false
    })

    const glueRoleDataPermission = new lf.CfnPermissions(this, 'glue-role-data-permission', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: glueRole.roleArn,
      },
      resource: {
        dataLocationResource: {
          s3Resource: workingBucket.bucketArn
        }
      },
      permissions: [
        'DATA_LOCATION_ACCESS'
      ]
    });
    glueRoleDataPermission.node.addDependency(bucketResource)

    const brewRoleDataPermission = new lf.CfnPermissions(this, 'brew-role-data-permission', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: dataBrewRole.roleArn,
      },
      resource: {
        dataLocationResource: {
          s3Resource: workingBucket.bucketArn
        }
      },
      permissions: [
        'DATA_LOCATION_ACCESS'
      ]
    });
    brewRoleDataPermission.node.addDependency(bucketResource)

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

    const nflDatabase = new glue.Database(this, 'nfl-database', {
      databaseName: 'nfl'      
    })

    new lf.CfnPermissions(this, 'glue-role-database-permission', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: glueRole.roleArn,
      },
      resource: {
        databaseResource: {
          name: nflDatabase.databaseName
        }
      },
      permissions: [
        'ALTER',
        'CREATE_TABLE',
        'DROP',
        'DESCRIBE'
      ]
    });
  }
}

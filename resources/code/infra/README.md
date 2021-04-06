# Create a Glue Job in Glue Studio connecting to Snowflake and Visualizing

In this tutorial you will be working on using new Glue Studio features to quickly and visually create ETL jobs in Glue to connect to Snowflake and pull down a set of data for building your Data Lake in AWS. The job will load data into S3 and register the metadata with Glue to allow it to be utilized by tools like Athena and QuickSight. All the resources you need to get started will be created with the CDK and a pictorial walkthough of wwhat is needed to build the job will be provided later in the text.

## Getting Started

### Create a Snowflake account

To get started with Snowflake, you need to set-up an account through the [Snowflake](https://www.snowflake.com/) website. You can create a free trial account for this exercise, but is outside of the scope of this document.

### Get the latest Snowflake driver

The first thing you will need to do is download the appropriate driver for connecting to Snowflake.

To download the driver:

Go to the Maven Central Repository [https://repo1.maven.org/maven2/net/snowflake/snowflake-jdbc](https://repo1.maven.org/maven2/net/snowflake/snowflake-jdbc)

The most recent version is not always at the end of the list. Versions are listed alphabetically, not numerically. For example, 3.10.x comes after 3.1.x, not after 3.9.x.

Download the snowflake-jdbc-#.#.#.jar file. (You do not need to download the entire directory.) From the root directory I downloaded version snowflake-jdbc-3.13.2 with the command below.

```bash
wget -P lib/assets/ https://repo1.maven.org/maven2/net/snowflake/snowflake-jdbc/3.13.2/snowflake-jdbc-3.13.2.jar
```


### Run the CDK script

Now that you have all the resources needed, you can execute the cdk script to deploy the resources required to create the glue job in Glue Studio for connecting to Snowflake and pulling data from the samples database. The last thing you will need to do is update the `snowflakeAccount` prop in the `bin\glue-studio-snowflake.ts` file below to match your Snowflake account Id. You can also change the `env` section below to match the `AWS_ACCOUNT` and `AWS_REGION` you want to deploy the script to if it is different from the your default setup.

```typescript
new GlueStudioSnowflakeStack(app, 'GlueStudioSnowflakeStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  db: 'SNOWFLAKE_SAMPLE_DATA',
  schema: 'TPCDS_SF100TCL',
  snowflakeAccount: 'XXXXX',
  jdbcDriver: 'snowflake-jdbc-3.13.2.jar'
});
```

Once that change is ready you can run the command below to synthesize you script to CloudFormation and execute the resources in your account. 

```bash
    cdk deploy
```

### Create a secret in Secrets Manager

Create a secret in AWS Secrets Manager. I named mine `SnowflakeSecret` but you can name it whatever you want, just make sure you referenece the correct name in the props for the script. The key/value pairs needed if following along with the tutorial would be as follows:

* Username - Username used to log into Snowflake
* Password - Password used to log into Snowflake
* Warehouse - Compute Warehouse used to run the queries

t




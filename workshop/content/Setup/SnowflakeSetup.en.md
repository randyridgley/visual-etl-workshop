+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "(Optional) Snowflake Setup"
date = 2019-09-09T17:42:10+01:00
weight = 4
+++

## (Optional) Setting up Snowflake

In order to work on the optional section of this workshop you will need to have access to a Snowflake account. They do offer 30 day trial accounts so you can go and create an account, but it is beyond the scope of this workshop.

There are two steps needed before you will be able to use Snowflake with AWS Glue Studio. A **Database**, **Schema**, and **Table** needs to be created in your Snowflake account and you need to create a Glue Custom Connector with information about your Snowflake account.

### Snowflake account setup

In your Snowflake account you will first need to create a **Database**. Click on the **Databases** icon in the main nav bar.

![SnowflakeDatabse](/images/snowflake-navbar.png)

From the **Databases** nav bar click on **Create..** to create the new database.

![SnowflakeDatabse](/images/snowflake-databases.png)

In the dialog box for create database enter in `NFL` for the **Name** field and click **Finish**.

![SnowflakeDatabse](/images/snowflake-create-database.png)

Now click on the **Schemas** tab under the `NFL` database and click **Create..**.

![SnowflakeDatabse](/images/snowflake-schemas.png)

In the dialog box enter in the **Name** field `STATS` for the name of the schema and click the **Finish** button to create the schema.

![SnowflakeDatabse](/images/snowflake-create-schema.png)

With the databse and schema created the last step inside Snowflake is to create the table we will be inserting into from Glue Studio. From the main nav bar click the **Worksheet** icon to bring you to a query editor like below. Go back into your Cloud9 IDE and find the folder `resources/code/scripts` and open the `SNOWFLAKE_QB_STATS.sql` file. In the editor select the entire text and copy it. Now go back into the Snowflake query editor and paste it into the query window. Once you have it enter you can click the **Run SQL** button to create the table in Snowflake.

![SnowflakeDatabase](/images/snowflake-worksheet-create-table.png)

With the table created in Snowflake you are now ready to create the custom Glue Connector to Snowflake.

### Glue Studio custom Connector

We also need to create a connector and connection in Glue in order to connect to Snowflake from inside AWS Glue jobs. In the Glue Studio console on the left hand navigation drop down **Connectors** and click the `Create custom connector` link. 

Fill out the form matching the values below:

* **Connector S3 URL** - find the Snowflake jar file and select it from the bucket output parameter in the CDK script labelled `WorkingBucket`.
* **Name** - `snowflake-connector`
* **Connector type** - `JDBC`
* **Class name** - `net.snowflake.client.jdbc.SnowflakeDriver`
* **JDBC URL Base** - `dbc:snowflake://<SNOWFLAKE_ACCT_ID>.<AWS_REGION>.aws.snowflakecomputing.com/?user=${Username}&password=${Password}&warehouse=${warehouse}\`
* **URL Parameter Delimiter** - `&`

![GlueConnectorProps](/images/glue-connector-props.png)

Once completed filling out the form click `Create connector` to complete the connector setup.

With the connector now created we are going to create a specific connection from the connector to Snowflake for the `NFL` database and the  `STATS` schema. Click the **Connectors** link on the left hand navigation and you will be taken to the connectors landing page like below. Select the radio button next to `snowflake-connector` and click the `Create connection` button.

![GlueConnectors](/images/glue-connectors.png)

In the connection creation process you will provide properties for access as well as for what database and schema you would like to work with. Fill out the fields matching the image below.

![GlueConnectionProps](/images/glue-connection-props.png)

For connection access we will be using the `default` **Connection credential type** and find the Snowflake secret created when stating the lab. The secret should contain 3 keys in the body of the secret and the json document looks like:

``` json
{
  "Username": "<SNOWFLAKE_USERNAME>",
  "Password": "<SNOWFLAKE_PASSWORD>",
  "warehouse": "COMPUTE_WH" // this is the default warehouse change if yours is different.
}
```

![GlueConnectionAccess](/images/glue-connection-access.png)

You can see what the JDBC connection looks like in the **Connection URL Preview** section. With that done the last step is to add the addiontal fields to tyhe connection string for the `db` and `schema`. Fill out your form to match below.

![GlueConnectionAddlProps](/images/glue-connection-addl-props.png)

With everythign filled out on the connection console you can now click **Create connection** to complete the steps needed to work with Snowflake.
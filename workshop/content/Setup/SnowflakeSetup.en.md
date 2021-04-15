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

![SnowflakeDatabse](/images/snowflake-worksheet-create-table.png)

With the table created in Snowflake you are now ready to create the custom Glue Connector to Snowflake.

### Glue Studio custom Connector


+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Assign/Verify Permissions"
date = 2019-09-09T17:42:10+01:00
weight = 20
+++

### 2. Adding permissions with AWS Lake Formation and verifying with Athena

**Todo** May have to add section to add self to datalake administrator access in Lake Formation.

#### Background
AWS Lake Formation gives you the ability to have a centralized location to manage security and governance of your data lake. By using AWS Lake Formation you can aid in democratizing data by simplifying access to data in your data lake, provide column and row level filtering, and give the ability to share data without having to copy it into your centralized data lake allowing you to build a data mesh.

#### High-Level Instructions
In this module, you will learn how to grant and revoke access to data in S3 and metadata in your AWS Glue Data catalog to provide governance of the data in a centralized manner. Once permissions are applied you will use Athena to spot check access to the data using SQL.

**:white_check_mark: Step-by-step directions**

![LakeFormationTables](/images/lakeformation-tables.png)

Starting where we left off in the last section, we want to see if our current user has access to the data we crawled and cataloged with the Glue Crawler.

1. From the Lake Formation console, select the radio button next to the `players` table. Find the **Action** dropdown button and from the drop down select `View Data`. If a dialog box opens up select **OK** to continue and this will open a new tab taking you to the Athena console. It should automatically run a simple query to see the first 10 results from the table. If not, when the console loads click the **Run Query** button to execute the query.
2. An error should have occured. This is due to not having the appropriate Lake Formation permissions to read from this table and looks like the message below.

![AthenaError](/images/athena-lf-error.png)

3. Let's work on fixing this for the `players` table first and then we can apply the same concepts to the `teams` and `stats` tables to make them available to be queried. With the radio button on the `players` row selected drop down the **Action** dropdown button again, but this time under the **Permissions** section click `Grant`. This will bring up the dialog to grant access to the table for your user like below. For the **IAM Users and Roles** dropdown select the role `FILLINTHEBLANK` and the `GlueExecutionRole` from the CDK script, and in the **Table Permissions** section check the `Select` and `Describe` checkboxes to give read access to the table.

![GrantComplete](/images/lf-grant-complete.png)

4. Repeat the prior step for both the `teams` and `stats` tables.
5. With that done, you can repeat Step 2. to open the Athena console and you should be able to successfully query the tables based on the level of permissions you gave the user.

![architecture](/images/athena-results.png)

With the right level of access to the raw tables we are now ready to use Glue Studio to create an ETL job to join and transform the data to prepare it for visualizations. Head over to the next section to complete that task.
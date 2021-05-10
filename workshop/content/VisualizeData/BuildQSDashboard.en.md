+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Build QuickSight Dashboard"
date = 2019-09-09T17:42:10+01:00
weight = 30
+++

### Build dashboard to visualize data in QuickSight

#### Background

A dataset in QuickSight identifies the specific data in a data source that you want to use. In this example, the data source will be data from S3 registered with the Glue Catalog and optionally Snowflake. A dataset also stores any data preparation you have performed on that data, such as renaming a field, changing its data type, or creating new calculated fields. 

#### High-level Instructions



**:white_check_mark: Step-by-step directions**

1. From the Quicksight left nav menu click the **Datasets** link.
2. In the top right hand of the console click the **New dataset** button.
3. From the list of data sources listed find the **Athena** icon and click it.
4. On the dialog for **Data source name** type in `quarterback_stats` and for the **Workgroup** select the `primary` group.
5. Click the **Create data set** button to go to the next screen.
6. On the **Choose your table** section leave **Catalog: contain sets of databases.** as the default `AwsDataCatalog` and for **Database: contain sets of tables.** in the dropdown select `nfl` in the **Tables: contain the data you can visualize.** selection box you will see only the `quarterback_stats` table that we gave access to QuickSight in the previous module. Select it and click **Select**

{{% notice note %}}
AWS Glue Studio has the ability to use multiple data sources through **Connectors**. You can use connectors in the AWS Marketplace or build your own custom connectors. For more information you can check out the [documentation](https://docs.aws.amazon.com/glue/latest/ug/connectors-chapter.html) to build your own. The AWS Marketplace contains connectors for many popular database platforms like SAP, Salesforce, CloudWatch Logs, and more.
{{% /notice %}}

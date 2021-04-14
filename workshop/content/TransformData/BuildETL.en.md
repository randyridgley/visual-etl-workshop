+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Build ETL with Glue Studio"
date = 2019-09-09T17:42:10+01:00
weight = 10
+++

### Visually build ETL with AWS Glue Studio

#### Background
Creating ETL historically has been very time consuming, brittle, and typically created by hand from a highly skilled programmer in laguages like Python and Scala. AWS Glue uses serverless spark containers to run ETL jobs. With AWS Glue Studio you no longer need to hand code yuour ETL jobs making it easier to build, less error prone, and reduces the time it takes from idea to completion in transforming, cleaning, and joining data in your data lake.

#### High-Level Instructions
In this module we will walk through creating a Spark ETL job visually using AWS Glue Studio. We will join all 3 tables we discovered and managed in the prior sections to create a single data set containing the stats for all offensive players in the NFL over the last severals years.

**:white_check_mark: Step-by-step directions**

1. Open the AWS Glue console and click the **AWS Glue Studio** link in the left hand navigation pane. This takes you to the Glue Studio console and if the left hand navigation is collapsed click the 3 line icon to open the pane.
2. From the left hand navigation click on the **Connectors** link to bring up the custom connectors in your account. The CDK script you ran in the [Setup][setup] section created a custom connector to provide the ability to connect to [Snowflake][snowflake]. If you scroll to the center of the page you will see the `snowflake-jdbc-glue-connector` custom connector that was created. If you decide to do the optional part of this workshop you will need you Snowflake account information to proceed.

{{% notice note %}}
AWS Glue Studio has the ability to use multiple data sources through **Connectors**. You can use connectors in the AWS Marketplace or build your own custom connectors. For more information you can check out the [documentation](https://docs.aws.amazon.com/glue/latest/ug/connectors-chapter.html) to build your own. The AWS Marketplace contains connectors for many popular database platforms like SAP, Salesforce, CloudWatch Logs, and more.
{{% /notice %}}

3. Let's get to work and start building our first ETL job in Glue Studio. On the left hand navigation click on the **Jobs** link.
4. In the **Create job** section select the `Blank graph` radio button and click the **Create** button.

![BuildETL](/images/blank-job-graph.png)

[setup]: /setup
[snowflake]: https://www.snowflake.com/
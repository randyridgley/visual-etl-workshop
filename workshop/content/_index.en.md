+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Visual ETL Workshop"
chapter = false
weight = 1
+++

In this workshop you will learn how to create ETL pipleines without having to have a deep knowledge of Python or Scala. In AWS there are multiple ways to visually build ETL so you were learn about the options that exist allowing you to make the right choice for your development needs. You will learn how to load 3rd party data into your data lake, transform the data, and create a dashboard to visualize the results. The goal of this workshop is to make you aware of the choices available in AWS so you can make an informed decision

The application architecture uses [AWS Data Exchange][data-exchange], [AWS Glue][glue], [Amazon S3][s3], [AWS Glue DataBrew][databrew], [Amazon Quicksight][quicksight], and [AWS Lake Formation][lake-formation].

See the diagram below for a depiction of the complete architecture.

![Visual ETL Architecture](images/architecture.png)

### Modules

This workshop is divided into five modules. Each module describes a scenario of
what we're going to build and step-by-step directions to help you implement the
architecture and verify your work.

| Module | Description |
| ---------------- | -------------------------------------------------------- |
| [Get Data][get-data] | Use AWS Data Exchange to retrieve 3rd party data set and load them into Amazon S3. Use AWS Glue DataBrew to clean raw data before landing into your data lake. |
| [Manage Data][manage-data] | Use AWS Lake Formation to provide governance and permissioning to datasets in your data lake. |
| [Transform Data][transform-data] | Use AWS Glue and  to transform the data from multiple csv datasets into a single parquet dataset. **Extra credit to load data from AWS Glue into Snowflake.** |
| [Visualize Data][visualize-data] | Use AWS Quicksight to build visualizations and dashboards. |

:warning: These modules are intended to be executed in order.

After you have completed the workshop you can delete all of the resources that were created by following the [cleanup guide][cleanup].

### Next

:white_check_mark: Review and follow the directions in the [setup guide][setup],
wherein you'll configure your AWS Cloud9 IDE and setup pre-requisites like an
AWS Account.

[data-exchange]: https://aws.amazon.com/data-exchange/
[glue]: https://aws.amazon.com/glue/
[databrew]: https://aws.amazon.com/glue/features/databrew/
[quicksight]: https://aws.amazon.com/quicksight/
[lake-formation]: https://aws.amazon.com/lake-formation/
[s3]: https://aws.amazon.com/s3/
[setup]: setup
[get-data]: getdata
[transform-data]: transformdata
[manage-data]: managedata
[visualize-data]: visualizedata
[cleanup]: cleanup

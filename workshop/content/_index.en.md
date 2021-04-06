+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Visual ETL Pipelines"
chapter = false
weight = 1
+++

In this workshop you will create ETL pipleines without having to know how to write Python or Scala code for your ETL. See how to create jobs that can be run on schedules or ad hoc and leverage tools in AWS to easily clean, analyze, and transform data in your data lake.

The application architecture uses [AWS Data Exchange][data-exchange], [AWS Glue][glue], [Amazon S3][s3], [AWS Glue DataBrew][databrew], [Amazon Quicksight][quicksight], and [AWS Lake Formation][lake-formation].

See the diagram below for a depiction of the complete architecture.

![Visual ETL Architecture](images/architecture.png)

### Modules

This workshop is divided into five modules. Each module describes a scenario of
what we're going to build and step-by-step directions to help you implement the
architecture and verify your work.

| Module | Description |
| ---------------- | -------------------------------------------------------- |
| [Get Data][get-data] | Use AWS Data Exchange to retrieve 3rd party data set. |
| [Transform Data][transform-data] | Use AWS Glue and AWS Glue DataBrew to transform the data from multiple csv datasets into a single parquet dataset. **Extra credit to load data from AWS Glue into Snowflake.** |
| [Manage Data][manage-data] | Use AWS Lake Formation to provide governance and permissioning to datasets in your data lake. |
| [Visualize Data][visualize-data] | Use AWS Quicksight to build visualization dashboards. |

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

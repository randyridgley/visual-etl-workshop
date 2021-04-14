+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Transform Data"
date = 2019-09-09T17:41:51+01:00
weight = 30
chapter = false
pre = "<b>3. </b>"
+++

## Background
In this module you will be become familiar with [AWS Glue Studio][glue-studio]. AWS Glue Studio is a graphical interface that makes it easy to create, run, and monitor ETL jobs in AWS Glue. You can visually compose data transformation workflows and seamlessly run them on AWS Glue’s Apache Spark-based serverless ETL engine.

![architecture](/images/architecture-glue-job.png)

The preceding diagram shows how AWS Lake Formation is used to provide centrailized governance of data in your datalake making it easy to secure sensitive data all while democratizing the use of it, eliminated data siloes.

## Implementation Instructions

:heavy_exclamation_mark: Ensure you've completed the [Manage Data][manage-data] step before beginning
this section.

Each of the following sections provides an implementation overview and detailed, step-by-step instructions. The overview should provide enough context for you to complete the implementation if you're already familiar with the AWS Management Console or if you want to explore the services yourself without following a walkthrough.

[manage-data]: /managedata
[glue-studio]: https://docs.aws.amazon.com/glue/latest/ug/what-is-glue-studio.html
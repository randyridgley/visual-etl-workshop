+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Manage Data"
date = 2019-09-09T17:41:51+01:00
weight = 20
chapter = false
pre = "<b>2. </b>"
+++

In this module you will be become familiar with [AWS Lake Formation][lake-formation]. You can use Lake Formation to centrally define security, governance, and auditing policies in one place versus doing these tasks per service, and then enforce those policies for your users across their analytics applications.

![architecture](/images/architecture-lakeformation.png)

The preceding diagram shows how AWS Lake Formation is used to provide centrailized governance of data in your datalake making it easy to secure sensitive data all while democratizing the use of it, eliminated data siloes.

## Background

### What is AWS Glue

AWS Glue is a serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development. AWS Glue provides all of the capabilities needed for data integration so that you can start analyzing your data and putting it to use in minutes instead of months.

#### Key Concepts

**AWS Glue Data Catalog**
The AWS Glue Data Catalog contains references to data that is used as sources and targets of your extract, transform, and load (ETL) jobs in AWS Glue. To create your data warehouse or data lake, you must catalog this data. The AWS Glue Data Catalog is an index to the location, schema, and runtime metrics of your data.

**AWS Glue Crawlers**
You can use a crawler to populate the AWS Glue Data Catalog with tables. This is the primary method used by most AWS Glue users. A crawler can crawl multiple data stores in a single run. Upon completion, the crawler creates or updates one or more tables in your Data Catalog.

**Serverless Spark ETL Containers**
AWS Glue runs your ETL jobs in an Apache Spark serverless environment. AWS Glue runs these jobs on virtual resources that it provisions and manages in its own service account.

### What is AWS Lake Formation
AWS Lake Formation makes it easier for you to build, secure, and manage data lakes. Lake Formation helps you do the following, either directly or through other AWS services:
* Create a registry of data locations and paths where your data lake will reside.
* Orchestrate data flows that ingest, cleanse, transform, and organize the raw data.
* Create and manage a Data Catalog containing metadata about data sources and data in the data lake.
* Define granular data access policies to the metadata and data through a grant/revoke permissions model.

## Implementation Instructions

:heavy_exclamation_mark: Ensure you've completed the [Get Data][get-data] step before beginning
the workshop.

Each of the following sections provides an implementation overview and detailed, step-by-step instructions. The overview should provide enough context for you to complete the implementation if you're already familiar with the AWS Management Console or if you want to explore the services yourself without following a walkthrough.

[get-data]: /getdata
[lake-formation]: https://aws.amazon.com/lake-formation/

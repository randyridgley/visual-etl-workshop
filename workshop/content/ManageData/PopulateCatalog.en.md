+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Populate Metadata Catalog"
date = 2019-09-09T17:42:10+01:00
weight = 10
+++

### Populate the AWS Glue Data Catalog

#### Background
Now that we have the data loaded in Amazon S3 from AWS Data Exchange we want to populate the AWS Glue Data Catalog with the metadata from the three data sets `players`, `teams`, and `stats`. We could manually add the schema metadata to the catalog but with AWS Glue there is an automated way to discover and add the metadata by using [Crawlers][crawlers].

#### High-Level Instructions
In this section you will create and run an AWS Glue Crawler to populate the AWS Glue Data Catalog with the metadata for the data we exported from AWS Data Exchange.

**:white_check_mark: Step-by-step directions**

##### 1. Create the AWS Glue Crawler

1. Once you have the AWS Glue console open, on the left hand navigation click the **Crawlers** link.
2. Find the **Add Crawler** button and click to start the wizard for creating the crawler.
3. In the **Crawler Info** section find the **Crawler Name** text box and enter `nfl-data-crawler` in the textbox. Leave the defaults for the rest of the items in this section and click the **Next** button.
4. In the **Specify crawler source type** leave the defaults for **Crawler source type** as we are creating new tables not using existing and for **Repeat crawls of S3 data stores** leave `Crawl all folders` but in production you might consider only crawling new folders depending on your data structure. Click the **Next** button.
5. In the **Add a data store** for the **Choose a data store** dropdown leave `S3` and for **Include path** find the bucket created in the CDK script using the output value from the `WorkingBucket` parameter and add the additional prefixes `/football/nfl/` to look like `s3://${WorkingBucket}/football/nfl/` replacing `${WorkingBucket}` with your bucket. Drop down the **Exclude patterns** section and in the **Exclude patterns** textbox add `boxScoreByPlayer/**` this is the S3 prefix where the raw data was downloaded from AWS Data Exchange for the player stats. Click the **Next** button.
6. In **Add another data store** leave `No` selected and click the **Next** button.
7. In the **Choose an IAM role** find the IAM created in the CDK script. It will start with `GlueStudioSnowflakeStack-GlueExecutionRole*`. Click the **Next** button.
8. We will not be creating a schedule for the crawler so in the **Create a schedule for this crawler** section leave the default `No` and click the **Next** button.
9. In the **Configure the crawler's output** we already precreated a Glue Database named `nfl`. Select the `nfl` database in the **Database name** and leaving the defaults for the rest of the configurations and click the **Next** button.
10. Review the options you selected for the crawler and click the **Finish** button to create the crawler.

##### 2. Run the AWS Glue Crawler to populate the catalog

1. On the view page in the AWS Glue console. Find the crawler you just created in the steps above and check the checkbox in the row. Click the **Run Crawler** button.
2. Running the crawler will take a minute or two, you will see thestatus go from `STARTING` to `RUNNING` and when completed back to `READY`. Wait for the crawler to finish.
3. Once finished the crawler should have discovered 3 tables and will show in the  **Tables added** column.

##### 3. Open the AWS Lake Formation Console

1. On the left hand navigation of the console click the **Tables** link under the **Data Catalog** section.
2. Click on the `Find table by properties` texbox and in the dropdown that shows select **Database** and choose `nfl` to filter the list to only tables in the `nfl` database. The 3 tables the crawler created should show as `players`, `teams`, and `stats`.

![architecture](/images/lakeformation-tables.png)

Continue on to the next section of this module to assign the permissions with AWS Lake Formation.
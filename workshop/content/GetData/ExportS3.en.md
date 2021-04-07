+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Export to Amazon S3"
date = 2019-09-09T17:42:10+01:00
weight = 40
+++

### 4. Export data sets to Amazon S3

#### Background

In AWS Data Exchange once you have subscribed to a data set you want to make it available to otehr servcies within your account to be used for your various Analytics and AI/ML workloads. AWS Data Exchange is integrated into services like AWS Glue DataBrew and Amazon S3 to seamlessly load data into those services for further analysis.

#### High-Level Instructions

From the AWS Data Exchange console, you will learn how to export data sets from the `Entitled Data` you recieved when you subscribed to the 3rd party data provided in the exchange. You will run the same directions below for **(2)** data sets in this exercise. You should be in the **Subscriptions** view in the AWS Data Exchange console scrolled down to the **Entitled data sets** section like below:

![Entitled data sets](/images/data-exchange-entitled-dataset.png)

**:white_check_mark: Step-by-step directions**

1. Click on the `NFL Regular And Postseason Players: 2010-2019 Seasons` link.

{{% notice note %}}
This will open in a new tab. You will continue the steps below in the new tab.
{{% /notice %}}

2. In the **Product Subscriptions** text box type in `NFL` to filter the list of subscriptions.
3. Find the `NFL Regular and Postseason Players` data set and expand the arrow then click the linked data set under it like below:
 
![players](/images/data-exchange-prod-subs.png)

4. Find the **Assets** panel in the middle of the page and click the checkbox with the **Name** `football/nfl/players/players.csv`.
5. From the **Export actions** dropdown button select `Export selected assets to Amazon S3`.
6. In the **Export to Amazon S3** window select the bucket that was created in the intial setup when you ran the CDK script. The output key is named `WorkingBucket`.

![dxbucket](/images/data-exchange-s3-bucket.png)

7. Leave the defaults for the rest of the options and click the **Export** button.

![dxbucket](/images/data-exchange-export-complete.png)

{{% notice note %}}
Follow these steps above again to complete the export process for the `NFL Regular and Postseason Teams` data set. Also, select the `football/nfl/teams/teams.csv` in step 4. Once complete, continue to the next section.
{{% /notice %}}

+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Export to AWS Glue DataBrew"
date = 2019-09-09T17:42:10+01:00
weight = 50
+++

### 5. AWS Glue DataBrew and AWS Data Exchange integration
Many times even on the exchanges data can still be a bit messy before it's ready to be used in your data lake. The integration of [AWS Glue DataBrew] with AWS Data Exchange allows you to quickly and visually clean and transform you data before loading it into Amazon S3. In this section we will familiarize you with the AWS Glue DataBrew UI and export the data into your data lake to use in the next section.
 
**:white_check_mark: Step-by-step directions**

1. Continuing on from the last section in the AWS Data Exchange screen for entitled data select the `NFL 2019 Season Week 11 Player Box Score Stats`.

{{% notice note %}}
If you don't recall how to do that refer back to the last section steps 1-3.
{{% /notice %}}

2. Find the **Assets** panel in the middle of the page and click the checkbox with the **Name** `football/nfl/boxScoreByPlayer/boxScoreByPlayer_preview.csv`.
3. Now instead of directly exporting to Amazon S3 from the **Export actions** dropdown you will click the button `Prepare with AWS Glue DataBrew`.
4. In the **Prepare with AWS Glue DataBrew** window select the bucket that was created in the intial setup when you ran the CDK script. The output key is named `WorkingBucket`.
5. Finally, click the **Prepare** button to load into AWS Glue DataBrew.
6. Click the **View in AWS Glue DataBrew** button in the pop-up to open the console.

![prepare](/images/data-exchange-prepare.png)

### 6. Quickly clean data with AWS Glue DataBrew


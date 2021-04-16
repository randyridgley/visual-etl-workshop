+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Run Job and Verify results"
date = 2019-09-09T17:42:10+01:00
weight = 20
+++

### Run Job and Verify results with Athena

#### Background

In the previous section we built ETL code visually using AWS Glue Studio. We are now ready to run the job, add permissions and verify the data loaded correctly.

#### High-Level Instructions
You will walk through executing a Glue job, tools available to troubleshoot issues, add more permissions with Lake Formation, and finally verify the results with Athena.

**:white_check_mark: Step-by-step directions**

If you have been following along with the instructions your job should look something like below:

![FinishedJob](/images/glue-s3-job.png)

1. On the Glue Studio console find the **Run** button on the top right hand and click it to start the job.
2. On the **Run** tab of the Glue Studio job nav bar you should see a run that looks like below in a `Running` state:

![Running](/images/glue-job-success.png)

{{% notice note %}}
Here you can see links to the logs, output logs, and errors in CloudWatch logs. You also have the total execution time when the job is complete to see how long the job ran. Finally, a job id for this unique run. This can be helpful when working with enterprise support when having issues with jobs.
{{% /notice %}}

3. The job should only take a few minutes to complete. Once completed you should have a new table `quarterback_stats` in your `nfl` Glue Database or data in your `QUARTERBACK_STATS` table in the `NFL` database under the `STATS` schema in Snowflake.

![S3](/images/glue-s3-qb-stats-table.png)

---

![Snowflake](/images/snowflake-results.png)

4. To see results for the data in S3 we have one more step to complete before we have access. Since this S3 location and Glue database are managed by AWS Lake Formation we need to add read permissions to the `quaertedback_stats` table like we did in the [Manage Data][managed] assign permissions section for the `players`, `teams`, and `stats` tables. In order to do this you can select the radio button next to the `quarterback_stats` table and from the **Action** dropdown menu select `Grant` and it will open a dialog box like below and you will add your user to the **IAM users and roles** dropdown and for **Table permissions** only check the `Describe` and `Select` checkboxes ensure all other checkboxes are unchecked. When you are done click the **Grant** button to save the changes.

![Perms](/images/glue-s3-qp-assign-perms.png)

5. With the data not in S3, the metadata catalog in the Glue Dtaa Catalog, and permissions assigned with Lake Formation we are now ready to verify the data was created correctly in the ETL job and that we can query the data. With the `quartedback_stats` radio button selected click the **Action** dropdown and select the **View data** link. This will open Athena in a new tab in your browser and run a simple query to get the first 10 results. If a prompt opens click okay to continue. You should have results similiar to below:

![Athena](/images/glue-s3-athena-results.png)

You have now successfully completed this module. Head over to the [recap][recap] to review what you have done.

[managed]: ../managedata/assignpermissions/
[recap]: ../transformdata/recap

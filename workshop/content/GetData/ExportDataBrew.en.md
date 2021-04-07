+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Export to AWS Glue DataBrew"
date = 2019-09-09T17:42:10+01:00
weight = 50
+++

### 5. AWS Glue DataBrew and AWS Data Exchange integration

#### Background

Many times even on the exchanges data can still be a bit messy before it's ready to be used in your data lake. The integration of [AWS Glue DataBrew] with AWS Data Exchange allows you to quickly and visually clean and transform you data before loading it into Amazon S3. In this section we will familiarize you with the AWS Glue DataBrew UI and export the data into your data lake to use in the next section.

#### High-Level Instructions

You will learn how to export your data set into AWS Glue DataBrew and use high level constructs to clean and transform the data set using recipes and finally build a job to export your newly cleaned and transformed data set to Amazon S3.

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

#### Background

You should now be in the AWS Glue DataBrew console in the **Dataset Preview** tab. We want to create a project in DataBrew to be able to create a recipe to clean up the data set. In DataBrew, a recipe is a set of data transformation steps. You can apply these steps to a sample of your data, or apply that same recipe to a dataset. Once you are happy with the recipe you can save it and create a job to apply the recipe to your entire data set. 

#### High-Level Instructions

In this section you will create a new project in DataBrew and be applying a recipe that has already been created in the initial CDK script that will update the `team_id` and `player_id` columns to `integer` and removing all the stats not associated with quarterbacks in the NFL.

1. On the **Dataset Preview** toolbar on the far right you will click the **Create project with this dataset** button like below to get started:

![CreateProject](/images/databrew-create-project.png)

2. Now you will need to provide a few details to the project such as name and IAM Role to use to allow DataBrew access to resources like S3 buckets. In the **Name** field use `nfl-stats-project`, check the **Import steps from recipe** and in the drop-down **Choose recipe** select the `nfl-stats-recipe`, this recipe was generated in the CDK script in [Setup][setup]. For the **Recipe version** drop-down select the latest version available.

**Replace this image**

![ProjectDetails](/images/databrew-project-details.png)

3. To finish creating the project you need to select the appropriate IAM Role for DataBrew to use. Find the IAM Role with the name that matches the CDK script output `DataBrewRole` and select it. Finally, click the **Create project** button.

![ProjectPermissions](/images/databrew-project-permissions.png)

**Replace this image**

4. You will now land in the main view of the project. Here you have many options like profiling the data set, running transforms, creating jobs, and defining schedules for the jobs. To find out more about the capabilities of DataBrew refer to the [Getting Started][getting-started] guide.  

![ProjectView](/images/databrew-project-view.png)

1. For this exercise we will be using a pre-created recipe to clean and transform the data. Take a minute and review the **Recipe** section to see how you can add transforms to recipes or even bring in other data sets to be joined visually. A great example blog showing the transformation capabilities in DataBrew can be found [here][transforms].

**Replace this image**

![ProjectRecipe](/images/databrew-project-recipe.png)

6. Now that we have viewed the data set in DataBrew and have a recipe to remove columns and change a few data types we are ready to create a job to transform the data set and load into Amazon S3. Click the **Create Job** button in the toolbar on the right side of the page to continue. 

![CreateJob](/images/databrew-create-job.png)

7. A few key details are needed to create the job. Put `nfl-stats-clean` as the name in the **Job name** textbox, verify you have the correct data set in DataBrew and for **Job Output Settings** select `CSV` for **File Type**,  find the bucket created in the CDK output param `WorkingBucket` and add the prefix `football/nfl/cleaned-stats/` in the **S3 Location** leaving the defaults for the other options.

![JobDetails](/images/databrew-job-details.png)

8. Drop down the arrow for **Additional configuration** and select the **Replace output files for each run** radio button to overwrite the files if we run the job multiple times.

![JobAdditional](/images/databrew-job-addl-config.png)

9. Just like the project in Glue DataBrew, the Job needs an IAM Role associated to it in order to have access to the S3 buckets to read and write data to Amazon S3. Find the IAM Role correspinding to the output parameter from teh CDK script in [setup][setup] named `DataBrewRole`. Click **Create and run job** to start the job.

![JobPermissions](/images/databrew-job-permissions.png)

10. You should now see in the top of the project a job running with the swirly indicating it has started successfully. You can wait here for it to finish or click on the Jobs link in the left hand navigation to wait for the job to succeed.

![Job](/images/databrew-job-running.png)

Once the job is complete you can view the results in the **Job run details** tab.

[setup]: /setup
[getting-started]: https://docs.aws.amazon.com/databrew/latest/dg/getting-started.html
[transforms]: https://aws.amazon.com/blogs/big-data/7-most-common-data-preparation-transformations-in-aws-glue-databrew/
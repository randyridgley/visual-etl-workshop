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

2. Now you will need to provide a few details to the project such as name and IAM Role to use to allow DataBrew access to resources like S3 buckets. In the **Name** field use `nfl-stats-project`, Leave the default **Create new recipe** in the recipe dropdown as we will be building a new recipe later in this section.

![ProjectDetails](/images/databrew-project-details.png)

1. To finish creating the project you need to select the appropriate IAM Role for DataBrew to use. Find the IAM Role with the name that matches the CDK script output `DataBrewRole` and select it. Finally, click the **Create project** button.

![ProjectPermissions](/images/databrew-project-permissions.png)

**Replace this image**

1. You will now land in the main view of the project. It will take about a minute to providsio the resources needed to start transforming the data. You have many options here to profile the data set, run transforms, creating jobs, and defining schedules for the jobs. There are over 250+ transformations to use out of the box with no prior coding knowledge needed to get up and running fast. To find out more about the capabilities of DataBrew refer to the [Getting Started][getting-started] guide. For the purposes of this module we will be most interested in creating a recipe to remove columns not needed and change the data type of two columns for use later in this workshop. The recipe is a series of actions performed against the data set in the project and the recipe can be saved and reused as new data sets with the same structure are imported into your data lake.

![ProjectView](/images/databrew-project-view.png)

1. For this exercise we will be creating a new recipe to clean and transform the data. On the right hand side of the console you will see a **Recipe** section go and click the `Add Step` button to add the steps below to cerate the recipe. A great example blog showing the transformation capabilities in DataBrew can be found [here][transforms].

![ProjectRecipe](/images/databrew-start-recipe.png)

After you add the first step you can use the toolbar in the **Recipe** section to add additional steps. Find the icon with the plus side on the far right to add the additional steps below after the first one.

![ProjectRecipeSteps](/images/databrew-recipe-add-step.png)

**Todo** consider adding more steps to recipe to add 0 for empty values

Recipe Steps:

1. Find **COLUMN ACTIONS** and select `Change Type`
    * Set **Source Column** to `player_id` and **Change type to** to `integer`
2. Find **COLUMN ACTIONS** and select `Change Type`
    * Set **Source Column** to `team_id` and **Change type to** to `integer`
3. Find **COLUMN ACTIONS** and select `Delete`
    * Select all the fields that begin with:
    * `blocked_`, `fg_`, `fgs_`, `kick_`, `punt_`, `special_teams_` 
    * The list should look like below when complete:
    * `blocked_fgs`,`blocked_kicks`,`blocked_pat`,`blocked_punts`,`fg_atts`,`fg_convs`,`fg_convs_details`,`fg_long`,`fg_missed_details`,`fgs_blocked`,`kick_ret_atts`,`kick_ret_long`,`kick_ret_long_is_td`,`kick_ret_tds`,`kick_ret_yds`,`kick_rets_over_40_yds`,`kick_rets_over_40_yds_for_td`,`punt_long`,`punt_ret_atts`,`punt_ret_fair_catches`,`punt_ret_long`,`punt_ret_long_is_td`,`punt_ret_tds`,`punt_rets_over_40_yds`,`punt_rets_over_40_yds_for_td`,`punt_return_yds`,`punt_returns`,`punt_touch_backs`,`punt_yds`,`punts`,`punts_blocked`,`punts_in_20`,`special_teams_fums`,`special_teams_fums_lost`,`special_teams_tkl_asts`,`special_teams_tkls`

Once you have added all your steps you should have a recipe that looks like below:

![ProjectRecipeComplete](/images/databrew-recipe-complete.png)

1. We now want to publish this recipe so we can use it in the job in the next step below to clean the data. Find the recipe **Publish** icon and click it. You should be presented wth the window below. For the **Version description** put in `Version 1` and click the **Publish** button to complete.

![ProjectRecipePublish](/images/databrew-recipe-publish.png)

1. Now that we have viewed the data set in DataBrew and have a recipe to remove columns and change a few data types we are ready to create a job to transform the data set and load into Amazon S3. Click the **Create Job** button in the toolbar on the right side of the page to continue.

![CreateJob](/images/databrew-create-job.png)

1. A few key details are needed to create the job. Put `nfl-stats-clean` as the name in the **Job name** textbox, verify you have the correct data set in DataBrew and for **Job Output Settings** select `CSV` for **File Type**,  find the bucket created in the CDK output param `WorkingBucket` and add the prefix `football/nfl/stats/` in the **S3 Location** leaving the defaults for the other options.

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
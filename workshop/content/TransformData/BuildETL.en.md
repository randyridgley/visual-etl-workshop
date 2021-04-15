+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Build ETL with Glue Studio"
date = 2019-09-09T17:42:10+01:00
weight = 10
+++

### Visually build ETL with AWS Glue Studio

#### Background
Creating ETL historically has been very time consuming, brittle, and typically created by hand from a highly skilled programmer in laguages like Python and Scala. AWS Glue uses serverless spark containers to run ETL jobs. With AWS Glue Studio you no longer need to hand code yuour ETL jobs making it easier to build, less error prone, and reduces the time it takes from idea to completion in transforming, cleaning, and joining data in your data lake.

#### High-Level Instructions
In this module we will walk through creating a Spark ETL job visually using AWS Glue Studio. We will join all 3 tables we discovered and managed in the prior sections to create a single data set containing the stats for all offensive players in the NFL over the last severals years.

**:white_check_mark: Step-by-step directions**

1. Open the AWS Glue console and click the **AWS Glue Studio** link in the left hand navigation pane. This takes you to the Glue Studio console and if the left hand navigation is collapsed click the 3 line icon to open the pane.
2. From the left hand navigation click on the **Connectors** link to bring up the custom connectors in your account. The CDK script you ran in the [Setup][setup] section created a custom connector to provide the ability to connect to [Snowflake][snowflake]. If you scroll to the center of the page you will see the `snowflake-jdbc-glue-connector` custom connector that was created. If you decide to do the optional part of this workshop you will need you Snowflake account information to proceed.

{{% notice note %}}
AWS Glue Studio has the ability to use multiple data sources through **Connectors**. You can use connectors in the AWS Marketplace or build your own custom connectors. For more information you can check out the [documentation](https://docs.aws.amazon.com/glue/latest/ug/connectors-chapter.html) to build your own. The AWS Marketplace contains connectors for many popular database platforms like SAP, Salesforce, CloudWatch Logs, and more.
{{% /notice %}}

3. Let's get to work and start building our first ETL job in Glue Studio. On the left hand navigation click on the **Jobs** link.
4. In the **Create job** section select the `Blank graph` radio button and click the **Create** button.

![BlankJob](/images/blank-job-graph.png)

5. This will take you to the Glue Studio IDE and you are now ready to start building your ETL jobs. The IDE has a top level toolbar containing the widgets for connecting to **Source** data sources, **Transforms**, and **Target** data sources. As you click on each widget you wibe asked to fill out a node properties window each step of the way on the right hand side. Name the job by double-cliking the `Unititled job` label and name it `nfl-stats-job`.
6. From the **Sources** drop down menu select `S3`. In the node properties window select the **Node Properties** tab and in the **Name** textbox type `players`.
7. Click the **Data source properties - S3** tab
   1.  **S3 source type** leave the `Data Catalog` option selected as we have already populated the Glue Dtaa Catalog with the raw tables.
   2.  **Database** select `nfl`.
   3.  **Table** select `players`.
   4.  Optionally, you can click the **Output schema** tab to see what will be available for next steps that connect to this source.
8.  Repeat Steps 6 and 7 for the `teams` and `stats` tables. Once complete, your console should look like below:

![GlueSources](/images/glue-sources.png)

9. Next, prefix the column names for the `players` and `teams` tables to ensure they will be distinct column names when joining to the `stats` table. In order to do this we will use the **Apply Mappings** transform from the **Transforms** dropdown menu.

![ApplyMapping](/images/glue-apply-mapping.png)

* On the **Node Properties** tab select the following:
  * **Name** type `PlayersApplyMapping`
  * **Node parents** select the `Players` node you created above.
* On the **Transform** tab rename each column by prefixing the column name in the `Target Key` textboxes with a `p_` for example change `firstname` to `p_firstname`. Repeat for all columns. If we wanted to change data types or drop columns we could do this with this transform as well.
* For the `teams` **Apply Mapping** transform use the `t_` for the prefix.

If you are keeping up, your graph should look like this.

![ApplyMapping](/images/glue-apply-mapping-complete.png)

10.  Now let's reduce the number of columns in the `stats` table even further. From the **Transform** drop down choose the **Select Fields** transform.

* On the **Node Properties** tab select the following:
  * **Name** type `SelectPassingFields`
  * **Node parents** select the `Stats` node you created above.
* On the **Transform** tab select the fields below:
  * We want to only return quarterback passing stats. `is_game_played`, `is_game_started`, `player_id`, `team_id`, `week`, and all fields that start with `pass_`.

![SelectFields](/images/glue-select-fields.png)

11. Let's start joining the data together now that we have initially cleaned up the columns and reduced the data. From the **Transform** dropdown select the **Join** transform.

* On the **Node Properties** tab select the following:
  * **Name** type `JoinTeamsAndStats`
  * **Node parents** select the `TeamsApplyMapping` and `SelectPassingFields` nodes.
* On the **Transform** tab we are going to join together the two data sets.
  * **Join Type** choose `Inner join`. You have familiar options like left, inner, right.
  * **Join conditions** we are going to choose `team_id` for the **SelectPassingFields** and `t_teamid` for the **TeamsApplyMapping** nodes respectively.

![JoinTeams](/images/glue-join-teams.png)
  
12.  Let's continue joining the data together. From the **Transform** dropdown select the **Join** transform.

* On the **Node Properties** tab select the following:
  * **Name** type `JoinPlayersTeamsAndStats`
  * **Node parents** select the `PlayersApplyMapping` and `JoinTeamsAndStats` nodes.
* On the **Transform** tab we are going to join together the two data sets.
  * **Join Type** choose `Inner join`. You have familiar options like left, inner, right.
  * **Join conditions** we are going to choose `player_id` for the **JoinTeamsAndStats** and `t_teamid` for the **PlayersApplyMapping** nodes respectively.

![JoinPlayers](/images/glue-join-players.png)

13. At this point, we have all the data joined for all teams and players. We want to filter the data set to only include the quarterbacks from the data set. The `p_position_id` will be used to filter the data set and the `p_position_id` for quarterbacks is `8`.

From the **Transform** dropdown select the **Filter** transform.

* On the **Node Properties** tab select the following:
  * **Name** type `FilterQuarterbacks`
  * **Node parents** select the `JoinPlayersTeamsAndStats` node.
* On the **Transform** tab we are going to join together the two data sets.
  * **Filter** leave `Global AND` as the default.
  * Click the **Add Condition** button and in the **Filter condition** key will be `p_position_id`, operation `=`, and value `8`.

{{% notice note %}}
Great discussion could be had over doing this step earlier in the process to reduce the amount of data joined and it does depend on how large your data sets are you are working with. Reducing data before joins is always a best practice, but in this case the data sets are small and have little impact. 
{{% /notice %}}

![FilterQBs](/images/glue-filter-quarterbacks.png)

14. We now have the data set we want that has joined all three raw tables `players`, `teams`, and `stats`, filtered the data to only quarterback stats and are now ready to save the new data set. We have many options here. For this lab, you will either persist to **S3** or if you have your **Snowflake** environment up and running you can pesist there. Time to choose your own adventure!

#### S3

From the **Target** dropdown select the `S3` target.

* On the **Node Properties** tab select the following:
  * **Name** type `QuarterbackStats`
  * **Node parents** select the `FilterQuarterbacks` node.
* On the **Data target properties - S3** tab we are to perist to S3.
  * **Format** select the `GlueParquet` type.
  * **Compression Type** choose `Snappy`.
  * **S3 Target Location** find the bucket from the CDK output parameter for `WorkingBucket` and browse down to the `nfl` prefix and choose it. Once the value is added to the textbox go to the end and add another prefix `quarterback_stats/` ex. `s3://${WorkingBucket}/football/nfl/quarterback_stats/`.
  * **Data Catalog update options** for this option we want to select `Create a table in the Data Catalog and on subsequent runs, update the schema and add new partitions`. This option will automatically create the new table in AWS Glue Data Catalog for us and on subsuquent runs update the partitions and schema as it changes.
  * **Database** select `nfl` from the dropdown.
  * **Table name** in the textbox type `quarterback_stats`.

![S3Target](/images/glue-s3-target.png)

Now that you have the S3 target setup you can jump down to the Job Details section to continue.

#### Snowflake

From the **Target** dropdown select the `snowflake-jdbc-glue-connector` target.

* On the **Node Properties** tab select the following:
  * **Name** type `QuarterbackStatsSnowflake`
  * **Node type** if not selected select `snowflake-jdbc-glue-connector`
  * **Node parents** select the `FilterQuarterbacks` node.
* On the **Data target properties** tab we are to perist to Snowflake.
  * **Connection** select the connection you created earlier named `snowflake-jdbc-glue-connection`.
  * **Table** type `quarterback_stats` in the textbox.

![Snowflake](/images/glue-snowflake-target.png)

#### Job Details

You are now almost done creating the ETL job. The last thing we need to do is verify the **Job Details**. Click on the **Job Details tab in the toolbar at the top.

Let's set the values for the form below:

* **Name** type `nfl-stats-job` in the textbox if it's not already there.
* **Description** type `NFL Quarterback filter job` in the textbox.
* **IAM Role** find the role from the CDK script in the dropdown, ex. `GlueStudioSnowflakeStack-GlueExecutionRole9B3FD381-1K9RRPKN4SOBH`
* Leave the defaults for **Type**, **Glue version**, **Language**, **Worker type**, **Number of workers**, **Job timeout (minutes)**
* **Job Bookmark** select `Disable` for this job. Job Bookmarks are a mechanism to track which set of files have been used in a job so you can pick up only new files in subsequent runs.

Your job details should look similiar to the images below:

![JobDetails1](/images/glue-job-details-1.png)

![JobDetails2](/images/glue-job-details-2.png)

Before we save the job, we want to make a few more adjustments. Find the **Additional Details** dropdown and click the arrow to show the additional configuration options.

![JobDetailsAdv](/images/glue-job-details-adv.png)

#### Code output

On the **Script** tab you can see the final results of the ETL job. Glue Studio uses the Glue Framework to build out the Python script in this case, but it also support Scala as well bu changing the **Language** option in the **Job Details** tab. Your output in the **Script** tab should look similiar to below:

``` python

import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
import re

## @params: [JOB_NAME]
args = getResolvedOptions(sys.argv, ['JOB_NAME'])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)
## @type: DataSource
## @args: [database = "nfl", table_name = "cleaned_stats", transformation_ctx = "DataSource0"]
## @return: DataSource0
## @inputs: []
DataSource0 = glueContext.create_dynamic_frame.from_catalog(database = "nfl", table_name = "cleaned_stats", transformation_ctx = "DataSource0")
## @type: SelectFields
## @args: [paths = ["is_game_played", "is_game_started", "pass_atts", "pass_comps", "pass_first_downs", "pass_fums", "pass_fums_lost", "pass_ints", "pass_long", "pass_long_is_td", "pass_plays_over_20_yds", "pass_plays_over_20_yds_for_td", "pass_plays_over_30_yds", "pass_plays_over_30_yds_for_td", "pass_plays_over_40_yds", "pass_plays_over_40_yds_for_td", "pass_plays_over_50_yds", "pass_plays_over_50_yds_for_td", "pass_rating", "pass_targets", "pass_tds", "pass_yds", "pass_yds_per_att", "player_id", "team_id", "week"], transformation_ctx = "Transform4"]
## @return: Transform4
## @inputs: [frame = DataSource0]
Transform4 = SelectFields.apply(frame = DataSource0, paths = ["is_game_played", "is_game_started", "pass_atts", "pass_comps", "pass_first_downs", "pass_fums", "pass_fums_lost", "pass_ints", "pass_long", "pass_long_is_td", "pass_plays_over_20_yds", "pass_plays_over_20_yds_for_td", "pass_plays_over_30_yds", "pass_plays_over_30_yds_for_td", "pass_plays_over_40_yds", "pass_plays_over_40_yds_for_td", "pass_plays_over_50_yds", "pass_plays_over_50_yds_for_td", "pass_rating", "pass_targets", "pass_tds", "pass_yds", "pass_yds_per_att", "player_id", "team_id", "week"], transformation_ctx = "Transform4")
## @type: DataSource
## @args: [database = "nfl", table_name = "players", transformation_ctx = "DataSource2"]
## @return: DataSource2
## @inputs: []
DataSource2 = glueContext.create_dynamic_frame.from_catalog(database = "nfl", table_name = "players", transformation_ctx = "DataSource2")
## @type: ApplyMapping
## @args: [mappings = [("firstname", "string", "p_firstname", "string"), ("lastname", "string", "p_lastname", "string"), ("playerid", "long", "p_playerid", "long"), ("positionid", "long", "p_positionid", "long"), ("positionname", "string", "p_positionname", "string"), ("season", "long", "p_season", "long")], transformation_ctx = "Transform1"]
## @return: Transform1
## @inputs: [frame = DataSource2]
Transform1 = ApplyMapping.apply(frame = DataSource2, mappings = [("firstname", "string", "p_firstname", "string"), ("lastname", "string", "p_lastname", "string"), ("playerid", "long", "p_playerid", "long"), ("positionid", "long", "p_positionid", "long"), ("positionname", "string", "p_positionname", "string"), ("season", "long", "p_season", "long")], transformation_ctx = "Transform1")
## @type: DataSource
## @args: [database = "nfl", table_name = "teams", transformation_ctx = "DataSource1"]
## @return: DataSource1
## @inputs: []
DataSource1 = glueContext.create_dynamic_frame.from_catalog(database = "nfl", table_name = "teams", transformation_ctx = "DataSource1")
## @type: ApplyMapping
## @args: [mappings = [("location", "string", "t_location", "string"), ("nickname", "string", "t_nickname", "string"), ("season", "long", "t_season", "long"), ("teamid", "long", "t_teamid", "long")], transformation_ctx = "Transform0"]
## @return: Transform0
## @inputs: [frame = DataSource1]
Transform0 = ApplyMapping.apply(frame = DataSource1, mappings = [("location", "string", "t_location", "string"), ("nickname", "string", "t_nickname", "string"), ("season", "long", "t_season", "long"), ("teamid", "long", "t_teamid", "long")], transformation_ctx = "Transform0")
## @type: Join
## @args: [keys2 = ["t_teamid"], keys1 = ["team_id"], transformation_ctx = "Transform3"]
## @return: Transform3
## @inputs: [frame1 = Transform4, frame2 = Transform0]
Transform3 = Join.apply(frame1 = Transform4, frame2 = Transform0, keys2 = ["t_teamid"], keys1 = ["team_id"], transformation_ctx = "Transform3")
## @type: Join
## @args: [keys2 = ["p_playerid"], keys1 = ["player_id"], transformation_ctx = "Transform5"]
## @return: Transform5
## @inputs: [frame1 = Transform3, frame2 = Transform1]
Transform5 = Join.apply(frame1 = Transform3, frame2 = Transform1, keys2 = ["p_playerid"], keys1 = ["player_id"], transformation_ctx = "Transform5")
## @type: Filter
## @args: [f = lambda row : (row["p_positionid"] == 8), transformation_ctx = "Transform2"]
## @return: Transform2
## @inputs: [frame = Transform5]
Transform2 = Filter.apply(frame = Transform5, f = lambda row : (row["p_positionid"] == 8), transformation_ctx = "Transform2")
## @type: DataSink
## @args: [connection_type = "custom.jdbc", connection_options = {"dbTable":"quarterback_stats","connectionName":"snowflake-jdbc-glue-connection"}, transformation_ctx = "DataSink0"]
## @return: DataSink0
## @inputs: [frame = Transform2]
DataSink0 = glueContext.write_dynamic_frame.from_options(frame = Transform2, connection_type = "custom.jdbc", connection_options = {"dbTable":"quarterback_stats","connectionName":"snowflake-jdbc-glue-connection"}, transformation_ctx = "DataSink0")
job.commit()

```

Before we leave this module let's make sure we click the **Save** button in the top right hand corner. We are now ready to run the job and see the result it generated. Proceed to the next section to see how that is done.

[setup]: ../setup
[snowflake]: https://www.snowflake.com/
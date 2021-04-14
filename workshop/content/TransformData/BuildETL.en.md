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
  

[setup]: /setup
[snowflake]: https://www.snowflake.com/
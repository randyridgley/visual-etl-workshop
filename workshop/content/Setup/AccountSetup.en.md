+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Account Setup"
date = 2019-09-09T17:42:10+01:00
weight = 10
+++

## Region selection

Use a single region for the duration of this workshop. This workshop supports the following regions:

- us-west-2 (US West - Oregon)
- us-east-2 (US East - Ohio)
- us-east-1 (US East - Northern Virginia)
- eu-central-1 (Europe - Frankfurt)

Please select one of these in the top right corner.

![Step 3](/images/c9-step3.png)

## Starting AWS Cloud9 IDE

[AWS Cloud9][cloud9] is a cloud-based integrated development environment (IDE) that lets you write, run, and debug your code with just a browser. It includes a code editor, debugger, and terminal. Cloud9 comes pre-packaged with essential tools for popular programming languages and the AWS Command Line Interface (CLI) pre-installed so you don’t need to install files or configure your laptop for this workshop. 

Your Cloud9 environment will have access to the same AWS resources as the user with which you logged into the AWS Management Console. We strongly recommend using Cloud9 to complete this workshop.

**:white_check_mark: Step-by-step Instructions**

1. From the AWS Management Console, Select **Services** then select **Cloud9** under Developer Tools. 

![Step 4](/images/c9-step4.png)

2. Select **Create environment**.

3. Enter `visual-etl-development` into **Name** and optionally provide a **Description**.

![Step 5](/images/c9-step5.png)

4. Select **Next step**.

5. In **Environment settings**:
- Set the *Instance type* to **t2.micro (1 GiB RAM + 1 vCPU)**.
- Leave all other defaults unchanged.

![Step 6](/images/c9-step6-b.png)

6. Select **Next step**.

7. Review the environment settings and select **Create environment**. It will take a couple of minutes for your Cloud9 environment to be provisioned and prepared.

## Setting up Cloud9 IDE

1. Once ready, your IDE will open to a welcome screen. Below that, you should see a terminal prompt. Close the Welcome tab and drag up the terminal window to give yourself more space to work in. 

![Step 7](/images/c9-step7.png)

- You can run AWS CLI commands in here just like you would on your local computer. Remember for this workshop to run all commands within the Cloud9 terminal window rather than on your local computer.
- Keep your AWS Cloud9 IDE opened in a browser tab throughout this workshop.

2. Verify that your user is logged in by running the command `aws sts get-caller-identity`. Copy and paste the command into the Cloud9 terminal window. 

```console
aws sts get-caller-identity
```

- You'll see output indicating your account and user information:

```json
{
    "Account": "123456789012",
    "UserId": "AKIAIOSFODNN7EXAMPLE",
    "Arn": "arn:aws:iam::123456789012:user/Alice"
}
```

3. Let's clone the github repository for this workshop with the following command below in the terminal:

```console
git clone https://github.com/randyridgley/glue-studio-snowflake
```

Once complete you should have a folder in the explorer window named `glue-studio-snowflake`

### Create a Snowflake account

To get started with Snowflake, you need to set-up an account through the [Snowflake](https://www.snowflake.com/) website. You can create a free trial account for this exercise, but is outside of the scope of this document.

### Get the latest Snowflake driver

The first thing you will need to do is download the appropriate driver for connecting to Snowflake.

To download the driver:

Go to the Maven Central Repository [https://repo1.maven.org/maven2/net/snowflake/snowflake-jdbc](https://repo1.maven.org/maven2/net/snowflake/snowflake-jdbc)

The most recent version is not always at the end of the list. Versions are listed alphabetically, not numerically. For example, 3.10.x comes after 3.1.x, not after 3.9.x.

Download the snowflake-jdbc-#.#.#.jar file. (You do not need to download the entire directory.) From the `resources/code/infra` directory download the snowflake-jdbc-3.13.2 version in the terminal with the command below.

```console
wget -P lib/assets/ https://repo1.maven.org/maven2/net/snowflake/snowflake-jdbc/3.13.2/snowflake-jdbc-3.13.2.jar
```

### Run the CDK script

With your IDE now created and the code for the workshop loaded we will use the [AWS Cloud Development Kit (CDK)][cdk] to initially create resources needed throughout the workshop. For those of you not familiar with the CDK, it is an open source software development framework to define your cloud application resources using familiar programming languages. We will create resources like S3 buckets, IAM Policies and Roles, and Glue DataBrew recipes to save time on building out your Visual ETL pipelines.

Browse to the `resources/code/infra` folder in the terminal and execute the commands below and replace the `snowflake_account` value to your Snowflake account number:

```bash
    npm install
    cdk deploy -c snowflake_account=XXXXXXX
```

You will be asked to accept the changes to deploy enter `y` to continue deployment.

When the script is complete you will see outputs of the resources created below. Copy those to a scratch pad to be able to use them later.

```console
output [fill in output here]
```

### :star: Tips

:bulb: Keep an open scratch pad in Cloud9 or a text editor on your local computer for notes. When the step-by-step directions tell you to note something such as an ID or Amazon Resource Name (ARN), copy and paste that into your scratch pad.

### :star: Recap

:key: Use the same region for the entirety of this workshop.

:key: Keep your [AWS Cloud9 IDE](#starting-aws-cloud9-ide) opened in a browser tab

## Next steps

:white_check_mark: Now that you have launched and initialized Cloud9, wait for the workshop instructor to continue. If you are completing the workshop on your own, proceed to the [recap](../recap).

[cloud9]: https://aws.amazon.com/cloud9
[cdk]: https://aws.amazon.com/cdk/
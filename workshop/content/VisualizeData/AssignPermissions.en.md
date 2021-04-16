+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Assign Permissions"
date = 2019-09-09T17:42:10+01:00
weight = 10
+++

### Signup for QuickSight and allow access to S3 and Athena

If you don’t have Amazon Quicksight account enabled in your AWS Account follow the steps here.

1. Go to Quicksight console. You need go to us-east-1 N.Virginia for this setup.

![Quicksight](/images/quicksight-setup.png)

2. Select Add or remove from Security & permissions.

![Athena](/images/quicksight-security.png)

3. Check Amazon S3.

![Athena](/images/quicksight-s3.png)

4 Select your `WorkingBucket` bucket from the CDK script and Check Write permission for Athena Workgroup.

![Athena](/images/quicksight-select-s3.png)

4. Check Athena.

![Athena](/images/quicksight-athena.png)

do the same selection as before.

![Athena](/images/quicksight-select-athena.png)

{{% notice note %}}
If you use another bucket for Athena results, please add it to your selection.
{{% /notice %}}

5. Click on Update.

![Athena](/images/quicksight-update.png)

### Add QuickSight permissions to Lake Formation

1. Grant select on databases to your user or role on Quicksight. You will need to navigate to the AWS Lake Formation console and find the `nfl` Glue Database. Select the radio button on the row and click on teh **Actions** dropdown and sleect the `Grant` permissions link. In the **SAML and Amazon QuickSight users and roles** text box you will enter the role or user that you are using qith QuickSight and will look something like `arn:aws:quicksight:us-east-1:649037252677:user/default/rridgley` and for the **Table Permissions** check `Describe` and `Select`. Click the **Grant** button to provide access.

![Athena](/images/quicksight-grant-access.png)

You should now have all the required permissions to continue to visualize the `quarterback_stats` table.
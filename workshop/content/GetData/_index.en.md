+++
copyright = "Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved."
spdx-license-identifier = "CC-BY-SA-4.0"
title = "Get Data"
date = 2019-09-09T17:41:51+01:00
weight = 10
chapter = false
pre = "<b>1. </b>"
+++

In this module you will be become familiar with [AWS Data Exchange][data-exchange]. It makes it easy to find, subscribe to, and use third-party data in the cloud. Once subscribed to a data product, you can use the AWS Data Exchange API to load data directly into Amazon S3 and analyze it with a wide variety of AWS analytics and machine learning services. For this workshop we have choosen a free lmited dataset of NFL stats provided by StatPerform

![architecture](/images/data-exchange-arch.png)

The preceding diagram shows how AWS Data Exchange is used to browse, subscribe to, and copy 3rd party data into [Amazon S3][s3] for use once you agree to the publishers terms of service.

## Implementation Instructions

:heavy_exclamation_mark: Ensure you've completed the [Setup][setup] step before beginning
the workshop.

Each of the following sections provides an implementation overview and detailed, step-by-step instructions. The overview should provide enough context for you to complete the implementation if you're already familiar with the AWS Management Console or if you want to explore the services yourself without following a walkthrough.

[setup]: /setup
[data-exchange]: https://aws.amazon.com/data-exchange
[s3]: https://aws.amazon.com/s3


#! /bin/bash

export AWS_PROFILE=drakin
npm pack
aws s3 cp youtuz-api* s3://drakin-apps/youtuz-api/
rm -rf youtuz-api*
unset AWS_PROFILE
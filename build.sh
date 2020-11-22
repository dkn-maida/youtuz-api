#! /bin/bash
npm pack
mv youtuz-api* youtuz-api.tgz
aws s3 cp youtuz-api* s3://drakin-apps/youtuz-api/
rm -rf youtuz-api*

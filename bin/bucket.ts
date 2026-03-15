import { App } from 'aws-cdk-lib';
import { S3BucketStack } from '../src/main';

const app = new App();
new S3BucketStack(app, 'S3BucketStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
app.synth();

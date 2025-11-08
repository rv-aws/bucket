import { App, Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Bucket, BlockPublicAccess, BucketEncryption } from 'aws-cdk-lib/aws-s3';

export class S3BucketStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create S3 bucket with secure defaults
    new Bucket(this, 'MyExampleBucket', {
      bucketName: `my-example-bucket-${this.account}-${this.region}`,
      versioned: true,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY, // Use RETAIN for production
      autoDeleteObjects: true, // Only works with DESTROY removal policy
    });
  }
}

const app = new App();
new S3BucketStack(app, 'S3BucketStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
app.synth();
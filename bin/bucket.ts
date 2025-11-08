// app-stack.ts
import { App, Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BlockPublicAccess, BucketEncryption } from 'aws-cdk-lib/aws-s3';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Bucket(this, 'MyExampleBucket', {
      bucketName: `my-example-bucket-${this.account}-${this.region}`,
      versioned: true,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY, // Use RETAIN for production
      autoDeleteObjects: true, // Only works with DESTROY removal policy
    });    new Bucket(this, 'MyExampleBucket', {
      bucketName: `my-example-bucket-${this.account}-${this.region}`,
      versioned: true,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY, // Use RETAIN for production
      autoDeleteObjects: true, // Only works with DESTROY removal policy
    });
  }
}

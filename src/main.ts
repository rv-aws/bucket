import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BlockPublicAccess, BucketEncryption } from 'aws-cdk-lib/aws-s3';

export const WINDOWS_11_SETTINGS_BUCKET_NAME_PREFIX = 'windows-11-settings';

export class S3BucketStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Bucket(this, 'Windows11SettingsBucket', {
      bucketName: `${WINDOWS_11_SETTINGS_BUCKET_NAME_PREFIX}-${this.account}-${this.region}`,
      versioned: true,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY, // Use RETAIN for production
      autoDeleteObjects: true, // Only works with DESTROY removal policy
    });
  }
}

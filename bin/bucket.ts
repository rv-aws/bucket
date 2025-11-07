// app-stack.ts
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyBucket } from '../../reusable-cdk/my-bucket';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new MyBucket(this, 'ReusableBucket', { versioned: false });
  }
}

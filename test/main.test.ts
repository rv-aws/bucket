import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { S3BucketStack, WINDOWS_11_SETTINGS_BUCKET_NAME_PREFIX } from '../src/main';

test('Creates a Windows 11 settings bucket with secure defaults', () => {
  const app = new App();
  const stack = new S3BucketStack(app, 'test');

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketEncryption: {
      ServerSideEncryptionConfiguration: [
        {
          ServerSideEncryptionByDefault: {
            SSEAlgorithm: 'AES256',
          },
        },
      ],
    },
    BucketName: {
      'Fn::Join': [
        '',
        [
          `${WINDOWS_11_SETTINGS_BUCKET_NAME_PREFIX}-`,
          {
            Ref: 'AWS::AccountId',
          },
          '-',
          {
            Ref: 'AWS::Region',
          },
        ],
      ],
    },
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
    VersioningConfiguration: {
      Status: 'Enabled',
    },
  });
});

test('Snapshot', () => {
  const app = new App();
  const stack = new S3BucketStack(app, 'test');

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

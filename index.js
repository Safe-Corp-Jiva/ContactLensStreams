import pkg from 'aws-sdk';
import dotenv from 'dotenv';
const { Connect } = pkg;

dotenv.config();

async function associate () {
  const clientConfig = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

  const connect = new Connect(clientConfig);

  // Build request
  const request = {
    InstanceId: process.env.CONNECT_INSTANCE_ID ?? '',
    ResourceType: 'REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS',
    StorageConfig: {
      StorageType: 'KINESIS_STREAM',
      KinesisStreamConfig: {
        StreamArn: process.env.KINESIS_STREAM_ARN ?? '',
      },
    }
  };

  try {
    // Execute request
    const response = await connect.associateInstanceStorageConfig(request).promise();

    // Process response
    console.log(`raw response: ${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`Error calling associateInstanceStorageConfig. err.code: ${err.code},` +
      `err.message: ${err.message}, err.statusCode: ${err.statusCode}, err.retryable: ${err.retryable}`);
  }
}

associate().then(r => console.log('✅ Done')).catch(e => console.error("❌"));
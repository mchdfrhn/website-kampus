#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Error: file path argument is required.');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`Error: file not found: ${filePath}`);
  process.exit(1);
}

const bucket = process.env.BACKUP_S3_BUCKET || process.env.S3_BUCKET;
const prefix = (process.env.BACKUP_S3_PREFIX || 'postgres').replace(/^\/+|\/+$/g, '');
const region = process.env.BACKUP_S3_REGION || process.env.S3_REGION || 'us-east-1';
const endpoint = process.env.BACKUP_S3_ENDPOINT || process.env.S3_ENDPOINT || undefined;
const accessKeyId =
  process.env.BACKUP_S3_ACCESS_KEY_ID ||
  process.env.AWS_ACCESS_KEY_ID ||
  process.env.S3_ACCESS_KEY_ID;
const secretAccessKey =
  process.env.BACKUP_S3_SECRET_ACCESS_KEY ||
  process.env.AWS_SECRET_ACCESS_KEY ||
  process.env.S3_SECRET_ACCESS_KEY;
const storageClass = process.env.BACKUP_S3_STORAGE_CLASS || 'STANDARD';

if (!bucket) {
  console.error('Error: BACKUP_S3_BUCKET or S3_BUCKET is required.');
  process.exit(1);
}

if (!accessKeyId || !secretAccessKey) {
  console.error('Error: missing S3 credentials.');
  process.exit(1);
}

const key = prefix ? `${prefix}/${path.basename(filePath)}` : path.basename(filePath);

const client = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: Boolean(endpoint),
});

const fileStream = fs.createReadStream(filePath);

await client.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: fileStream,
    StorageClass: storageClass,
  }),
);

console.log(`Upload completed: s3://${bucket}/${key}`);

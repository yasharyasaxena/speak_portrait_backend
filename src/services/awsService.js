const { S3 } = require('aws-sdk');

const s3 = new S3();

const uploadToS3 = async (bucketName, key, file) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: file,
    };

    try {
        const data = await s3.upload(params).promise();
        return data;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
}

const copyToS3 = async (sourceBucket, sourceKey, destinationBucket, destinationKey) => {
    const copyParams = {
        Bucket: destinationBucket,
        CopySource: `${sourceBucket}/${sourceKey}`,
        Key: destinationKey,
    };

    try {
        const data = await s3.copyObject(copyParams).promise();
        return data;
    } catch (error) {
        console.error('Error copying to S3:', error);
        throw error;
    }
}

const deleteFromS3 = async (bucketName, key) => {
    const deleteParams = {
        Bucket: bucketName,
        Key: key,
    };
    try {
        const data = await s3.deleteObject(deleteParams).promise();
        return data;
    } catch (error) {
        console.error('Error deleting from S3:', error);
        throw error;
    }
}

const getFromS3 = async (bucketName, key) => {
    const getParams = {
        Bucket: bucketName,
        Key: key,
    };
    try {
        const data = await s3.getObject(getParams).promise();
        return data;
    } catch (error) {
        console.error('Error getting from S3:', error);
        throw error;
    }
}

const listObjectsInS3 = async (bucketName, prefix) => {
    const listParams = {
        Bucket: bucketName,
        Prefix: prefix,
    };
    try {
        const data = await s3.listObjectsV2(listParams).promise();
        return data;
    } catch (error) {
        console.error('Error listing objects in S3:', error);
        throw error;
    }
}

module.exports = { uploadToS3, copyToS3, deleteFromS3, getFromS3, listObjectsInS3 };
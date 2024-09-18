package com.form1099K.sdk.utils;

import com.form1099K.sdk.retrofit.ApiConfig;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.time.Duration;

public class AmazonS3Decryption {

    //  Get amazons3 pdf by filename
    public static byte[] getAmazonS3PdfByFileName(String fileUrl) {
        if (StringUtils.isValidString(fileUrl)) {
            String fileName = getFileName(fileUrl);
            if (StringUtils.isValidString(fileName))
                return getFilePathWithBucketNameUsingFileName(fileName);
        }
        return null;
    }

    // Find the File name for the specified directory
    private static String getFileName(String fileUrlL) {
        if (StringUtils.isValidString(fileUrlL)) {
            fileUrlL = fileUrlL.replaceAll("\\s+", "");
            return fileUrlL.replace(ApiConfig.AMAZON_S3_PATH, "");
        }
        return "";
    }

    //  Get file path with BUCKET_NAME using filename
    private static byte[] getFilePathWithBucketNameUsingFileName(String fileName) {
        byte[] toBytes = null;

        try {

            StaticCredentialsProvider staticCredentials = StaticCredentialsProvider
                    .create(AwsBasicCredentials.create(ApiConfig.AWS_ACCESS_KEY, ApiConfig.AWS_SECRET_KEY));

            S3Client s3Client = S3Client.builder()
                    .credentialsProvider(DefaultCredentialsProvider.create())
                    .region(Region.US_EAST_1)
                    .credentialsProvider(staticCredentials)
                    .build();

            S3Presigner presigner = S3Presigner.builder()
                    .credentialsProvider(DefaultCredentialsProvider.create())
                    .region(Region.US_EAST_1)
                    .credentialsProvider(staticCredentials)
                    .build();

            String bucketName = ApiConfig.BUCKET_NAME;

            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .sseCustomerAlgorithm("AES256")
                    .sseCustomerKey(ApiConfig.BASE64_KEY)
                    .build();

            GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofSeconds(3600)) // Set your desired expiration time in seconds
                    .getObjectRequest(getObjectRequest)
                    .build();

            String presignedUrl = presigner.presignGetObject(getObjectPresignRequest).url().toString();

            toBytes = s3Client.getObjectAsBytes(getObjectRequest).asByteArray();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return toBytes;
    }

}

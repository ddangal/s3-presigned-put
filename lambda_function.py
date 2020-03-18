import logging
import boto3
from botocore.client import Config
from botocore.exceptions import ClientError

bucket_name='s3-office-files-deependra'

region='ap-south-1'
signature_version='s3v4'
expiration = 3600
def lambda_handler(event,context):
    
    presigned_urls = {}
    
    filenames = event
    for file in filenames.keys():
        object_name = filenames[file]
        s3_client = boto3.client('s3',config=Config(signature_version=signature_version),region_name=region)
        try:
            response = s3_client.generate_presigned_url('put_object',
                Params={'Bucket': bucket_name,
                        'Key': object_name},
                ExpiresIn=expiration)
            presigned_urls[file] = response
        except ClientError as e:
            logging.error(e)
            return "Error while processing"+filenames[file]

    return presigned_urls

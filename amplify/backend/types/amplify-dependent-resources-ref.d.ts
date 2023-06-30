export type AmplifyDependentResourcesAttributes = {
  "api": {
    "bybusgraphql": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "bybusAuth": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "adminGroupRole": "string",
      "spGroupRole": "string"
    }
  },
  "function": {
    "AdminQueriese70dfc87": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "bybusS3": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}
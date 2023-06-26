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
  "storage": {
    "bybusS3": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}
export type AmplifyDependentResourcesAttributes = {
  "api": {
    "schemaGraphqlByBus": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "bybus": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "SPGroupRole": "string",
      "adminGroupRole": "string",
      "agencyGroupRole": "string",
      "customerGroupRole": "string",
      "officeGroupRole": "string"
    }
  },
  "storage": {
    "s3Bybus": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}
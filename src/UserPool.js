import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-west-1_wSf9nosKq',
    ClientId: '5579ursdk11d04f4bvp3qa3rm1'
};

export default new CognitoUserPool(poolData);
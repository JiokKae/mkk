import { gql } from "@apollo/client";

export const ME = gql`
	query Me {
		me {
			name
			id
		}
	}
`;

export const SINGIN = gql`
	mutation Signin($input: SigninInput!) {
		signin(input: $input) {
			me {
				name
				id
			}
			message
		}
	}
`;

export const SIGNOUT = gql`
	mutation Signout {
		signout
	}
`;

export const QUERIES_AFFECTED_BY_SIGN = [{ query: ME }];
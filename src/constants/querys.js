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

export const REGISTER_PROFILE = gql`
	mutation RegisterProfile($input: RegisterProfileInput!) {
		registerProfile(input: $input) {
			profile {
				character {
					name
					level
					itemLevel
					class
					server
					guild {
						name
					}
				}
				allow
			}
		}
	}
`;

export const UNREGISTER_PROFILE = gql`
	mutation UnregisterProfile($input: UnregisterProfileInput!) {
		unregisterProfile(input: $input) {
			success
		}
	}
`;

export const QUERIES_AFFECTED_BY_SIGN = [{ query: ME }];

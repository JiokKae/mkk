import { gql } from "@apollo/client";

export const ME = gql`
	query Me {
		me {
			name
			id
			roles
			profiles {
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

export const VOTINGS = gql`
	query Votings($ended: Boolean, $count: Int, $startDateTime: String) {
		votings(ended: $ended, count: $count, startDateTime: $startDateTime) {
			id
			title
			deadline
			items {
				id
				name
				limit
				characters {
					name
					level
					itemLevel
					class
					server
					guild {
						name
					}
				}
			}
		}
	}
`;

export const VOTE = gql`
	mutation Mutation($input: VoteInput!) {
		vote(input: $input) {
			success
		}
	}
`;

export const UNVOTE = gql`
	mutation Unvote($input: UnvoteInput!) {
		unvote(input: $input) {
			success
		}
	}
`;

export const CREATE_VOTING = gql`
	mutation CreateVoting($input: CreateVotingInput!) {
		createVoting(input: $input) {
			voting {
				id
				title
				deadline
				items {
					id
					name
					limit
					characters {
						name
						level
						itemLevel
						class
						server
						guild {
							name
						}
					}
				}
			}
		}
	}
`;

export const QUERIES_AFFECTED_BY_SIGN = [{ query: ME }];

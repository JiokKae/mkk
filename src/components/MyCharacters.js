import { useQuery } from "@apollo/client";
import { ME } from "../constants/querys";
import ProfileCard from "./ProfileCard";
import RegisterProfile from "./RegisterProfile";
import UnregisterCharacterModal from "./UnregisterCharacterModal";

export default function MyCharacters() {
	const { data, loading } = useQuery(ME);

	return (
		<>
			<h4>내 보유 캐릭터</h4>
			<RegisterProfile />
			<div id="userCharacters" className="row g-3">
				{loading
					? null
					: data.me.profiles.map(({ character, allow }) => (
							<ProfileCard
								key={character.name}
								character={character}
								allow={allow}
								closeButton={
									<UnregisterCharacterModal
										characterName={character.name}
									/>
								}
							/>
					  ))}
			</div>
			<hr />
		</>
	);
}

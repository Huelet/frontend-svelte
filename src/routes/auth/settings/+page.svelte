<script lang="ts">

	




import styles from "../../styles/Settings.module.css";


import { Header } from "../../components/header";
import { Modal, RingProgress } from "@mantine/core";
	


import { Avatar, BulletList, Upload, Location } from "@fdn-ui/icons-react";
import { Avatar as AvatarImage } from "../../components/avatar";
import Loader from "../../components/loader";
import { Card } from "@huelet/foundation-ui";
	
	
            },

const AuthSettings: NextPage = () => {
	const [loading, setLoading] = useState(true);
	const [cookie, setCookie] = useCookies(["_hltoken"]);
	const [username, setUsername] = useState("");
	const [bio, setBio] = useState("");
	const [pronouns, setPronouns]: any = useState([]);
	const [location, setLocation] = useState("");
	const [updatedBio, setUpdatedBio] = useState("");
	const [updatedPfp, setUpdatedPfp]: any | any = useState(null);
	const [updatedPronouns, setUpdatedPronouns] = useState("");
	const [updatedLocation, setUpdatedLocation] = useState("");
	const [privateAcct, setPrivateAcct] = useState(false);
	/* Modals */
	const [pfpModal, togglePfpModal] = useState(false);
	const [pronounsModal, togglePronounsModal] = useState(false);
	const [bioModal, toggleBioModal] = useState(false);
	const [locationModal, toggleLocationModal] = useState(false);
	/* loaders */
	const [pfpUploading, setPfpUploading] = useState(false);
	const [bioLoading, setBioLoading] = useState(false);
	const [pronounsLoading, setPronounsLoading] = useState(false);
	const [locationLoading, setLocationLoading] = useState(false);
	/* sounds */
	const [playBgSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Background.wav",
		{ volume: 1 }
	);
	const [playClickSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Hardware%20Fail.wav",
		{ volume: 1 }
	);
	const [playSubmitSound] = useSound(
		"https://cdn.huelet.net/assets/sounds/Windows%20Hardware%20Insert.wav",
		{ volume: 1 }
	);
	useEffect(() => {
		const token = cookie._hltoken;
		if (token) {
			fetch("https://api.huelet.net/auth/token", {
				method: "GET",
				mode: "cors",
				cache: "no-cache",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.response === "Success!") {
						setUsername(res.username);
					} else {
						console.log("error: ", res);
					}
				});
		}
		const getData = async () => {
			const bioData = await fetch(
				`https://api.huelet.net/auth/bio?username=${username}`,
				{
					method: "GET",
					mode: "cors",
					cache: "no-cache",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const bioDataJSON = await bioData.json();
			setBio(bioDataJSON.bio);
			const pronounData = await fetch(
				`https://api.huelet.net/auth/pronouns?username=${username}`,
				{
					method: "GET",
					mode: "cors",
					cache: "no-cache",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const pronounDataJSON = await pronounData.json();
			setPronouns(pronounDataJSON.pronouns || []);
			const locationData = await fetch(
				`https://api.huelet.net/auth/location?username=${username}`,
				{
					method: "GET",
					mode: "cors",
					cache: "no-cache",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const locationDataJSON = await locationData.json();
			setLocation(locationDataJSON.location);

			setLoading(false);
		};
		getData();
	}, [cookie._hltoken, username]);
	// calculate percentage
	const percentage = (partialValue, totalValue) => {
		return (100 * partialValue) / totalValue;
	};
	const submitNewPfp = async (event: any) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("avatar", updatedPfp);
		formData.append("username", username);
		const resp = await fetch("https://api.huelet.net/auth/pfp", {
			method: "PATCH",
			mode: "cors",
			cache: "no-cache",
			headers: {
				authorization: `Bearer: ${cookie._hltoken}`,
			},
			body: formData,
		});
		const respJSON = await resp.json();
		window.location.reload();
	};
	const submitNewBio = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const resp = await fetch("https://api.huelet.net/auth/bio", {
			method: "PATCH",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer: ${cookie._hltoken}`,
			},
			body: JSON.stringify({
				bio: updatedBio,
				username: username,
			}),
		});
		const data = await resp.json();
		window.location.reload();
	};
	const submitNewPronouns = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		fetch("https://api.huelet.net/auth/pronouns", {
			method: "PATCH",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer: ${cookie._hltoken}`,
			},
			body: JSON.stringify({
				pronouns: updatedPronouns.split("/"),
				username: username,
			}),
		});
		window.location.reload();
	};
	const submitNewLocation = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		fetch("https://api.huelet.net/auth/location", {
			method: "PATCH",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer: ${cookie._hltoken}`,
			},
			body: JSON.stringify({
				location: updatedLocation,
				username: username,
			}),
		});
		window.location.reload();
	};
	return (
		<SkeletonTheme baseColor="#4E4E4E" highlightColor="#686868">
			<div id="klausen">
				<Header username={username} />
				<Card title={"Settings"} full={true}>
					<div className={`${styles.profile}`}>
						<div className={`${styles.profileInner}`}>
							<div className={"flex"}>
								<div className={`${styles.profileImage}`}>
									{loading ? (
										<Skeleton width={128} height={128} circle={true} />
									

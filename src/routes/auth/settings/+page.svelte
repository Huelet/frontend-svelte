<script lang="ts">

	

import styles from "../../styles/Settings.module.css";
import { Header } from "../../components/header";
import { Modal, RingProgress } from "@mantine/core";
import { Avatar, BulletList, Upload, Location } from "@fdn-ui/icons-react";
import { Avatar as AvatarImage } from "../../components/avatar";
import Loader from "../../components/loader";
import { Card } from "@huelet/foundation-ui";
	

	
	export const load: LayoutLoad = async ({ fetch, params }) => {
	let { username } = params;

	username = username?.toLowerCase().replace('@', '');

	const creatorFetch = await fetch(`https://api.huelet.net/auth/user?username=${username}`);
	const user = (await creatorFetch.json()).data;
	const userVideosFetch = await fetch(
		`https://api.huelet.net/videos/search/fromcreator?creatorId=${user.uid}`
	);
	user.videos = (await userVideosFetch.json()).data;

	return {
		user: user
	};
};
	
	     
	
	
	

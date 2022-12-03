<script lang="ts">
import styles from "../../styles/Settings.module.css";
import { Header } from "../../components/header";
import { Modal, RingProgress } from "@mantine/core";
import { Avatar, BulletList, Upload, Location } from "@fdn-ui/icons-react";
import { Avatar as AvatarImage } from "../../components/avatar";
import Loader from "../../components/loader";
import { Card } from "@huelet/foundation-ui";
	
 
 };
	onMount(async () => {
		user = JSON.parse(localStorage.getItem('huelet:auth:user') as string) as User;
		accessibility = JSON.parse(
			localStorage.getItem('huelet:auth:accessibility') as string
		) as AccessibilitySettings;
		token = localStorage.getItem('huelet:auth:token') as string;
		if (!user || !token) return;
	});	

   </script>

<Meta title=" Settings | User Settings | Huelet" />
	
        <Card full={true} title="User Settings">
		
		

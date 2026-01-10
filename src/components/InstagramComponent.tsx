import React, { useState, useEffect } from "react";
import InstagramGrid from "./InstagramGrid";
import InstagramCarousel from "./InstagramCarousel";

interface InstagramPost {
	id: string;
	title: string;
	image: string;
	url: string;
	description?: string | string[];
}

const InstagramFeed: React.FC<{ posts: InstagramPost[] }> = ({ posts }) => {
	const [windowWidth, setWindowWidth] = useState(1200);

	useEffect(() => {
		// Set initial width on client
		setWindowWidth(window.innerWidth); // eslint-disable-line react-hooks/set-state-in-effect

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="">
			<div className="mx-auto px-4 lg:container">
				<h1 className="mb-[20px] w-full text-center text-h3 text-black sm:text-h2">
					Instagram Feed
				</h1>

				{windowWidth > 650 ? (
					<InstagramGrid posts={posts} />
				) : (
					<InstagramCarousel posts={posts} />
				)}
			</div>
		</div>
	);
};

const InstagramComponent = () => {

	const Posts: InstagramPost[] = [
		{
			id: "1",
			title: "keaweretail",
			image: "/Images/insta/1.webp",
			url: "https://www.instagram.com/p/DNJTIZQvKoZ/",
			description: "School’s in, but @sunteamix808 makes study time sweet. 🧋📚 Your tastiest study buddy is waiting! 🍓🥭💫  #sunteamix808 #keaweretail #ourkakaako #hawaiifoodie #freshfruits #studyspot #milkteatime #studybuddy",
		},
		{
			id: "2",
			title: "rainaiscrazy",
			image: "/Images/insta/2.webp",
			url: "https://www.instagram.com/p/DM37NwJvUxT/",
			description: "If you’re in Hawaii stop by @sunteamix808 for their delicious drinks and desserts 😋😋😋 the coconut pudding with mango is their newest item and is a. Must try 😍",
		},
		{
			id: "3",
			title: "sunteamix808",
			image: "/Images/insta/3.webp",
			url: "https://www.instagram.com/p/DQGiG2JDLR3/",
			description: "The Maui Wowie worth flying to Honolulu for.",
		},
		{
			id: "4",
			title: "sunteamix808",
			image: "/Images/insta/4.webp",
			url: "https://www.instagram.com/p/DMRqFkduaSP/",
			description: "Summer Time☀️☀️  Can’t miss this Watermelon Smoothie topped with premium salted cheese foam 💯💯💯  #smoothie #kakaako #honolulu #boba #fruit #souffle #milktea #summervibes☀️   We located @ 400 Keawe Suite 107‼️‼️",
		},
		{
			id: "5",
			title: "keaweretail",
			image: "/Images/insta/5.webp",
			url: "https://www.instagram.com/p/DF_djLQMMIx/",
			description: "🧋 Sips that hit just right—@sunteamix808 has all the flavors to keep you refreshed and happy. Come find your favorite today! 💛✨  #KeaweRetail #SunTeaMix808 #SipHappiness #MilkTeaLovers #BobaTea #OahuEats #OurKakaako #HawaiiVibes",
		},
		{
			id: "6",
			title: "sunteamix808",
			image: "/Images/insta/6.webp",
			url: "https://www.instagram.com/p/DS8Tfx2jKKw",
			description: "A sweet reminder and recap of 2025! Hoping for countless blessing and joy for the coming year. Happy holidays!!!",
		}
	];

	return <InstagramFeed posts={Posts} />;
};

export default InstagramComponent;

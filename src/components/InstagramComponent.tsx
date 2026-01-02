import React, { useState, useEffect, useRef } from "react";
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
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 1200,
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="">
			<div className="lg:container mx-auto px-4">
				<h1 className="text-h3 sm:text-h2 text-black w-full text-center mb-[20px]">
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
			image: "/Images/insta/1.jpg",
			url: "https://www.instagram.com/p/DNJTIZQvKoZ/",
			description: "School’s in, but @sunteamix808 makes study time sweet. 🧋📚 Your tastiest study buddy is waiting! 🍓🥭💫  #sunteamix808 #keaweretail #ourkakaako #hawaiifoodie #freshfruits #studyspot #milkteatime #studybuddy",
		},
		{
			id: "2",
			title: "onosoahu",
			image: "/Images/insta/2.gif",
			url: "https://www.instagram.com/reel/DNFY5NROp1j/",
			description: "🥥“Going COCO…”🥭  There’s a new dessert at one of my fave boba spots!😆 Sun Tea Mix in Kaka‘ako (near H Mart) is known for their drinks and fluffy soufflé pancakes—but they’re launching a new item this Friday, August 8 called Coco Mango🥥🥭 It’s like a coconut jelly with a silky tofu-like texture—lightly sweet from the coconut water and even better when you mix in the mango. I’m not even a big coconut fan and I loved it! There’s also a Classic Coco version without the mango if you prefer something simple! ✨ Launch Special: Get $2 off Coco Mango or Classic Coco from August 8–15 (preorders recommended!) And don’t forget to grab a drink while you’re there, like the…💛 Mango Charm – creamy, sweet & refreshing💖 Smoogurts – the Mango (my best friend’s pick!) and Strawberry (mine!) are both winners! 📍Parking in the H Mart or SALT lot—first hour free! Which one are you trying first: Coco Mango or Classic Coco?👇  Thank you @sunteamix808 for the invite!!🥹❤️  お気に入りのタピオカ屋さんに新しいデザートが登場！😆カカアコ（Hマートの近く）にあるサンティーミックス が、ドリンクやふわふわのスフレパンケーキで人気だけど8月8日（金） から新メニュー 「ココマンゴー」 が登場する🥥🥭 これはまるでココナッツゼリーと絹ごし豆腐のような食感で、ココナッツウォーターのほんのり甘さがあり、マンゴーを混ぜるとさらに美味しくなる！実は私、ココナッツはそんなに好きではないけどこれはハマった😍シンプル派の方には、マンゴーなしの 「クラシックココ」 もある！ ✨【発売記念スペシャル】8月8日～15日 の間、ココマンゴーまたは クラシックココが2ドルオフになる（事前予約おすすめ！） ついでに、ぜひドリンクもチェックしてみてね：💛 マンゴーチャーム： クリーミーで甘くて爽やか！💖 スムーグルトシリーズ ：マンゴー（親友のお気に入り）もストロベリー（私のお気に入り）もおすすめ！ 📍Hマートまたはソルトの駐車場が利用可能で、最初の1時間は無料🚗 どっちから食べてみたい？👇  ✨ Featured Items/紹介したアイテム✨  🥭Coco Mango/ココマンゴー, $8.99 (special price) 🥥Classic Coco/クラシックココ, $7.99 (special price) 🧋Mango Charm/ マンゴーチャーム, $7.99  📍Sun Tea Mix サンティーミックス  400 Keawe St Honolulu, HI 96813",
		},
		{
			id: "3",
			title: "sunteamix808",
			image: "/Images/insta/3.gif",
			url: "https://www.instagram.com/reel/DNFSD9ltxhX/",
			description: "Introducing!! Coco Mango!!! We're launching it Tomorrow!! 8th of August  It's at a discounted price during the first week of Launch🤙!!! Stop by!!   COCO MANGO CHALLENGE  1) Try our new Coco Mango 2) Post a photo or video on your Story Or on your Feed (posting on feed will get you extra points!!!) 3) Tag us or send a collab request   Get a Chance to win $50 Gift Card +3 FREE Coco Mangos!!  Dates: Aug 8-15   The winner will be announced on Aug 16!!  Find the location of our store from the link in our bio!!",
		},
		{
			id: "4",
			title: "sunteamix808",
			image: "/Images/insta/4.jpg",
			url: "https://www.instagram.com/p/DMRqFkduaSP/",
			description: "Summer Time☀️☀️  Can’t miss this Watermelon Smoothie topped with premium salted cheese foam 💯💯💯  #smoothie #kakaako #honolulu #boba #fruit #souffle #milktea #summervibes☀️   We located @ 400 Keawe Suite 107‼️‼️",
		},
		{
			id: "5",
			title: "keaweretail",
			image: "/Images/insta/5.jpg",
			url: "https://www.instagram.com/p/DF_djLQMMIx/",
			description: "🧋 Sips that hit just right—@sunteamix808 has all the flavors to keep you refreshed and happy. Come find your favorite today! 💛✨  #KeaweRetail #SunTeaMix808 #SipHappiness #MilkTeaLovers #BobaTea #OahuEats #OurKakaako #HawaiiVibes",
		},
		{
			id: "6",
			title: "sunteamix808",
			image: "/Images/insta/6.png",
			url: "https://www.instagram.com/p/DS8Tfx2jKKw",
			description: "A sweet reminder and recap of 2025! Hoping for countless blessing and joy for the coming year. Happy holidays!!!",
		}
	];

	return <InstagramFeed posts={Posts} />;
};

export default InstagramComponent;

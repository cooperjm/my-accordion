// Accordion.jsx
import React, { useState, useEffect } from 'react';
import styles from './Accordion.module.css';

const ITEMS = [
	{
		id: 'brand',
		title: 'Brand & Design',
		desc: 'At RingoFire, we create distinct brand identities through impactful design. Our Brand & Design team transforms every touchpoint—from logos and product packaging to web and retail displays—to tell your story with clarity and drive results. Blending creative strategy with consumer insight, we craft visual systems that build loyalty and spark growth, whether for new launches or established brands.',
		img: 'https://ringofire.com/wp-content/uploads/2025/10/brand_result.webp',
	},
	{
		id: 'photo',
		title: 'Photo & Video Production',
		desc: 'RingoFire’s Photo & Video Production team delivers results-driven, story-led visuals that help brands get noticed and drive engagement. We capture imagery for all channels—from studio and on-location shoots to social and retail campaigns—bringing your brand’s identity to life. Our in-house creators provide standout product photography, lifestyle storytelling, and cinematic videos tailored to showcase your unique purpose. With complete production services, we concept, script, film, and edit content that inspires action and grows your brand’s presence.',
		img: 'https://ringofire.com/wp-content/uploads/2025/10/production.webp',
	},
	{
		id: 'social',
		title: 'Social Media',
		desc: "At RingoFire, our Social Media team drives brand growth through engaging content, community management, and data-driven campaigns. We connect brands to their audiences with platform-specific strategies—from TikTok trends to LinkedIn thought leadership. Every post, organic or paid, is crafted to deliver measurable results and amplify your brand's story.",
		img: 'https://ringofire.com/wp-content/uploads/2025/10/social.webp',
	},
	{
		id: 'ads',
		title: 'Advertising & Media',
		desc: 'RingoFire’s Advertising & Media strategies deliver full-funnel campaigns that combine creative impact with precise audience targeting. We plan and execute integrated programs—including search, video, retail and social media, OTT/CTV, out-of-home and more—to reach consumers where they live, shop, and scroll, driving awareness, traffic, and ROI through programmatic buying, paid social, and retail promotions.',
		img: 'https://ringofire.com/wp-content/uploads/2025/10/Ads-Media-1_result.webp',
	},
	{
		id: 'web',
		title: 'Website Design & Development',
		desc: 'Our Website Development & Design team creates visually striking, high-performing websites. We use strategic UX, responsive design, and SEO best practices to deliver digital experiences that drive results. Need a product showcase, e-commerce platform, or brand site? RingoFire builds web solutions that define your brand identity and boost your online presence.',
		img: 'https://ringofire.com/wp-content/uploads/2025/10/Web-1_result.webp',
	},
	{
		id: 'field',
		title: 'Field Sales & Activations',
		desc: 'RingoFire’s Field Sales & Activations team connects brands to customers through real-world experiences. From in-store demos and events to national shopper marketing strategies, we turn moments into movements. Our team manages staffing, logistics, and reporting to ensure every activation builds awareness, drives trial, and sparks brand loyalty where it matters most—face to face.',
		img: 'https://ringofire.com/wp-content/uploads/2025/10/fieldsales.webp',
	},
	{
		id: 'pr',
		title: 'Public Relations',
		desc: 'Our Public Relations team positions brands as credible leaders through strategic storytelling. We secure press coverage, influencer engagement, and brand alliances that shape public perception. From managing product launches to navigating crises, RingoFire ensures brands earn attention, foster positive sentiment, and build lasting trust.',
		img: "https://ringofire.com/wp-content/uploads/2025/10/NISS_ChristmasPArade_24-11_result-scaled.webp",
	},
];

export default function Accordion() {
	// open panel (text & heading state)
	const [active, setActive] = useState(ITEMS[0].id);
	// image currently displayed
	const [displayed, setDisplayed] = useState(ITEMS[0].id);
	// fade flag for image (true = visible)
	const [imgLoaded, setImgLoaded] = useState(true);
	const [shouldAnimate, setShouldAnimate] = useState(false);

	useEffect(() => {
		setShouldAnimate(true);
	}, []);

	// fade-out -> swap image -> onLoad fade-in
	useEffect(() => {
		if (!shouldAnimate || active === displayed) return;
		setImgLoaded(false);
		const t = setTimeout(() => setDisplayed(active), 250);
		return () => clearTimeout(t);
	}, [active, displayed, shouldAnimate]);

	const displayedItem = ITEMS.find((i) => i.id === displayed);

	return (
		<div className={styles.container}>
			{/* Image */}
			<div className={styles.imageWrapper}>
				<img
					key={displayed}
					src={displayedItem.img}
					alt={displayedItem.title}
					className={`${styles.image} ${imgLoaded ? styles.loaded : ''}`}
					onLoad={() => setImgLoaded(true)}
					loading='lazy'
					decoding='async'
				/>
			</div>

			{/* Accordion */}
			<div className={styles.accordion}>
				{ITEMS.map((item) => {
					const isOpen = item.id === active;
					return (
						<div
							key={item.id}
							className={`${styles.panel} ${isOpen ? styles.open : ''}`}
						>
							<button
								id={`heading-${item.id}`}
								className={`${styles.heading} ${isOpen ? styles.active : ''}`}
								aria-expanded={isOpen}
								aria-controls={`panel-${item.id}`}
								onClick={() => setActive(item.id)}
							>
								<span className={styles.headingText}>{item.title}</span>
								{/* chevron removed */}
							</button>

							<div
								id={`panel-${item.id}`}
								role='region'
								aria-labelledby={`heading-${item.id}`}
								aria-hidden={!isOpen}
								className={`${styles.content} ${
									isOpen ? styles.contentOpen : ''
								}`}
							>
								<p>{item.desc}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

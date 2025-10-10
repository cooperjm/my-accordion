// Accordion.jsx
import React, { useState, useEffect } from 'react';
import styles from './Accordion.module.css';

const ITEMS = [
	{
		id: 'brand',
		title: 'Brand & Design',
		desc: 'Crafting unique brand identities with logos, style guides, and visual assets that resonate with your target audience.',
		img: 'https://ringofire1dev.wpenginepowered.com/wp-content/uploads/2025/04/Rectangle-62_result.webp',
	},
	{
		id: 'photo',
		title: 'Photo & Video Production',
		desc: "Producing high-quality photos and engaging video content from concept through post-production to showcase your brand's story.",
		img: 'https://ringofire1dev.wpenginepowered.com/wp-content/uploads/2025/04/Photo-Video-Production_result.webp',
	},
	{
		id: 'social',
		title: 'Social Media',
		desc: 'Developing and managing social strategies across platforms to boost engagement, grow followers, and drive conversions.',
		img: 'https://ringofire1dev.wpenginepowered.com/wp-content/uploads/2025/04/Social-Media_result.webp',
	},
	{
		id: 'ads',
		title: 'Advertising & Media',
		desc: 'Creating and executing targeted ad campaigns on digital and traditional channels to reach your ideal customers and maximize ROI.',
		img: 'https://ringofire1dev.wpenginepowered.com/wp-content/uploads/2025/04/Advertising-Media_result.webp',
	},
	{
		id: 'web',
		title: 'Website Development',
		desc: 'Designing and building responsive, performance-optimized websites that deliver seamless user experiences and drive business growth.',
		img: 'https://ringofire1dev.wpenginepowered.com/wp-content/uploads/2025/04/Website-Development_result.webp',
	},
	{
		id: 'field',
		title: 'Field Sales & Activations',
		desc: 'Planning and executing on-the-ground marketing activations and sales events to engage customers and amplify brand presence.',
		img: 'https://ringofire1dev.wpenginepowered.com/wp-content/uploads/2025/04/Field-Sales-Activations_result.webp',
	},
	{
		id: 'pr',
		title: 'Public Relations',
		desc: "Building and maintaining your brand's reputation through strategic media outreach, press releases, and influencer partnerships.",
		img: 'https://ringofire.com/wp-content/uploads/2025/10/NISS_ChristmasPArade_24-11_result-scaled.webp',
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

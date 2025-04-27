import React, { useState, useEffect, useRef } from 'react'
import styles from './Accordion.module.css'

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
    desc: 'Producing high-quality photos and engaging video content—from concept through post-production—to showcase your brand’s story.',
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
    id: 'webDev',
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
    desc: 'Building and maintaining your brand’s reputation through strategic media outreach, press releases, and influencer partnerships.',
    img: 'https://ringofire1dev.wpenginepowered.com/wp-content/uploads/2025/04/Public-Relations_result.webp',
  },
]

export default function Accordion() {
  // which panel is “open” (for headings & text)
  const [active, setActive] = useState(ITEMS[0].id)
  // which panel’s image we are _currently_ showing
  const [displayed, setDisplayed] = useState(ITEMS[0].id)
  // controls the fade class
  const [imgLoaded, setImgLoaded] = useState(false)
  const contentRef = useRef(null)

  // whenever you click a new panel:
  useEffect(() => {
    // 1) fade out the current image
    setImgLoaded(false)
    // 2) after the fade-out duration (500ms), swap in the new one
    const timeout = setTimeout(() => {
      setDisplayed(active)
    }, 250)
    return () => clearTimeout(timeout)
  }, [active])

  
  const displayedItem = ITEMS.find(item => item.id === displayed)

  return (
    <div className={styles.container}>
      {/* ─── Left: fade-out then fade-in image ───────────────── */}
      <div className={styles.imageWrapper}>
        <img
          src={displayedItem.img}
          alt={displayedItem.title}
          className={`${styles.image} ${imgLoaded ? styles.loaded : ''}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* ─── Right: accordion ───────────────────────────────── */}
      <div className={styles.accordion}>
        <h4 className={styles.subheading}>Our Capabilities</h4>
        {ITEMS.map(item => {
          const isOpen = item.id === active
          // measure the open panel’s height for slide
          const maxHeight = isOpen && contentRef.current
            ? `${contentRef.current.scrollHeight}px`
            : '0px'

          return (
            <div key={item.id} className={styles.item}>
              <button
                className={`${styles.header} ${isOpen ? styles.headerActive : ''}`}
                onClick={() => setActive(item.id)}
              >
                {item.title}
              </button>

              <div
                ref={isOpen ? contentRef : null}
                className={styles.content}
                style={{
                  maxHeight,
                  marginTop: isOpen ? '0.5rem' : '0',
                  paddingLeft: isOpen ? '1rem' : '0',
                }}
              >
                <p>{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

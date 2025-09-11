'use client'

import { useEffect, useRef } from 'react'

interface BackgroundMusicProps {
  paused: boolean
}

// Simple YouTube background player. It stays visually hidden but plays audio.
// It loops the same video and keeps a low volume.
export default function BackgroundMusic({ paused }: BackgroundMusicProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<any>(null)

  // Load IFrame API once
  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as any

    const onYouTubeIframeAPIReady = () => {
      if (!containerRef.current || playerRef.current) return
      playerRef.current = new w.YT.Player(containerRef.current, {
        width: '0',
        height: '0',
        videoId: 'ilUEfmoUCv0',
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: 'ilUEfmoUCv0',
          modestbranding: 1,
          fs: 0,
          rel: 0,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.setVolume(10) // volumen bajo
              if (!paused) e.target.playVideo()
              else e.target.pauseVideo()
            } catch {}
          },
        },
      })
    }

    // If API already present
    if (w.YT && w.YT.Player) {
      onYouTubeIframeAPIReady()
      return
    }

    // Inject script once
    const tagId = 'youtube-iframe-api'
    if (!document.getElementById(tagId)) {
      const tag = document.createElement('script')
      tag.id = tagId
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
    }
    (w as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady

    return () => {
      try {
        if (playerRef.current) {
          playerRef.current.destroy()
          playerRef.current = null
        }
      } catch {}
    }
  }, [])

  // Pause/Resume when prop changes
  useEffect(() => {
    try {
      if (!playerRef.current) return
      if (paused) playerRef.current.pauseVideo()
      else playerRef.current.playVideo()
    } catch {}
  }, [paused])

  return (
    <div
      aria-hidden
      style={{ position: 'fixed', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
    >
      <div ref={containerRef} />
    </div>
  )
}



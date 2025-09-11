'use client'

import { useEffect, useRef } from 'react'

interface YoutubePlayer {
  setVolume: (volume: number) => void
  playVideo: () => void
  pauseVideo: () => void
  destroy: () => void
}

interface YouTubePlayerConfig {
  width: string
  height: string
  videoId: string
  playerVars: Record<string, number | string>
  events: {
    onReady: (event: { target: YoutubePlayer }) => void
  }
}

interface BackgroundMusicProps {
  paused: boolean
}

// Simple YouTube background player. It stays visually hidden but plays audio.
// It loops the same video and keeps a low volume.
export default function BackgroundMusic({ paused }: BackgroundMusicProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<YoutubePlayer | null>(null)

  // Load IFrame API once
  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as Window & { 
      YT?: { 
        Player: new (container: HTMLElement, config: YouTubePlayerConfig) => YoutubePlayer
      }; 
      onYouTubeIframeAPIReady?: () => void 
    }

    const onYouTubeIframeAPIReady = () => {
      if (!containerRef.current || playerRef.current || !w.YT) return
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
          onReady: (e: { target: YoutubePlayer }) => {
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
    w.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady

    return () => {
      try {
        if (playerRef.current) {
          playerRef.current.destroy()
          playerRef.current = null
        }
      } catch {}
    }
  }, [paused])

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



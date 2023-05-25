import aramstatsPath from '../projects/threeTextures/aramStatsTexture.webp'
import steamPath from '../projects/threeTextures/steamTexture.webp'
import oscillaPath from '../projects/threeTextures/oscillaTexture.png'
import spotifyPath from '../projects/threeTextures/signTexture.webp'
import signPath from '../projects/threeTextures/signTexture.webp'

export default {
   spotify: {
      title: 'Spotify',
      timeline: ['2022', '2 months'],
      genre: ['UX/UI Design'],
      tech: ['Figma'],
      body: 'WOOOWWW',
      cover: spotifyPath,
      uValley: {
         r: 0/255,
         g: 54/255,
         b: 21/255,
      },
      uPeak: {
         r: 255/255,
         g: 255/255,
         b: 255/255,
      }
   },
   aramstats: {
      title: 'Aram Stats',
      timeline: ['2023', '4 months +'],
      genre: ['Web Development', 'UX/UI Design'],
      tech: ['MEVN Stack', 'D3.js', 'AWS', 'Figma'],
      body: `Aramstats is a full-stack website that parses a player's data pertaining to the ARAM game mode in League of Legends to provide insightful statistics.`,
      backgroundColor: 0x1f2a42,
      cover: aramstatsPath,
      uValley: {
         r: 28/255,
         g: 37/255,
         b: 56/255,
      },
      uPeak: {
         r: 255/255,
         g: 255/255,
         b: 255/255,
      }
   },
   steam: {
      title: 'Steam',
      timeline: ['2022', '2 months'],
      genre: ['UX/UI Design'],
      tech: ['Adobe Illustrator', 'Figma'],
      body: 'A case study and redesign of the Steam desktop application.',
      backgroundColor: 0x171a21,
      cover: steamPath,
      uValley: {
         r: 47/255,
         g: 70/255,
         b: 86/255,
      },
      uPeak: {
         r: 193/255,
         g: 232/255,
         b: 255/255,
      }
   },
   oscilla: {
      title: 'Oscilla',
      timeline: ['2022', '2 months'],
      genre: ['Graphic Design', 'Typography'],
      tech: ['Adobe Illustrator'],
      body: 'A display typeface that oscillates between thick strokes and thin serifs.',
      cover: oscillaPath,
      uValley: {
         r: 8/255,
         g: 30/255,
         b: 38/255,
      },
      uPeak: {
         r: 255/255,
         g: 255/255,
         b: 255/255,
      }
   },
   sign: {
      title: 'Hand Gestures',
      timeline: ['2021', '5 months'],
      genre: ['Illustration'],
      tech: ['Adobe Illustrator', 'Adobe Photoshop'],
      body: 'The process of drawing over 50 hand gesture illustrations for a book in public speaking.',
      cover: signPath,
      uValley: {
         r: 100/255,
         g: 100/255,
         b: 100/255,
      },
      uPeak: {
         r: 255/255,
         g: 255/255,
         b: 255/255,
      }
   },
}
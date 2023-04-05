import aramstatsPath from '../projects/threeTextures/aramstatsTexture.webp'
import steamPath from '../projects/threeTextures/steamTexture.webp'
import oscillaPath from '../projects/threeTextures/oscillaTexture.png'
import spotifyPath from '../projects/threeTextures/spotifyDeskTexture.webp'
import signPath from '../projects/threeTextures/signTexture.webp'

export default {
   aramstats: {
      title: 'Aram Stats',
      timeline: ['2023', '3 months'],
      genre: 'Web Development',
      tech: ['MEVN Stack', 'D3.js', 'AWS', 'Figma'],
      body: `Aramstats is a website that parses a player's ARAM data to provide insightful statistics.`,
      cover: aramstatsPath,
      uValley: {
         r: 31/255,
         g: 42/255,
         b: 66/255,
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
      genre: 'UX/UI Design',
      tech: ['Adobe Illustrator', 'Figma'],
      body: 'A case study and redesign of the Steam desktop application.',
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
      genre: 'Graphic Design, Typography',
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
   spotify: {
      title: 'Spotify',
      timeline: ['2022', '2 months'],
      genre: 'UX/UI Design',
      tech: ['Figma', 'Adobe Illustrator'],
      body: 'Simple designs added to Spotify Desktop to improve user experience.',
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
   sign: {
      title: 'Hand Gestures',
      timeline: ['2021', '5 months'],
      genre: 'Illustration',
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
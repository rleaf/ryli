import steamPath from '../projects/threeTextures/steamTexture.webp'
import oscillaPath from '../projects/threeTextures/oscillaTexture.png'
import spotifyPath from '../projects/threeTextures/spotifyTexture.webp'
import signPath from '../projects/threeTextures/signTexture.webp'

export default {
   steam: {
      title: 'Steam',
      timeline: ['2022', '2 months'],
      genre: 'UX/UI Case Study',
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
      tech: ['Adobe Illustrator'],
      body: 'Brief synopsis about spotify. Ooga booga, this is some filler to act as a placeholder while I work on the styling. It is almsot 1am and I should probably brush my teeth soon, but I am currently on a roll',
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
      body: 'Brief synopsis about spotify. Ooga booga, this is some filler to act as a placeholder while I work on the styling. It is almsot 1am and I should probably brush my teeth soon, but I am currently on a roll',
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
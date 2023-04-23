export const floatUpFadeOut = {
  default: {
    from: { 
      y: 0,
      opacity: 1,
    },
  },

  frames: {
    styles: [
      {
        from: { 
          y: 0,
          opacity: 1,
        },
        to: { 
          y: -50,
          opacity: 0,
        },
      }
    ],
    keyframes: [0],
  }
}
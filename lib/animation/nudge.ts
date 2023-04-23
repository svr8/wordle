const NUDGE_KEYFRAME_DURATION_MILLISECONDS = 80

export const nudgeAnimation = {
  defaultStyle: {
    from: {
      left: 0
    }
  },

  frames: {
    styles: [
      {from: {left: 0}, to: {left: -20}, config: {duration: NUDGE_KEYFRAME_DURATION_MILLISECONDS}},
      {from: {left: -20}, to: {left: 0}, config: {duration: NUDGE_KEYFRAME_DURATION_MILLISECONDS}},
      {from: {left: 0}, to: {left: 20}, config: {duration: NUDGE_KEYFRAME_DURATION_MILLISECONDS}},
      {from: {left: 20}, to: {left: 0}, config: {duration: NUDGE_KEYFRAME_DURATION_MILLISECONDS}},
    ],

    keyframes: Array(4).fill(0).map((_, i) => i*NUDGE_KEYFRAME_DURATION_MILLISECONDS)
  }
}
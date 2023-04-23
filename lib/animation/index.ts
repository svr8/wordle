export const execAnimationKeyframes = (animationConfig: any, animationStyleAPI: any) => {
  animationConfig.frames.keyframes.map((timestamp: number, index: number) => {
    setTimeout(() => {
      animationStyleAPI.start(animationConfig.frames.styles[index])
    }, timestamp)
  })
}
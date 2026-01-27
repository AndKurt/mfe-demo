declare module 'shared-redux' {
  export * from '../shared-redux/dist'
}

// Для Module Federation
declare const __webpack_share_scopes__: any

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.sass' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.less' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.jpeg' {
  const value: string
  export default value
}

declare module '*.gif' {
  const value: string
  export default value
}

declare module '*.webp' {
  const value: string
  export default value
}

declare module '*.ico' {
  const value: string
  export default value
}

declare module '*.bmp' {
  const value: string
  export default value
}

declare module '*.ttf' {
  const value: string
  export default value
}

declare module '*.woff' {
  const value: string
  export default value
}

declare module '*.woff2' {
  const value: string
  export default value
}

declare module '*.eot' {
  const value: string
  export default value
}

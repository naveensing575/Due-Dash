import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    // Add your custom theme properties here
    borderRadius: string
    color: string
  }
}

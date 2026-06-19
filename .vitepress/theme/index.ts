import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Image from './components/image.vue'
import './language.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Image', Image)
  },
} satisfies Theme
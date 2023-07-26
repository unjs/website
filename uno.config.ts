import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({}),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Nunito:400,500,600,700,800',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})

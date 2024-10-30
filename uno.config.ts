import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none px-4 py-2 shadow c-#fafafa disabled:pointer-events-none bg-#18181b hover:bg-#18181b/90 disabled:opacity-50'],

    ['btn-outline', 'btn [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-(1 solid #e4e4e7) bg-transparent shadow-sm hover:bg-#f4f4f5 hover:c-#18181b c-#09090B'],

    ['input', 'b-(1 solid #e4e4e7) p-(x-3 y-2) rounded-md focus:outline-none focus:ring-(2 #18181b offset-2) disabled:cursor-not-allowed disabled:opacity-50'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetWebFonts({
      fonts: {
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})

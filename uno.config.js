import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  shortcuts: [
    [
      'btn',
      'b-0 shadow-md rounded cursor-pointer bg-gray-2 transition-100 hover:shadow-lg hover:bg-gray-1 active:bg-gray-3'
    ]
  ],
  presets: [presetUno(), presetAttributify(), presetIcons()]
})

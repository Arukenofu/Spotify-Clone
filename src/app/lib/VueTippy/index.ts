import VueTippy, { type TippyPluginOptions } from 'vue-tippy'

import './styles/index.scss'

const VueTippyConfig: TippyPluginOptions = {
  directive: 'tooltip',
  defaultProps: {
    theme: 'tooltip',
    arrow: false,
    interactiveBorder: 7,
    popperOptions: {
      modifiers: [{
        name: 'preventOverflow',
        options: {
          altAxis: true,
          padding: 8,
        },
      }],
    },
  },
}

export {
  VueTippy,
  VueTippyConfig,
}

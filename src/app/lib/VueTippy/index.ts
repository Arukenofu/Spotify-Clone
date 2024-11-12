import './styles/index.scss'

import VueTippy, {type TippyPluginOptions} from 'vue-tippy'

const VueTippyConfig: TippyPluginOptions = {
    directive: 'tooltip',
    defaultProps: {
        theme: 'spotify',
        arrow: false,
        interactiveBorder: 7,
        popperOptions: {
            modifiers: [{
                name: 'preventOverflow',
                options: {
                    altAxis: true,
                    padding: 8
                }
            }]
        }
    },
}

export {
    VueTippy,
    VueTippyConfig
}
import {VueQueryPlugin, type VueQueryPluginOptions} from '@tanstack/vue-query';

const VueQueryPluginConfig: VueQueryPluginOptions = {
    enableDevtoolsV6Plugin: true,
    queryClientConfig: {
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    }
}

export {VueQueryPlugin, VueQueryPluginConfig};
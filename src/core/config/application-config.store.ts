import { defineStore } from 'pinia'
import { ApplicationConfigAdapter } from './application-config.adapter'
import type { ApplicationConfig } from './application-config.model'

export const useApplicationConfigStore = defineStore({
  id: 'applicationConfigStore',
  state: () => ({
    config: null as ApplicationConfig | null,
    applicationConfigAdapter: new ApplicationConfigAdapter()
  }),
  getters: {},
  actions: {
    _test_replacApplicationConfigAdapter(adapter: ApplicationConfigAdapter) {
      this.applicationConfigAdapter = adapter
    },
    async loadApplicationConfig() {
      await this.applicationConfigAdapter
        .loadApplicationConfig()
        .then((_) => {
          this.config = _
        })
        .then(
          () =>
            /*
          For easy access from adapters also expose the base urls to window.
          Config is asserted to be not null since if not it's bound to fail anyways..
        */
            (window.baseUrls = this.config!.baseUrls || null)
        )
    }
  }
})

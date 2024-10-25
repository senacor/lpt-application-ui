import type { ApplicationConfig } from './application-config.model'
import axios from 'axios'

export class ApplicationConfigAdapter {
  loadApplicationConfig = (): Promise<ApplicationConfig | null> =>
    axios
      .get<ApplicationConfig>(`${import.meta.env.VITE_BASE_PATH}config.json`)
      .then(_ => _?.data || null)
}

import axios from 'axios'
import type { ApplicationConfig } from './application-config.model'

export class ApplicationConfigAdapter {
  loadApplicationConfig = (): Promise<ApplicationConfig | null> =>
    axios.get<ApplicationConfig>(`${import.meta.env.VITE_BASE_PATH}config.json`).then((_) => _?.data || null)
}

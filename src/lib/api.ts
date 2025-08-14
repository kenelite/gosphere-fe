import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
})

api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    const message = err?.response?.data?.message || err.message || 'Request failed'
    return Promise.reject(new Error(message))
  }
)

// Types based on backend README
export interface Tenant {
  id: number
  name: string
  namespace: string
  cpuLimit?: string
  memoryLimit?: string
  createdAt?: string
}

export interface CanaryWeightRequest {
  namespace: string
  service: string
  stableWeight: number
  canaryWeight: number
}

export interface SwimlaneHeaderRequest {
  namespace: string
  ingress: string
  host: string
  headerName: string
  headerValue: string
}

export interface BlueGreenSwitchRequest {
  namespace: string
  ingress: string
  host: string
  path: string
  targetService: string
}

export interface HPARequest {
  namespace: string
  deployment: string
  minReplicas: number
  maxReplicas: number
  targetCPUUtilizationPercentage: number
}

export interface VPARequest {
  namespace: string
  targetRefKind: string
  targetRefName: string
  updateMode?: 'Auto' | 'Off' | 'Initial' | 'Recreate'
}

export interface HarborGateSyncRequest {
  project: string
  repository: string
  reference: string
  appName: string
  appNamespace: string
}

export const TenantAPI = {
  list: async (): Promise<Tenant[]> => {
    const { data } = await api.get('/v1/tenants')
    if (Array.isArray(data)) return data
    // Normalize common backend shapes
    if (Array.isArray((data as any)?.items)) return (data as any).items
    if (Array.isArray((data as any)?.tenants)) return (data as any).tenants
    if (Array.isArray((data as any)?.list)) return (data as any).list
    return []
  },
  create: async (tenant: Omit<Tenant, 'id' | 'createdAt'>): Promise<Tenant> => {
    const { data } = await api.post('/v1/tenants', tenant)
    return data
  },
  remove: async (id: number): Promise<void> => {
    await api.delete(`/v1/tenants/${id}`)
  }
}

export const DeployAPI = {
  canaryWeight: async (payload: CanaryWeightRequest) => {
    const { data } = await api.post('/v1/deploy/canary/weight', payload)
    return data
  },
  swimlaneHeader: async (payload: SwimlaneHeaderRequest) => {
    const { data } = await api.post('/v1/deploy/swimlane/header', payload)
    return data
  },
  bluegreenSwitch: async (payload: BlueGreenSwitchRequest) => {
    const { data } = await api.post('/v1/deploy/bluegreen/switch', payload)
    return data
  }
}

export const AutoscalingAPI = {
  hpa: async (payload: HPARequest) => {
    const { data } = await api.post('/v1/autoscaling/hpa', payload)
    return data
  },
  vpa: async (payload: VPARequest) => {
    const { data } = await api.post('/v1/autoscaling/vpa', payload)
    return data
  }
}

export const HarborAPI = {
  gateSync: async (payload: HarborGateSyncRequest) => {
    const { data } = await api.post('/v1/cicd/harbor-gate-sync', payload)
    return data
  }
}


import { describe, it, expect, vi, beforeEach } from 'vitest'
import { api, TenantAPI, DeployAPI, AutoscalingAPI, HarborAPI } from './api'

describe('API client', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('lists tenants', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ data: [{ id: 1, name: 't1', namespace: 'ns1' }] } as any)
    const res = await TenantAPI.list()
    expect(res[0].name).toBe('t1')
    expect(spy).toHaveBeenCalledWith('/v1/tenants')
  })

  it('creates tenant', async () => {
    const spy = vi.spyOn(api, 'post').mockResolvedValue({ data: { id: 2 } } as any)
    const res = await TenantAPI.create({ name: 't2', namespace: 'ns2' } as any)
    expect(res.id).toBe(2)
    expect(spy).toHaveBeenCalledWith('/v1/tenants', expect.any(Object))
  })

  it('deploy canary weight', async () => {
    const spy = vi.spyOn(api, 'post').mockResolvedValue({ data: { ok: true } } as any)
    const res = await DeployAPI.canaryWeight({ namespace: 'ns', service: 'svc', stableWeight: 90, canaryWeight: 10 })
    expect(res.ok).toBe(true)
    expect(spy).toHaveBeenCalledWith('/v1/deploy/canary/weight', expect.any(Object))
  })

  it('autoscaling hpa', async () => {
    const spy = vi.spyOn(api, 'post').mockResolvedValue({ data: { ok: true } } as any)
    const res = await AutoscalingAPI.hpa({ namespace: 'ns', deployment: 'd', minReplicas: 1, maxReplicas: 3, targetCPUUtilizationPercentage: 60 })
    expect(res.ok).toBe(true)
    expect(spy).toHaveBeenCalledWith('/v1/autoscaling/hpa', expect.any(Object))
  })

  it('harbor gate sync', async () => {
    const spy = vi.spyOn(api, 'post').mockResolvedValue({ data: 'ok' } as any)
    const res = await HarborAPI.gateSync({ project: 'p', repository: 'r', reference: 'v1', appName: 'app', appNamespace: 'argocd' })
    expect(res).toBe('ok')
    expect(spy).toHaveBeenCalledWith('/v1/cicd/harbor-gate-sync', expect.any(Object))
  })
})


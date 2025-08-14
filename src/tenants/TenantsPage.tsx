import React from 'react'
import { Tenant, TenantAPI } from '../lib/api'

export const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = React.useState<Tenant[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [form, setForm] = React.useState({ name: '', namespace: '', cpuLimit: '', memoryLimit: '' })
  const [creating, setCreating] = React.useState(false)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await TenantAPI.list()
      setTenants(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { void load() }, [load])

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError(null)
    try {
      const payload = {
        name: form.name,
        namespace: form.namespace,
        cpuLimit: form.cpuLimit || undefined,
        memoryLimit: form.memoryLimit || undefined
      }
      await TenantAPI.create(payload as any)
      setForm({ name: '', namespace: '', cpuLimit: '', memoryLimit: '' })
      await load()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setCreating(false)
    }
  }

  const onDelete = async (id: number) => {
    if (!confirm('Delete tenant?')) return
    try {
      await TenantAPI.remove(id)
      await load()
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div className="grid cols-2">
      <div className="panel">
        <h3 style={{ marginTop: 0 }}>Create Tenant</h3>
        <form onSubmit={onCreate} className="form">
          <div className="row">
            <label>Name</label>
            <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="row">
            <label>Namespace</label>
            <input className="input" value={form.namespace} onChange={e => setForm({ ...form, namespace: e.target.value })} required />
          </div>
          <div className="row">
            <label>CPU Limit</label>
            <input className="input" placeholder="e.g. 2" value={form.cpuLimit} onChange={e => setForm({ ...form, cpuLimit: e.target.value })} />
          </div>
          <div className="row">
            <label>Memory Limit</label>
            <input className="input" placeholder="e.g. 4Gi" value={form.memoryLimit} onChange={e => setForm({ ...form, memoryLimit: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="btn primary" disabled={creating}>{creating ? 'Creating...' : 'Create'}</button>
          </div>
          {error && <div className="hint" style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</div>}
        </form>
      </div>
      <div className="panel">
        <h3 style={{ marginTop: 0 }}>Tenants</h3>
        {loading ? <div>Loading...</div> : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Namespace</th>
                <th>CPU</th>
                <th>Memory</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name}</td>
                  <td>{t.namespace}</td>
                  <td>{t.cpuLimit || '-'}</td>
                  <td>{t.memoryLimit || '-'}</td>
                  <td><button className="btn danger" onClick={() => onDelete(t.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}


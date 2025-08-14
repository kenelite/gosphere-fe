import React from 'react'
import { HarborAPI } from '../lib/api'

export const HarborGatePage: React.FC = () => {
  const [project, setProject] = React.useState('')
  const [repository, setRepository] = React.useState('')
  const [reference, setReference] = React.useState('')
  const [appName, setAppName] = React.useState('')
  const [appNamespace, setAppNamespace] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)

  const submit = async () => {
    setBusy(true); setMessage(null)
    try {
      const res = await HarborAPI.gateSync({ project, repository, reference, appName, appNamespace })
      const msg = typeof res === 'string' ? res : 'Triggered Harbor Gate Sync'
      setMessage(msg)
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="panel">
      <h3 style={{ marginTop: 0 }}>Harbor Gate Sync</h3>
      <div className="row"><label>Project</label><input className="input" value={project} onChange={e=>setProject(e.target.value)} /></div>
      <div className="row"><label>Repository</label><input className="input" value={repository} onChange={e=>setRepository(e.target.value)} /></div>
      <div className="row"><label>Reference</label><input className="input" placeholder="v1.2.3 or sha" value={reference} onChange={e=>setReference(e.target.value)} /></div>
      <div className="row"><label>Argo App Name</label><input className="input" value={appName} onChange={e=>setAppName(e.target.value)} /></div>
      <div className="row"><label>Argo App Namespace</label><input className="input" value={appNamespace} onChange={e=>setAppNamespace(e.target.value)} /></div>
      <button className="btn primary" disabled={busy} onClick={submit}>{busy?'Working...':'Trigger'}</button>
      {message && <div className="hint" style={{ marginTop: 8 }}>{message}</div>}
    </div>
  )
}


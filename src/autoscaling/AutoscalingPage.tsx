import React from 'react'
import { AutoscalingAPI } from '../lib/api'

export const AutoscalingPage: React.FC = () => {
  const [namespace, setNamespace] = React.useState('')
  const [deployment, setDeployment] = React.useState('')
  const [minReplicas, setMinReplicas] = React.useState(1)
  const [maxReplicas, setMaxReplicas] = React.useState(5)
  const [targetCPU, setTargetCPU] = React.useState(60)

  const [vpaKind, setVpaKind] = React.useState('Deployment')
  const [vpaName, setVpaName] = React.useState('')
  const [updateMode, setUpdateMode] = React.useState<'Auto'|'Off'|'Initial'|'Recreate'>('Auto')

  const [busy, setBusy] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)

  const hpa = async () => {
    setBusy('hpa'); setMessage(null)
    try {
      await AutoscalingAPI.hpa({ namespace, deployment, minReplicas, maxReplicas, targetCPUUtilizationPercentage: targetCPU })
      setMessage('Applied HPA')
    } catch (e: any) { setMessage(e.message) } finally { setBusy(null) }
  }

  const vpa = async () => {
    setBusy('vpa'); setMessage(null)
    try {
      await AutoscalingAPI.vpa({ namespace, targetRefKind: vpaKind, targetRefName: vpaName, updateMode })
      setMessage('Applied VPA')
    } catch (e: any) { setMessage(e.message) } finally { setBusy(null) }
  }

  return (
    <div className="grid cols-2">
      <div className="panel">
        <h3 style={{ marginTop: 0 }}>HPA</h3>
        <div className="row"><label htmlFor="ns-hpa">Namespace</label><input id="ns-hpa" className="input" value={namespace} onChange={e=>setNamespace(e.target.value)} /></div>
        <div className="row"><label htmlFor="dep-hpa">Deployment</label><input id="dep-hpa" className="input" value={deployment} onChange={e=>setDeployment(e.target.value)} /></div>
        <div className="row"><label htmlFor="min-hpa">Min Replicas</label><input id="min-hpa" className="input" type="number" value={minReplicas} onChange={e=>setMinReplicas(Number(e.target.value))} /></div>
        <div className="row"><label htmlFor="max-hpa">Max Replicas</label><input id="max-hpa" className="input" type="number" value={maxReplicas} onChange={e=>setMaxReplicas(Number(e.target.value))} /></div>
        <div className="row"><label htmlFor="cpu-hpa">Target CPU %</label><input id="cpu-hpa" className="input" type="number" value={targetCPU} onChange={e=>setTargetCPU(Number(e.target.value))} /></div>
        <button className="btn primary" disabled={busy==='hpa'} onClick={hpa}>{busy==='hpa'?'Working...':'Apply HPA'}</button>
        {message && <div className="hint" style={{ marginTop: 8 }}>{message}</div>}
      </div>

      <div className="panel">
        <h3 style={{ marginTop: 0 }}>VPA</h3>
        <div className="row"><label htmlFor="ns-vpa">Namespace</label><input id="ns-vpa" className="input" value={namespace} onChange={e=>setNamespace(e.target.value)} /></div>
        <div className="row"><label htmlFor="kind-vpa">Target Kind</label>
          <select id="kind-vpa" className="select" value={vpaKind} onChange={e=>setVpaKind(e.target.value)}>
            <option>Deployment</option>
            <option>StatefulSet</option>
            <option>DaemonSet</option>
          </select>
        </div>
        <div className="row"><label htmlFor="name-vpa">Target Name</label><input id="name-vpa" className="input" value={vpaName} onChange={e=>setVpaName(e.target.value)} /></div>
        <div className="row"><label htmlFor="mode-vpa">Update Mode</label>
          <select id="mode-vpa" className="select" value={updateMode} onChange={e=>setUpdateMode(e.target.value as any)}>
            <option>Auto</option>
            <option>Off</option>
            <option>Initial</option>
            <option>Recreate</option>
          </select>
        </div>
        <button className="btn success" disabled={busy==='vpa'} onClick={vpa}>{busy==='vpa'?'Working...':'Apply VPA'}</button>
      </div>
    </div>
  )
}


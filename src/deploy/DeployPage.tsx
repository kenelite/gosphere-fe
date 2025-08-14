import React from 'react'
import { DeployAPI } from '../lib/api'

export const DeployPage: React.FC = () => {
  const [ns, setNs] = React.useState('')
  const [service, setService] = React.useState('')
  const [stableWeight, setStableWeight] = React.useState(90)
  const [canaryWeight, setCanaryWeight] = React.useState(10)
  const [ingress, setIngress] = React.useState('')
  const [host, setHost] = React.useState('')
  const [headerName, setHeaderName] = React.useState('X-SWIMLANE')
  const [headerValue, setHeaderValue] = React.useState('canary')
  const [path, setPath] = React.useState('/')
  const [targetService, setTargetService] = React.useState('')
  const [busy, setBusy] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)

  const run = async (what: 'weight' | 'header' | 'bluegreen') => {
    setMessage(null)
    setBusy(what)
    try {
      if (what === 'weight') {
        await DeployAPI.canaryWeight({ namespace: ns, service, stableWeight, canaryWeight })
        setMessage('Updated Canary Weights')
      } else if (what === 'header') {
        await DeployAPI.swimlaneHeader({ namespace: ns, ingress, host, headerName, headerValue })
        setMessage('Updated Swimlane Header')
      } else {
        await DeployAPI.bluegreenSwitch({ namespace: ns, ingress, host, path, targetService })
        setMessage('Switched Blue-Green backend')
      }
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="grid cols-2">
      <div className="panel">
        <h3 style={{ marginTop: 0 }}>Canary - Weight</h3>
        <div className="row"><label htmlFor="ns-weight">Namespace</label><input id="ns-weight" className="input" value={ns} onChange={e=>setNs(e.target.value)} /></div>
        <div className="row"><label htmlFor="svc-weight">Service</label><input id="svc-weight" className="input" value={service} onChange={e=>setService(e.target.value)} /></div>
        <div className="row"><label htmlFor="stable">Stable %</label><input id="stable" className="input" type="number" value={stableWeight} onChange={e=>setStableWeight(Number(e.target.value))} /></div>
        <div className="row"><label htmlFor="canary">Canary %</label><input id="canary" className="input" type="number" value={canaryWeight} onChange={e=>setCanaryWeight(Number(e.target.value))} /></div>
        <button className="btn primary" disabled={busy==='weight'} onClick={()=>run('weight')}>{busy==='weight'?'Working...':'Apply Weight'}</button>
        {message && <div className="hint" style={{ marginTop: 8 }}>{message}</div>}
      </div>

      <div className="panel">
        <h3 style={{ marginTop: 0 }}>Swimlane - Header</h3>
        <div className="row"><label htmlFor="ns-header">Namespace</label><input id="ns-header" className="input" value={ns} onChange={e=>setNs(e.target.value)} /></div>
        <div className="row"><label htmlFor="ingress-header">Ingress</label><input id="ingress-header" className="input" value={ingress} onChange={e=>setIngress(e.target.value)} /></div>
        <div className="row"><label htmlFor="host-header">Host</label><input id="host-header" className="input" value={host} onChange={e=>setHost(e.target.value)} /></div>
        <div className="row"><label htmlFor="header-name">Header Name</label><input id="header-name" className="input" value={headerName} onChange={e=>setHeaderName(e.target.value)} /></div>
        <div className="row"><label htmlFor="header-value">Header Value</label><input id="header-value" className="input" value={headerValue} onChange={e=>setHeaderValue(e.target.value)} /></div>
        <button className="btn primary" disabled={busy==='header'} onClick={()=>run('header')}>{busy==='header'?'Working...':'Apply Header'}</button>
      </div>

      <div className="panel" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ marginTop: 0 }}>Blue-Green - Switch Ingress Backend</h3>
        <div className="row"><label htmlFor="ns-bg">Namespace</label><input id="ns-bg" className="input" value={ns} onChange={e=>setNs(e.target.value)} /></div>
        <div className="row"><label htmlFor="ingress-bg">Ingress</label><input id="ingress-bg" className="input" value={ingress} onChange={e=>setIngress(e.target.value)} /></div>
        <div className="row"><label htmlFor="host-bg">Host</label><input id="host-bg" className="input" value={host} onChange={e=>setHost(e.target.value)} /></div>
        <div className="row"><label htmlFor="path-bg">Path</label><input id="path-bg" className="input" value={path} onChange={e=>setPath(e.target.value)} /></div>
        <div className="row"><label htmlFor="target-svc-bg">Target Service</label><input id="target-svc-bg" className="input" value={targetService} onChange={e=>setTargetService(e.target.value)} /></div>
        <button className="btn success" disabled={busy==='bluegreen'} onClick={()=>run('bluegreen')}>{busy==='bluegreen'?'Working...':'Switch'}</button>
      </div>
    </div>
  )
}


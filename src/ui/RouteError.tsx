import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export const RouteError: React.FC = () => {
  const error = useRouteError()
  let title = 'Something went wrong'
  let detail: string | undefined

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    detail = (error.data as any)?.message || undefined
  } else if (error instanceof Error) {
    detail = error.message
  }

  return (
    <div className="container" style={{ paddingTop: 32 }}>
      <div className="panel">
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        {detail && <div className="hint" style={{ whiteSpace: 'pre-wrap' }}>{detail}</div>}
      </div>
    </div>
  )
}


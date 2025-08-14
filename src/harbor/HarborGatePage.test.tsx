import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { HarborGatePage } from './HarborGatePage'
import * as api from '../lib/api'

describe('HarborGatePage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('triggers gate sync', async () => {
    vi.spyOn(api.HarborAPI, 'gateSync').mockResolvedValue('ok' as any)
    render(<HarborGatePage />)
    fireEvent.change(screen.getByLabelText('Project'), { target: { value: 'p' } })
    fireEvent.change(screen.getByLabelText('Repository'), { target: { value: 'r' } })
    fireEvent.change(screen.getByLabelText('Reference'), { target: { value: 'v1' } })
    fireEvent.change(screen.getByLabelText('Argo App Name'), { target: { value: 'app' } })
    fireEvent.change(screen.getByLabelText('Argo App Namespace'), { target: { value: 'argocd' } })
    fireEvent.click(screen.getByText('Trigger'))
    await waitFor(() => expect(api.HarborAPI.gateSync).toHaveBeenCalled())
  })
})


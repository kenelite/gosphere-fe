import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { DeployPage } from './DeployPage'
import * as api from '../lib/api'

describe('DeployPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('triggers canary weight', async () => {
    vi.spyOn(api.DeployAPI, 'canaryWeight').mockResolvedValue({ ok: true } as any)
    render(<DeployPage />)
    fireEvent.change(screen.getAllByLabelText('Namespace')[0], { target: { value: 'ns' } })
    fireEvent.change(screen.getByLabelText('Service'), { target: { value: 'svc' } })
    fireEvent.click(screen.getByText('Apply Weight'))
    await waitFor(() => expect(api.DeployAPI.canaryWeight).toHaveBeenCalled())
  })
})


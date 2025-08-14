import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AutoscalingPage } from './AutoscalingPage'
import * as api from '../lib/api'

describe('AutoscalingPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('applies HPA', async () => {
    vi.spyOn(api.AutoscalingAPI, 'hpa').mockResolvedValue({ ok: true } as any)
    render(<AutoscalingPage />)
    fireEvent.change(screen.getAllByLabelText('Namespace')[0], { target: { value: 'ns' } })
    fireEvent.change(screen.getByLabelText('Deployment'), { target: { value: 'app' } })
    fireEvent.click(screen.getByText('Apply HPA'))
    await waitFor(() => expect(api.AutoscalingAPI.hpa).toHaveBeenCalled())
  })
})


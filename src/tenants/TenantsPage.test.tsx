import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TenantsPage } from './TenantsPage'
import * as api from '../lib/api'

describe('TenantsPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('renders list and allows create', async () => {
    vi.spyOn(api.TenantAPI, 'list').mockResolvedValue([{ id: 1, name: 't1', namespace: 'ns1' }] as any)
    vi.spyOn(api.TenantAPI, 'create').mockResolvedValue({ id: 2 } as any)

    render(<TenantsPage />)

    expect(await screen.findByText('t1')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 't2' } })
    fireEvent.change(screen.getByLabelText('Namespace'), { target: { value: 'ns2' } })
    fireEvent.click(screen.getByText('Create'))

    await waitFor(() => expect(api.TenantAPI.create).toHaveBeenCalled())
  })
})


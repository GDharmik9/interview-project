import React, { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import Table from 'common/components/atoms/Table'
import { useNavigate } from 'react-router-dom'
import TokenService from 'services/token.service'
import { HeaderMegaMenu } from './HeaderMegaMenu'

const defaultData: Person[] = [
  {
    passengerName: 'Sherwin',
    airlineName: 'Sri Lanka',
    trips: 59,
    airlineHeadQuaters: 'Katunayake, Sri Lanka',
  },
  {
    passengerName: 'Sherwin',
    airlineName: 'Sri Lanka',
    trips: 59,
    airlineHeadQuaters: 'Katunayake, Sri Lanka',
  },
  {
    passengerName: 'Sherwin',
    airlineName: 'Sri Lanka',
    trips: 59,
    airlineHeadQuaters: 'Katunayake, Sri Lanka',
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('passengerName', {
    header: () => 'Name',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('airlineName', {
    header: () => 'Airline',
    cell: (info) => info.renderValue(),
  }),

  columnHelper.accessor('trips', {
    header: () => 'Trips',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('airlineHeadQuaters', {
    header: () => <span>Head Quaters</span>,
    cell: (info) => info.renderValue(),
  }),
]
const DashboardTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = React.useState(() => [...defaultData])
  const [accessToken, setAccessToken] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const token = TokenService.getLocalAccessToken()

    if (token) {
      setAccessToken(token)
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <div>
        <HeaderMegaMenu token={accessToken} />
        {data && <Table data={data} columns={columns} />}
      </div>
    </>
  )
}

export default DashboardTable

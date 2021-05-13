import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useBlockLayout } from 'react-table'
import { useSticky } from 'react-table-sticky';
import { Styles } from './TableStyle'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'

export const SortingTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

  

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
     } = useTable({
        columns,
        data
    },
    useGlobalFilter, useSortBy, useBlockLayout, useSticky)

    const firstPageRows = rows.slice(0,200)

    const { globalFilter } = state

    return (
        <>
        
        <Styles>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
      <div {...getTableProps()} className="table sticky" style={{ width: '100%', height: 625 }}>
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
        </>
    )
}
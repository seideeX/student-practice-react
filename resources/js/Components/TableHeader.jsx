import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';


const TableHeader = ({ name, sortable = true,  sortField = null, sortDirection = null, sortChanged = () => {}, children }) => {
    return (
        <th onClick={e => sortChanged(name)} className="px-3 py-2">
            <div className="flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={"w-4 " + (sortField === name && sortDirection === 'asc' ? 'text-gray-900' : '') }/>
                        <ChevronDownIcon className={"w-4 -mt-2 " + (sortField === name && sortDirection === 'desc' ? 'text-gray-900' : '')} />
                    </div>
                )}
            </div>
        </th>
    )
}

export default TableHeader

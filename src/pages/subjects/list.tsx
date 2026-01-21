import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { DEPARTMENT_OPTIONS } from '@/constants'
import { Subject } from '@/types'
import { Select, SelectValue } from '@radix-ui/react-select'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import { get } from 'http'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

const SubjectsList = () => {
   const [searchQuery, setsearchQuery] = useState('')
   const [selectedDepatment, setselectedDepatment] = useState('all')

   const departmentFilters = selectedDepatment === 'all' ? [] : [{field:'department', operator: 'eq', value: selectedDepatment}];

   const searchFilters = searchQuery ? [{field:'name', operator: 'contains' as const, value: searchQuery}] : [];


   const subjectTable = useTable<Subject>({
    refineCoreProps:{
        resource:'subjects',
        pagination: {pageSize:10 , mode: 'server'},
        filters: {
            permanent:[...departmentFilters, ...searchFilters]
        },
        sorters: {
            initial:[
                {field:'id',order:'desc'}
            ]
        }
        },
    columns: useMemo<ColumnDef<Subject>[]>(() =>[
        {
            id:'courseCode',
            accessorKey:'courseCode',
            size:100,
            header:()=><p className='column-title ml-2'>Code</p>,
            cell:({getValue}: {getValue: () => unknown})=><Badge>{getValue() as string}</Badge>
        },
        {
            id:'name',
            accessorKey:'name',
            size:200,
            header:()=><p className='column-title'>Name</p>,
            cell: ({ getValue }) => <span className='text-foreground'>{getValue() as string}</span>,
            filterFn: 'includesString',
            
        },
        {
            id:'department',
            accessorKey:'department',
            size:150,
            header:()=><p className='column-title'>Department</p>,
            cell: ({ getValue }) => <Badge variant={"secondary"}>{getValue<string>()}</Badge>,
        },
        {
            id:'description',
            accessorKey:'description',
            size:300,
            header:()=><p className='column-title'>Description</p>,
            cell: ({ getValue }) => <span className='truncate line-clamp-2'>{getValue<string>()}</span>
        }
    ],[] ),

  
   });


  return (
    <ListView>
        <Breadcrumb />

        <h1 className='page-title'>Subjects</h1>
        <div className='intro-row'>
            <p>Quick access to essential metrics and management tools</p>

            <div className='action-row'>
                <div className='search-field'>
                    <Search className='search-icon' />

                    <Input 
                        type='text'
                        placeholder='Search by name'
                        className='pl-10 w-full'
                        value={searchQuery}
                        onChange={(e) => setsearchQuery(e.target.value)}
                    />
                </div>
                <div className='flex gap-2 w-full sm:w-auto'>
                    <Select value={selectedDepatment}
                        onValueChange={setselectedDepatment}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder='Filter by department' />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value='all'>
                                All Departments
                            </SelectItem>
                             {DEPARTMENT_OPTIONS.map((department) => (
                                    <SelectItem key={department.value} value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <CreateButton />
                </div>
            </div>
        
        </div>
        <DataTable table={subjectTable} />
    </ListView>
  )
}

export default SubjectsList
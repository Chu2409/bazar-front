import { Skeleton } from '../ui/skeleton'

const LoadingSkeleton = () => {
  return (
    <div>
      {/* Header Section */}
      <div className='flex gap-4 justify-between flex-wrap'>
        <div className='space-y-1'>
          <Skeleton className='h-10 w-44' />
          <Skeleton className='h-4 w-72' />
        </div>

        <Skeleton className='h-10 w-[180px] ml-auto' />
      </div>

      {/* Search and Filters */}
      <div className='flex items-center gap-4 mt-6 flex-wrap'>
        <Skeleton className='h-8 w-[200px]' />
        <Skeleton className='h-8 w-[100px]' />
        <Skeleton className='h-8 w-[100px]' />
        <Skeleton className='h-8 w-[80px] ml-auto' />
      </div>

      <div className='hidden md:block mt-3'>
        {/* Table Header */}
        <div className='grid grid-cols-12 gap-2 py-3 border-b'>
          <Skeleton className='h-4 w-6 col-span-1' />
          <Skeleton className='h-4 w-32 col-span-4' />
          <Skeleton className='h-4 w-32 col-span-6' />
          <div className='col-span-1' />
        </div>

        {/* Table Rows */}

        {[...Array(10)].map((_, index) => (
          <div key={index} className='grid grid-cols-12 gap-2 py-4 border-b'>
            <Skeleton className='h-4 w-6 col-span-1' />
            <Skeleton className='h-4 w-48 col-span-4' />
            <Skeleton className='h-4 w-32 col-span-6' />
            <Skeleton className='h-4 w-6 col-span-1' />
          </div>
        ))}
      </div>

      <div className='md:hidden mt-3'>
        {/* Table Header */}
        <div className='grid grid-cols-12 gap-2 py-3 border-b'>
          <Skeleton className='h-4 w-6 col-span-2' />
          <Skeleton className='h-4 w-32 col-span-8' />
          <div className='col-span-2' />
        </div>

        {/* Table Rows */}

        {[...Array(10)].map((_, index) => (
          <div key={index} className='grid grid-cols-12 gap-2 py-4 border-b'>
            <Skeleton className='h-4 w-6 col-span-2' />
            <Skeleton className='h-4 w-48 col-span-8' />
            <Skeleton className='h-4 w-6 col-span-2' />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-end mt-4 gap-x-5 gap-y-2 flex-wrap'>
        <div className='flex gap-2'>
          <Skeleton className='h-8 w-[80px]' />
          <Skeleton className='h-8 w-[40px]' />
        </div>
        <Skeleton className='h-8 w-[100px]' />
        <div className='flex gap-2 flex-wrap'>
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton

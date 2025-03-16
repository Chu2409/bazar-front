interface Props {
  children: React.ReactNode
}

export const DataContainer = ({ children }: Props) => {
  return (
    <div className='col-span-4 max-[1000px]:col-span-1 max-[1000px]:order-1 mt-6 pb-10'>
      {children}
    </div>
  )
}

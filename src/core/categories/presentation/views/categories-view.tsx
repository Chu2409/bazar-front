import { DataTable } from '@/components/table/data-table'
import { categoriesColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { useCategoryStore } from '../../context/use-category-store'
import { CategoryForm } from '../components/category-form'
import { CornerButton } from '@/components/corner-button'
import { DetailsContainer } from '@/common/components/layout/details-container'
import { MainContainer } from '@/common/components/layout/main-container'
import { DataContainer } from '@/common/components/layout/data-container'
import { Category } from '../../models/res/category'

const CategoriesView = ({ data }: { data: IApiPaginatedRes<Category> }) => {
  const isOpen = useCategoryStore((state) => state.isOpen)
  const onClose = useCategoryStore((state) => state.onClose)
  const onOpen = useCategoryStore((state) => state.onOpen)

  return (
    <>
      <CornerButton title='Agregar categoría' onClick={() => onOpen()} />

      <MainContainer isOpen={isOpen}>
        <DataContainer>
          <DataTable
            data={data}
            columns={categoriesColumns}
            inputFilterKey='name'
          />
        </DataContainer>

        {isOpen && (
          <DetailsContainer title='Detalles de la categoría' onClose={onClose}>
            <CategoryForm />
          </DetailsContainer>
        )}
      </MainContainer>
    </>
  )
}

export default CategoriesView

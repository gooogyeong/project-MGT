import React, { useContext, useEffect } from 'react'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'

type CategoryProps = {
  handleCategorySelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// TODO: delete

const CategoryDropdown = (props: CategoryProps) => {
  const store = useContext(storeContext)

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        if (store && !store.category.categories.length) await store.category.getCategories()
      } catch (error) {
        console.log(error)
      }
    }
    getCategoryList()
  }, [])

  return useObserver(() => {
    return (
      <select onChange={props.handleCategorySelect}>
        <option value="">카테고리</option>
        {store?.category.categories.map((category, categoryIndex) => {
          return (<option value={categoryIndex} key={categoryIndex}>{category.name}</option>)
        })}
      </select>
    )
  })
}

export default CategoryDropdown

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useCategory() {
  const [selected, setSelected] = useState([]);

  const rawThreads = useSelector((state) => state.threads);

  const threads = useMemo(() => rawThreads ?? [], [rawThreads]);

  const allCategories = useMemo(() => {
    return [...new Set(threads.map(({ category }) => category.toLowerCase()))];
  }, [threads]);

  const handleCategoryChange = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClear = () => {
    setSelected([]);
  };

  return {
    selectedCategories: selected,
    allCategories,
    handleCategoryChange,
    handleClear,
  };
}

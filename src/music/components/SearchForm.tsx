import React, { useEffect, useRef, useState } from 'react'

interface Props {
  query: string
  onSearch(query: string): void
}

export const SearchForm = (props: Props) => {
  const [query, setQuery] = useState(props.query)
  const isFirst = useRef(true)

  useEffect(() => {
    setQuery(props.query)
  }, [props.query])

  useEffect(() => {
    if (isFirst.current) { isFirst.current = (false); return }

    const handle = setTimeout(() => {
      props.onSearch(query)
    }, 500)

    return () => clearTimeout(handle)
  }, [query])

  return (
    <div>
      <div className="input-group mb-3">
        <input type="text" className="form-control"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search" />

        {/* <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={search}>Search </button>
        </div> */}
      </div>
    </div>
  )
}

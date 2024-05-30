import { useSelector } from "react-redux"
import MenuItemCard from "../RestDetailsPage/MenuItemCard";
// import { useState } from "react";
import './SearchResult.css'


const SearchResult = () => {
  const results = useSelector(state => Object.values(state.search?.food || {}));

  if(results.length == 0){
    return <p>Nothing found.</p>
  }
  return (
    <div className="resultcontainer">
      <h1>Search Result</h1>
      <div className="resultdetails">
        {
          results.map(result => (
            <MenuItemCard key={result.id} item={result} restaurantId={result.restaurant_id} />
          ))
        }
      </div>
    </div>
  )
}

export default SearchResult
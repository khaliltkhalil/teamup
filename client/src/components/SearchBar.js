import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Turnstone from "turnstone";

function SearchBar() {
  const [selectedUser, setSelectedUser] = useState({});
  const dispatch = useDispatch();
  const styles = {
    input:
      "w-full h-12 border border-oldsilver-300 py-2 pl-10 pr-7 text-xl outline-none rounded",
    inputFocus:
      "w-full h-12 border-x-0 border-t-0 border-b border-crystal-500 py-2 pl-10 pr-7 text-xl outline-none sm:rounded sm:border",
    query: "text-oldsilver-800 placeholder-oldsilver-400",
    typeahead: "text-crystal-500 border-white",
    cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-crystal-600 inline-flex sm:hidden`,
    clearButton:
      "absolute inset-y-0 right-0 w-8 inline-flex items-center justify-center text-crystal-500 hover:text-hotpink-300",
    listbox:
      "w-full bg-white sm:border sm:border-crystal-500 sm:rounded text-left sm:mt-2 p-2 sm:drop-shadow-xl",
    groupHeading:
      "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-hotpink-300",
    item: "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-oldsilver-700",
    highlightedItem:
      "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-oldsilver-700 rounded bg-crystal-100",
    match: "font-semibold",
    noItems: "cursor-default text-center my-20",
  };
  const maxItems = 10;

  const listbox = [
    {
      id: "users",
      displayField: "email",
      data: async (query) => {
        const res = await axios.get(
          `/api/v1/users?email=${query}&limit=${maxItems}`
        );

        return res.data;
      },
      searchType: "startswith",
    },
  ];

  const handleAddUSer = () => {};

  const onItemSelected = (selectedItem, displayField) => {
    setSelectedUser(selectedItem);
  };
  const Item = ({ item }) => {
    return (
      <div>
        {item.first_name} {item.last_name} ({item.email})
      </div>
    );
  };
  return (
    <div className="flex gap-3">
      <Turnstone
        cancelButton={true}
        clearButton={true}
        debounceWait={250}
        id="search"
        listbox={listbox}
        listboxIsImmutable={true}
        matchText={true}
        maxItems={maxItems}
        name="search"
        noItemsMessage="We found no user that match your search"
        placeholder="Search user by email"
        styles={styles}
        typeahead={true}
        Item={Item}
        onSelect={onItemSelected}
      />
      <button onClick={handleAddUSer} className="btn btn-primary">
        Add
      </button>
    </div>
  );
}

export default SearchBar;

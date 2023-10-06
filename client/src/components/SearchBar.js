import axios from "axios";
import React, { useState } from "react";
import Turnstone from "turnstone";

function SearchBar() {
  const [selectedUser, setSelectedUser] = useState({});
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
      displayField: "name",
      data: async (query) => {
        const res = await axios.get(
          `/api/v1/users?nameStartWith=${query}&limit=${maxItems}`
        );
        const users = await res.json();
        return users;
      },
      searchType: "startswith",
    },
  ];

  const onItemSelected = (selectedItem, displayField) => {
    setSelectedUser(selectedItem);
  };
  const Item = ({ first_name, last_name, email }) => {
    return (
      <div>
        {first_name} {last_name} ({email})
      </div>
    );
  };
  return (
    <div className="flex gap-3">
      <Turnstone
        cancelButton={true}
        debounceWait={250}
        id="search"
        listbox={listbox}
        listboxIsImmutable={true}
        matchText={true}
        maxItems={maxItems}
        name="search"
        noItemsMessage="We found no places that match your search"
        placeholder="Enter user name"
        styles={styles}
        typeahead={true}
        Item={Item}
        onSelect={onItemSelected}
      />
      <button>Add</button>
    </div>
  );
}

export default SearchBar;

import React, { useState, useEffect } from "react";

function MemberTableHead({
  setOldSortKey,
  oldSortKey,
  setSortKey,
  sortKey,
  descendingOrder,
  setDescendingOrder
}) {
  const changeSort = function(newSortKey) {
    setOldSortKey(sortKey);

    setSortKey(newSortKey);
  };

  let [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    const isDescending = sortKey !== oldSortKey ? true : !descendingOrder;

    setDescendingOrder(isDescending);
  }, [filterCount]);

  return (
    <thead className="text-white antialiased">
      <tr className="">
        <th
          className="cursor-pointer select-none md:px-6 md:py-2 bg-red-dark hover:bg-red"
          onClick={() => {
            changeSort("name");
            setFilterCount(++filterCount);
          }}
        >
          Name
        </th>
        <th
          className="cursor-pointer select-none md:px-6 md:py-2 bg-red-dark hover:bg-red"
          onClick={() => {
            changeSort("winRate");
            setFilterCount(++filterCount);
          }}
        >
          Win Percentage
        </th>
        <th
          className="cursor-pointer select-none md:px-6 md:py-2 bg-red-dark hover:bg-red"
          onClick={() => {
            changeSort("warDayParticipationRate");
            setFilterCount(++filterCount);
          }}
        >
          War Day Participation Rate
        </th>
        <th
          className="cursor-pointer select-none md:px-6 md:py-2 bg-red-dark hover:bg-red block"
          onClick={() => {
            changeSort("warParticipationRate");
            setFilterCount(++filterCount);
          }}
        >
          War Participation Rate
        </th>
      </tr>
    </thead>
  );
}

export default MemberTableHead;

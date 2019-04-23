import React from "react";

function MemberTableBody({ members, memberRecords, sortKey, descendingOrder }) {
  return Object.entries(memberRecords)
    .filter(
      ([name, _]) => members.findIndex(member => member.name === name) > -1
    )
    .sort((firstMember, secondMember) => {
      return descendingOrder
        ? secondMember[1][sortKey] - firstMember[1][sortKey]
        : firstMember[1][sortKey] - secondMember[1][sortKey];
    })
    .map(([name, record], index) => {
      return (
        <tr key={name} className={rowClasses(index)}>
          <td className="md:px-8 md:py-2">{name}</td>
          <td>{record.winRate}%</td>
          <td>{record.warDayParticipationRate}%</td>
          <td>{record.warParticipationRate}%</td>
        </tr>
      );
    });
}

function rowClasses(index) {
  let classes = "md:py-4";

  if (index % 2 === 0) {
    classes = `${classes} bg-grey-lighter`;
  } else {
    classes = `${classes} bg-white`;
  }

  return classes;
}

export default MemberTableBody;

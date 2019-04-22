import React, { useState, useEffect } from "react";
import { fetchMembers, fetchClanWarLog } from "./fetchClanData";
import MemberTableHead from "./MemberTableHead";
import MemberTableBody from "./MemberTableBody";
import "./css/App.css";

const App = function() {
  let [members, setMembers] = useState({});
  let [memberRecords, setMemberRecords] = useState({});

  useEffect(() => {
    (async () => {
      await fetchMembers(setMembers);
      await fetchClanWarLog(setMemberRecords);
    })();
  }, []);

  let [sortKey, setSortKey] = useState("winRate");
  let [oldSortKey, setOldSortKey] = useState("");
  let [descendingOrder, setDescendingOrder] = useState(true);

  return (
    <div className="flex flex-col items-center pt-16">
      <h1 className="mb-12 font-heading">Vega Squad</h1>
      <table className="font-sans">
        <MemberTableHead
          setOldSortKey={setOldSortKey}
          oldSortKey={oldSortKey}
          setSortKey={setSortKey}
          sortKey={sortKey}
          setDescendingOrder={setDescendingOrder}
          descendingOrder={descendingOrder}
        />
        <tbody>
          {members && memberRecords && (
            <MemberTableBody
              members={members}
              memberRecords={memberRecords}
              sortKey={sortKey}
              descendingOrder={descendingOrder}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;

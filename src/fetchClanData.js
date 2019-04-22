import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODI0LCJpZGVuIjoiMzQyOTI0MTUxMDUwMzM4MzIzIiwibWQiOnsidXNlcm5hbWUiOiJjZWliYXdlYiIsImtleVZlcnNpb24iOjMsImRpc2NyaW1pbmF0b3IiOiI0MDcyIn0sInRzIjoxNTU1Mzc4NDkyMjQwfQ.Q5wyCWhLEi8NGcgu9B-WmVZyaQOtAjofWXClFU_7N9I";

const tag = "RP8Q8L";

const client = axios.create({
  baseURL: "https://api.royaleapi.com",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export async function fetchMembers(setMembers) {
  const response = await client.get(`clan/${tag}`);

  setMembers(response.data.members);
}

export async function fetchClanWarLog(setMemberRecords) {
  const { data: pastWars } = await client.get(`clan/${tag}/warlog`);

  let records = pastWars.reduce((records, war) => {
    for (let member of war.participants) {
      if (records[member.name] === undefined) {
        records[member.name] = {
          warBattlesPlayed: member.battlesPlayed,
          warBattlesWon: member.wins,
          warsFought: 1
        };
      } else {
        records[member.name].warBattlesPlayed += member.battlesPlayed;
        records[member.name].warBattlesWon += member.wins;
        records[member.name].warsFought++;
      }
    }

    return records;
  }, {});

  records = Object.entries(records).reduce((records, [member, memberData]) => {
    memberData.winRate =
      Math.round(
        (memberData.warBattlesWon / memberData.warBattlesPlayed) * 100 * 100
      ) / 100; // first * 100 to get number out of 100, second * 100 to round, / 100 to get back to percent

    if (isNaN(memberData.winRate)) {
      memberData.winRate = 0;
    }

    memberData.warDayParticipationRate =
      (memberData.warBattlesPlayed / memberData.warsFought) * 100;

    if (memberData.warDayParticipationRate > 100) {
      memberData.warDayParticipationRate = 100;
    }

    memberData.warParticipationRate = (memberData.warsFought / 10) * 100;

    records[member.trim()] = memberData;

    return records;
  }, {});

  setMemberRecords(records);
}

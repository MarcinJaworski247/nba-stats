import data from "@/assets/data/data.json";
import standings from "@/assets/data/standings.json";

export function getAvgRbByPos() {
  const pg = [];
  const sg = [];
  const sf = [];
  const pf = [];
  const c = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].Pos === "PG") {
      pg.push(data[i].TRB);
    } else if (data[i].Pos === "SG") {
      sg.push(data[i].TRB);
    } else if (data[i].Pos === "SF") {
      sf.push(data[i].TRB);
    } else if (data[i].Pos === "PF") {
      pf.push(data[i].TRB);
    } else if (data[i].Pos === "C") {
      c.push(data[i].TRB);
    }
  }

  const pgSum = pg.reduce((a, b) => a + b, 0);
  const pgAvg = pgSum / pg.length || 0;

  const sgSum = sg.reduce((a, b) => a + b, 0);
  const sgAvg = sgSum / sg.length || 0;

  const sfSum = sf.reduce((a, b) => a + b, 0);
  const sfAvg = sfSum / sf.length || 0;

  const pfSum = pf.reduce((a, b) => a + b, 0);
  const pfAvg = pfSum / pf.length || 0;

  const cSum = c.reduce((a, b) => a + b, 0);
  const cAvg = cSum / c.length || 0;

  return { pg: pgAvg, sg: sgAvg, sf: sfAvg, pf: pfAvg, c: cAvg };
}

export function getMinsByAgeRange() {
  const range1 = {
    name: "Ages -23",
  };
  const range2 = {
    name: "Ages 24-27",
  };
  const range3 = {
    name: "Ages 28-31",
  };
  const range4 = {
    name: "Ages 32-",
  };

  let range1Arr = [];
  let range2Arr = [];
  let range3Arr = [];
  let range4Arr = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].Age <= 23) {
      range1Arr.push([data[i].MP, data[i].Age, data[i].PTS, data[i].Player]);
    } else if (data[i].Age >= 24 && data[i].Age <= 27) {
      range2Arr.push([data[i].MP, data[i].Age, data[i].PTS, data[i].Player]);
    } else if (data[i].Age >= 28 && data[i].Age <= 31) {
      range3Arr.push([data[i].MP, data[i].Age, data[i].PTS, data[i].Player]);
    } else if (data[i].Age >= 32) {
      range4Arr.push([data[i].MP, data[i].Age, data[i].PTS, data[i].Player]);
    }
  }

  range1["data"] = range1Arr;
  range2["data"] = range2Arr;
  range3["data"] = range3Arr;
  range4["data"] = range4Arr;

  return { range1: range1, range2: range2, range3: range3, range4: range4 };
}

export function getTeamWins() {
  return standings;
}

export function getRbLeagueLeaders() {
  const pg = {
    avg: 0,
    name: null,
    team: null,
    image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201566.png",
  };
  const sg = {
    avg: 0,
    name: null,
    team: null,
    image: "https://cdn.nba.com/headshots/nba/latest/1040x760/201935.png",
  };
  const sf = {
    avg: 0,
    name: null,
    team: null,
    image: "https://cdn.nba.com/headshots/nba/latest/1040x760/202710.png",
  };
  const pf = {
    avg: 0,
    name: null,
    team: null,
    image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627734.png",
  };
  const c = {
    avg: 0,
    name: null,
    team: null,
    image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203991.png",
  };

  for (let i = 0; i < data.length; i++) {
    if (data[i].Pos === "PG" && data[i].TRB > pg.avg) {
      pg.avg = data[i].TRB;
      pg.name = data[i].Player;
      pg.team = data[i].Tm;
    }
    if (data[i].Pos === "SG" && data[i].TRB > sg.avg) {
      sg.avg = data[i].TRB;
      sg.name = data[i].Player;
      sg.team = data[i].Tm;
    }
    if (data[i].Pos === "SF" && data[i].TRB > sf.avg) {
      sf.avg = data[i].TRB;
      sf.name = data[i].Player;
      sf.team = data[i].Tm;
    }
    if (data[i].Pos === "PF" && data[i].TRB > pf.avg) {
      pf.avg = data[i].TRB;
      pf.name = data[i].Player;
      pf.team = data[i].Tm;
    }
    if (data[i].Pos === "C" && data[i].TRB > c.avg) {
      c.avg = data[i].TRB;
      c.name = data[i].Player;
      c.team = data[i].Tm;
    }
  }

  return { pg, sg, sf, pf, c };
}

export function getAllPlayersPpg() {
  let res = [];
  for (const item of data) {
    res.push(item.PTS);
  }
  return res;
}

export function getAllPlayersRb() {
  let res = [];
  for (const item of data) {
    res.push(item.TRB);
  }
  return res;
}

export function getTeamsWins() {
  let res = [];
  for (const item of standings) {
    res.push(item.properties.value);
  }
  return res;
}

export function getAllPlayersMpg() {
  let res = [];
  for (const item of data) {
    res.push(item.MP);
  }
  return res;
}

export function getAllPlayersAge() {
  let res = [];
  for (const item of data) {
    res.push(item.Age);
  }
  return res;
}

export function getAllPlayersPositions() {
  let res = [];
  for (const item of data) {
    let pos;
    if (item.Pos === "PG") pos = 1;
    if (item.Pos === "SG" || item.Pos === "G") pos = 2;
    if (item.Pos === "SF" || item.Pos === "SF-PF") pos = 3;
    if (item.Pos === "PF" || item.Pos === "F") pos = 4;
    if (item.Pos === "C" || item.Pos === "F-C") pos = 5;
    res.push(pos);
  }
  return res;
}

export function getAllTeamsConf() {
  let res = [];
  for (const item of standings) {
    let conf;
    if (item.properties.conference === "wschodnia") conf = 0;
    if (item.properties.conference === "zachodnia") conf = 1;
    res.push(conf);
  }
  return res;
}

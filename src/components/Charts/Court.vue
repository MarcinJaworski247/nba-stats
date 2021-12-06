<template>
  <div>
    <div class="chart-wrapper">
      <div class="court">
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <player-tile
              :name="stats.pg.name"
              :image="stats.pg.image"
              :team="stats.pg.team"
              :avg="stats.pg.avg"
              style="margin-bottom: 128px"
            />
          </div>
          <div class="col"></div>
        </div>
        <div class="row">
          <div class="col">
            <player-tile
              :name="stats.sf.name"
              :image="stats.sf.image"
              :team="stats.sf.team"
              :avg="stats.sf.avg"
            />
          </div>
          <div class="col">
            <radar-chart />
          </div>
          <div class="col">
            <player-tile
              :name="stats.sg.name"
              :image="stats.sg.image"
              :team="stats.sg.team"
              :avg="stats.sg.avg"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <player-tile
              :name="stats.c.name"
              :image="stats.c.image"
              :team="stats.c.team"
              :avg="stats.c.avg"
            />
          </div>
          <div class="col"></div>
          <div class="col">
            <player-tile
              :name="stats.pf.name"
              :image="stats.pf.image"
              :team="stats.pf.team"
              :avg="stats.pf.avg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// components
import PlayerTile from "@/components/Charts/PlayerTile";
import RadarChart from "@/components/Charts/RadarChart";

// service
import { getLeagueLeaders, getPtsByPos } from "@/services/dataService";

export default {
  name: "Court",
  components: {
    PlayerTile,
    RadarChart,
  },
  data() {
    return {
      stats: [],
      headers: ["Pozycja", "Średnia punktów"],
      data: [],
      leaderHeaders: ["Pozycja", "Zawodnik", "Średnia", "Drużyna"],
      leaderData: [],
      chartData: [],
    };
  },
  mounted() {
    this.stats = getLeagueLeaders();
    const avgs = getPtsByPos();
    this.data = [
      ["Point Guard", Number(avgs.pg).toFixed(2)],
      ["Shooting Guard", Number(avgs.sg).toFixed(2)],
      ["Small Forward", Number(avgs.sf).toFixed(2)],
      ["Power Forward", Number(avgs.pf).toFixed(2)],
      ["Center", Number(avgs.c).toFixed(2)],
    ];
    this.leaderData = [
      [
        "Point Guard",
        this.stats.pg.name,
        this.stats.pg.avg,
        this.stats.pg.team,
      ],
      [
        "Shooting Guard",
        this.stats.sg.name,
        this.stats.sg.avg,
        this.stats.sg.team,
      ],
      [
        "Small Forward",
        this.stats.sf.name,
        this.stats.sf.avg,
        this.stats.sf.team,
      ],
      [
        "Power Forward",
        this.stats.pf.name,
        this.stats.pf.avg,
        this.stats.pf.team,
      ],
      ["Center", this.stats.c.name, this.stats.c.avg, this.stats.c.team],
    ];
    this.chartData.push(
      { position: "Point Guard", avg: avgs.pg },
      { position: "Shooting Guard", avg: avgs.sg },
      { position: "Small Forward", avg: avgs.sf },
      { position: "Power Forward", avg: avgs.pf },
      { position: "Center", avg: avgs.c }
    );
  },
};
</script>
<style scoped>
.court {
  background-image: url("../../assets/images/courts/court.svg");
  width: 800px;
  height: 500px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>

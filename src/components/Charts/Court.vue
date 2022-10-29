<template>
  <div class="chart-wrapper">
    <div class="court">
      <player-tile
        :name="stats.pg.name"
        :image="stats.pg.image"
        :team="stats.pg.team"
        :avg="stats.pg.avg"
        id="point-guard"
      />
      <player-tile
        :name="stats.sf.name"
        :image="stats.sf.image"
        :team="stats.sf.team"
        :avg="stats.sf.avg"
        id="small-forward"
      />
      <radar-chart id="chart" />
      <player-tile
        :name="stats.sg.name"
        :image="stats.sg.image"
        :team="stats.sg.team"
        :avg="stats.sg.avg"
        id="shooting-guard"
      />
      <player-tile
        :name="stats.c.name"
        :image="stats.c.image"
        :team="stats.c.team"
        :avg="stats.c.avg"
        id="center"
      />
      <player-tile
        :name="stats.pf.name"
        :image="stats.pf.image"
        :team="stats.pf.team"
        :avg="stats.pf.avg"
        id="power-forward"
      />
    </div>
  </div>
</template>
<script>
import PlayerTile from "@/components/Charts/PlayerTile";
import RadarChart from "@/components/Charts/RadarChart";
import { getRbLeagueLeaders } from "@/services/dataService";

export default {
  name: "Court",
  components: {
    PlayerTile,
    RadarChart,
  },
  data() {
    return {
      stats: [],
    };
  },
  mounted() {
    this.stats = getRbLeagueLeaders();
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
}

#point-guard {
  grid-column: 2/3;
}

#small-forward {
  grid-column: 1/2;
  grid-row: 2/3;
}

#shooting-guard {
  grid-column: 3/4;
  grid-row: 2/3;
}

#center {
  grid-column: 1/2;
  grid-row: 3/4;
}

#power-forward {
  grid-column: 3/4;
  grid-row: 3/4;
}

#chart {
  grid-column: 2/3;
  grid-row: 2/4;
  z-index: 9999;
}
</style>

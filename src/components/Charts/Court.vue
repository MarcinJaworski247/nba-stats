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
}
</style>

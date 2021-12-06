<template>
  <div>
    <div class="chart-wrapper">
      <dx-vector-map :bounds="bounds" v-if="markers.features.length">
        <dx-size :height="600" :width="1400" />
        <!-- USA map -->
        <dx-layer
          :data-source="usa"
          border-color="white"
          name="areas"
          color-grouping-field="population"
          :customize="customizeLayer"
        />

        <!-- NBA teams Logos -->
        <dx-layer
          :data-source="teamsData"
          data-field="url"
          element-type="image"
          type="marker"
          :size="91"
        />
        <!-- Bubble Markers -->
        <dx-layer
          :data-source="markers"
          :opacity="0.8"
          :min-size="10"
          :max-size="60"
          name="bubbles"
          element-type="bubble"
          data-field="value"
          :size-groups="sizeGroups"
          v-if="markers.features && markers.features.length"
        />
        <dx-legend
          :customize-items="customizeItems"
          :customize-text="customizeText"
          marker-shape="circle"
          horizontalAlignment="right"
          vertical-alignment="bottom"
          hover-mode="excludePoints"
          position="outside"
        >
          <dx-source layer="bubbles" grouping="size" />
        </dx-legend>
        <dx-tooltip :enabled="true" :customize-tooltip="customizeTooltip" />
      </dx-vector-map>
    </div>
  </div>
</template>
<script>
// devextreme map
import * as mapsData from "devextreme/dist/js/vectormap-data/usa.js";
import {
  DxVectorMap,
  DxLayer,
  DxTooltip,
  DxSize,
  DxLegend,
  DxSource,
} from "devextreme-vue/vector-map";

import { getTeamWins } from "@/services/dataService";

export default {
  name: "Map",
  components: {
    DxVectorMap,
    DxTooltip,
    DxLayer,
    DxSize,
    DxLegend,
    DxSource,
  },
  data() {
    return {
      usa: mapsData.usa,
      bounds: [-94, 50, -100, 23],
      headers: ["Drużyna", "Konferencja", "Ilość wygranych"],
      data: [],
      chartData: [],
      teamsData: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-104.991997, 39.740002],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Denver_Nuggets.svg/1200px-Denver_Nuggets.svg.png",
              text: "Denver Nuggets",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.016251, 38.904758],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Washington_Wizards_logo.svg/1200px-Washington_Wizards_logo.svg.png",
              text: "Washington Wizards",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-84.423058, 33.763191],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Atlanta_Hawks_logo.svg/1200px-Atlanta_Hawks_logo.svg.png",
              text: "Atlanta Hawks",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-97.514839, 35.466179],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Oklahoma_City_Thunder.svg/1200px-Oklahoma_City_Thunder.svg.png",
              text: "Oklahoma City Thunder",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-87.932408, 41.484151],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Chicago_Bulls_logo.svg/1200px-Chicago_Bulls_logo.svg.png",
              text: "Chicago Bulls",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-95.381889, 29.775419],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Houston_Rockets.svg/1200px-Houston_Rockets.svg.png",
              text: "Houston Rockets",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-116.245003, 32.053501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/1200px-Los_Angeles_Clippers_%282015%29.svg.png",
              text: "Los Angeles Clippers",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-70.016251, 44.904758],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/1200px-Boston_Celtics.svg.png",
              text: "Boston Celtics",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-74.016251, 41.904758],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/New_York_Knicks_logo.svg/1200px-New_York_Knicks_logo.svg.png",
              text: "New York Knicks",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-94.632408, 47.884151],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Minnesota_Timberwolves_logo.svg/1200px-Minnesota_Timberwolves_logo.svg.png",
              text: "Minesota Timberwolves",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-118.245003, 35.053501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2560px-Los_Angeles_Lakers_logo.svg.png",
              text: "Los Angeles Lakers",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-120.245003, 38.053501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/1200px-Golden_State_Warriors_logo.svg.png",
              text: "Golden State Warriors",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-122.245003, 41.453501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/SacramentoKings.svg/1200px-SacramentoKings.svg.png",
              text: "Sacramento Kings",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-122.245003, 44.653501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/commons/b/bb/TrailBlazers.svg.png",
              text: "Portland Trail Blazers",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-111.245003, 34.653501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Phoenix_Suns_logo.svg/1200px-Phoenix_Suns_logo.svg.png",
              text: "Phoenix Suns",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-112.245003, 40.653501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utah_Jazz_logo_%282016%29.svg/1200px-Utah_Jazz_logo_%282016%29.svg.png",
              text: "Utah Jazz",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-102.245003, 30.653501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/San_Antonio_Spurs_Wordmark_Logo_2017-current.png",
              text: "San Antonio Spurs",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-98.245003, 32.653501],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/1200px-Dallas_Mavericks_logo.svg.png",
              text: "Dallas Mavericks",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-89.632408, 45.484151],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Milwaukee_Bucks_logo.svg/1200px-Milwaukee_Bucks_logo.svg.png",
              text: "Milwaukee Bucks",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-83.632408, 43.984151],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Detroit_Pistons_primary_logo_2017.png",
              text: "Detroit Pistons",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-81.632408, 40.584151],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/2017_Cleveland_Cavaliers_wordmark_logo.svg/1200px-2017_Cleveland_Cavaliers_wordmark_logo.svg.png",
              text: "Cleveland Cavaliers",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.632408, 41.584151],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/1200px-Philadelphia_76ers_logo.svg.png",
              text: "Philadelphia 76ers",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-74.632408, 39.584151],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/1200px-Brooklyn_Nets_newlogo.svg.png",
              text: "Brooklyn Nets",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-88.823058, 35.763191],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/1200px-Memphis_Grizzlies.svg.png",
              text: "Memphis Grizzlies",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-84.823058, 38.263191],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Indiana_Pacers.svg/1200px-Indiana_Pacers.svg.png",
              text: "Indiana Pacers",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-80.823058, 26.263191],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/1200px-Miami_Heat_logo.svg.png",
              text: "Miami Heat",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-81.823058, 29.763191],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Orlando_Magic_logo.svg/1200px-Orlando_Magic_logo.svg.png",
              text: "Orlando Magic",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-89.823058, 29.763191],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/New_Orleans_Pelicans_logo.svg/1200px-New_Orleans_Pelicans_logo.svg.png",
              text: "New Orleans Pelicans",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-79.823058, 34.763191],
            },
            properties: {
              url: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Charlotte_Hornets_%282014%29.svg/1200px-Charlotte_Hornets_%282014%29.svg.png",
              text: "Charlotte Hornets",
            },
          },
        ],
      },
      markers: {
        type: "FeatureCollection",
        features: [],
      },
      sizeGroups: [15, 25, 35, 45, 55, 65],
    };
  },
  methods: {
    customizeTooltip(info) {
      if (info.layer.type === "marker") {
        return { text: info.attribute("tooltip") };
      }
      return null;
    },
    customizeText({ index }) {
      return [
        "15 to 25 wins",
        "25 to 35 wins",
        "35 to 45 wins",
        "45 to 55 wins",
        "55 to 65 wins",
      ][index];
    },
    customizeItems(items) {
      return items.reverse();
    },
    customizeLayer(elements) {
      const east = "#7ad9ff";
      const west = "#ff7a7a";
      elements.forEach((element) => {
        if (element.index === 0) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 1) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 2) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 3) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 4) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 5) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 5) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 6) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 7) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 8) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 9) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 10) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 11) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 12) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 13) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 14) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 15) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 16) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 17) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 18) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 19) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 20) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 21) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 22) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 23) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 24) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 25) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 26) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 27) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 28) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 29) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 30) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 31) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 32) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 33) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 34) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 35) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 36) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 37) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 38) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 39) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 40) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 41) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 42) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 43) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 44) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 45) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 46) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 47) {
          element.applySettings({
            color: west,
          });
        }
        if (element.index === 48) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 49) {
          element.applySettings({
            color: east,
          });
        }
        if (element.index === 50) {
          element.applySettings({
            color: west,
          });
        }
      });
    },
  },
  mounted() {
    this.markers.features = getTeamWins();

    for (const item of this.markers.features) {
      this.data.push([
        item.properties.name,
        item.properties.conference,
        item.properties.value,
      ]);
    }

    this.data.sort((a, b) => {
      if (a[2] < b[2]) return -1;
      if (a[2] > b[2]) return 1;
      return 0;
    });

    let eastWins = 0;
    let westWins = 0;
    for (const item of this.data) {
      if (item[1] === "wschodnia") {
        eastWins += item[2];
      }
      if (item[1] === "zachodnia") {
        westWins += item[2];
      }
    }

    this.chartData.push(
      { conference: "Konferencja wschodnia", wins: eastWins },
      { conference: "Kofnerecja zachodnia", wins: westWins }
    );
  },
};
</script>

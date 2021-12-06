<template>
  <div>
    <app-header text="Najlepsi strzelcy oraz ligowe średnie według pozycji " />
    <div class="mt-5">
      <court />
    </div>
  </div>
</template>
<script>
import Court from "@/components/Charts/Court";
import AppHeader from "@/components/App/AppHeader";

export default {
  name: "CourtIndex",
  components: {
    Court,
    AppHeader,
  },
};
</script>
<style scoped>
.mt-5 {
  margin-top: 40px;
}
</style>

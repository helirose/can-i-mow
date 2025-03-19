<script setup lang="ts">
import { ref } from 'vue'
import { WeatherService } from '@/services/WeatherService'

const location = ref('')
const weatherData = ref<string | false>('')
const weatherService = new WeatherService()

const fetchWeather = async (location: string) => {
  if (!location.trim()) return
  weatherData.value = await weatherService.getWeatherAndSoilMoisture(location)
}

const handleSubmit = () => {
  fetchWeather(location.value)
}
</script>

<template>
  <div class="flex flex-col glass-panel">
    <form class="w-full flex flex-col gap-2">
      <label class="flex flex-col text-lg" for="location"
        >Enter your postcode
        <input
          class="bg-white rounded-lg mt-2 mb-4 p-4 text-grey-950"
          type="text"
          name="location"
          v-model="location"
        />
      </label>
      <button
        class="flex-none bg-green-900 rounded-lg p-4 text-white"
        @click="handleSubmit"
        type="submit"
      >
        Can I mow?
      </button>
    </form>
  </div>
</template>

<style>
/* .glossy-transparent {
  backdrop-filter: blur(10px);
} */
</style>

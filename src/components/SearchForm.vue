<script setup lang="ts">
import { ref, computed } from 'vue'
import validator from 'validator'
import { AlertTriangle } from 'lucide-vue-next'
import { WeatherService } from '@/services/WeatherService'

const location = ref('')

const errors = ref('')

const weatherData = ref<string | false>('')
const weatherService = new WeatherService()

const trimmedLocation = computed(() => location.value.trim())
const isFormValid = computed(() => !errors.value && trimmedLocation.value !== '')

/* Validate postcode */
const isPostCodeValid = () => {
  if (!validator.isPostalCode(trimmedLocation.value, 'any')) {
    errors.value = 'Please enter a valid postal/zip code'
  } else {
    errors.value = ''
  }
}

const fetchWeather = async (location: string) => {
  if (!location.trim()) return
  weatherData.value = await weatherService.getWeatherAndSoilMoisture(location)
}

const handleSubmit = () => {
  errors.value = ''
  if (isFormValid.value) {
    fetchWeather(trimmedLocation.value)
  }
}
</script>

<template>
  <div class="flex flex-col glass-panel">
    <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-2">
      <label class="flex flex-col text-lg" for="location">Enter your postcode</label>
      <span v-if="errors"><AlertTriangle />{{ errors }}</span>
      <input
        class="bg-white rounded-lg mt-2 mb-4 p-4 text-grey-950"
        type="text"
        id="location"
        name="location"
        v-model="location"
        @input="isPostCodeValid"
      />
      <button
        class="flex-none bg-green-900 rounded-lg p-4 text-white"
        type="submit"
        :disabled="!isFormValid"
      >
        Can I mow?
      </button>
    </form>
  </div>
</template>

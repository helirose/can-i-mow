export class WeatherService {
  private apiKey = 'FXTXY852E7VVBK4M5T3G679BB'
  private baseUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
  private cacheKeyPrefix = 'weather_cache_'
  private cacheDuration = 3600000 // 1 hour in milliseconds

  async getWeatherAndSoilMoisture(location: string): Promise<string | false> {
    const cacheKey = this.cacheKeyPrefix + location
    const cachedData = localStorage.getItem(cacheKey)

    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData)
      if (Date.now() - timestamp < this.cacheDuration) {
        console.log('Using cached data')
        return data
      }
    }

    const url = `${this.baseUrl}/${encodeURIComponent(location)}?unitGroup=metric&key=${this.apiKey}&contentType=json&include=days&elements=datetime,temp,precip,soilmoisture01,soilmoisture04,soilmoisture10,soilmoisture20`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch weather and soil data')
      }
      const data = await response.json()

      // Store response in localStorage
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }))

      return data
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

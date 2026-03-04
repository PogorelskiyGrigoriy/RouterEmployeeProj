"use client"
import { useAnalytics } from "@/services/hooks/useAnalytics"
import { StatisticsChart } from "@/components/StatisticsChart"

const AgeStatisticsPage = () => {
  const chartData = useAnalytics('age')
  if (!chartData.length) return null

  return (
    <StatisticsChart
      title="Age Distribution"
      data={chartData}
      dataKeyX="xValue"
      dataKeyY="yValue"
      tooltipLabelKey="tooltipValue"
    />
  )
}
export default AgeStatisticsPage
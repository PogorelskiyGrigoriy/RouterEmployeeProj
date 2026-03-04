"use client"
import { useAnalytics } from "@/services/hooks/useAnalytics"
import { StatisticsChart } from "@/components/StatisticsChart"

const SalaryStatisticsPage = () => {
  const chartData = useAnalytics('salary')
  if (!chartData.length) return null

  return (
    <StatisticsChart
      title="Salary Distribution"
      data={chartData}
      dataKeyX="xValue"
      dataKeyY="yValue"
      tooltipLabelKey="tooltipValue"
    />
  )
}
export default SalaryStatisticsPage
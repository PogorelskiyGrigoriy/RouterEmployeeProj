"use client"

import { useAnalytics } from "@/services/hooks/useAnalytics"
import { StatisticsChart } from "@/components/StatisticsChart"

const DepartmentStatisticsPage = () => {
    const chartData = useAnalytics('department')
    if (!chartData.length) return null

    return (
        <StatisticsChart
            title="Employees by Department"
            data={chartData}
        />
    )
}

export default DepartmentStatisticsPage
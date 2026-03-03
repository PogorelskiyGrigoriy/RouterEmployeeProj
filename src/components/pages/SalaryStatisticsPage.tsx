import { range, countBy } from "lodash"
import { Box, Heading, Container, VStack } from "@chakra-ui/react"
import { Chart, useChart } from "@chakra-ui/charts"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import useEmployees from "@/services/hooks/useEmployees"
import employeesConfig from "@/config/employees-config"

const SalaryStatisticsPage = () => {
  const { employees } = useEmployees()
  const { min, max, interval } = employeesConfig.salary

  // Группируем сотрудников по интервалам
  const stats = countBy(employees, (emp) => {
    return Math.floor(emp.salary / interval) * interval
  })

  // Формируем финальный массив данных для графика
  const chartData = range(min, max, interval).map((v) => ({
    count: stats[v] || 0, // Берем значение из сгруппированного объекта или 0
    interval: `${v / 1000}k-${(v + interval - 1) / 1000}k`,
  }))

  const chart = useChart({
    data: chartData,
    series: [{ name: "count", color: "blue.solid" }],
  })

  if (!employees?.length) return null

  return (
    <Container maxW="container.xl" py="8">
      <VStack align="start" gap="1" mb="8">
        <Heading size="2xl" letterSpacing="tight">Salary Insights</Heading>
      </VStack>

      <Box p="6" borderWidth="1px" borderRadius="2xl" bg="bg.panel" boxShadow="sm">
        <Chart.Root maxH="md" chart={chart}>
          <LineChart data={chart.data} responsive>
            <CartesianGrid stroke={chart.color("border")} vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="interval"
              stroke={chart.color("border")}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              stroke={chart.color("border")}
              allowDecimals={false}
            />
            <Tooltip
              animationDuration={100}
              cursor={{ stroke: chart.color("border"), strokeDasharray: "4 4" }}
              content={<Chart.Tooltip />}
            />
            {chart.series.map((item) => (
              <Line
                key={item.name}
                type="monotone"
                dataKey={chart.key(item.name)}
                stroke={chart.color(item.color)}
                strokeWidth={3}
                dot={{ r: 4, fill: chart.color(item.color), strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </Chart.Root>
      </Box>
    </Container>
  )
}

export default SalaryStatisticsPage
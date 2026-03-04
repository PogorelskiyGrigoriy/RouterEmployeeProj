import { useMemo } from "react"
import { range, countBy } from "lodash"
import { Box, Heading, Container, useToken } from "@chakra-ui/react"
import {
  CartesianGrid,
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts"
import useEmployees from "@/services/hooks/useEmployees"
import employeesConfig from "@/config/employees-config"

const SalaryStatisticsPage = () => {
  const { employees } = useEmployees()
  const { min, max, interval } = employeesConfig.salary

  // Достаем цвета из темы Chakra, чтобы график соответствовал дизайну
  const [blue500, gray500, gray100] = useToken("colors", ["blue.500", "gray.500", "gray.100"])

  const chartData = useMemo(() => {
    if (!employees?.length) return []

    const stats = countBy(employees, (e) => {
      const offset = e.salary - min
      return Math.floor(offset / interval) * interval + min
    })

    return range(min, max, interval).map((v) => ({
      tickName: `${v / 1000}k`,
      count: stats[v] || 0,
      fullRange: `$${v.toLocaleString()} — $${(v + interval - 1).toLocaleString()}`,
    }))
  }, [employees, min, max, interval])

  if (!employees?.length) return null

  return (
    <Container maxW="container.xl" py="8">
      <Heading size="2xl" mb="8" letterSpacing="tight">Salary Distribution</Heading>

      <Box p="6" borderWidth="1px" borderRadius="2xl" bg="bg.panel" boxShadow="sm" height="400px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gray100} />

            <XAxis
              dataKey="tickName"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: gray500 }}
              interval={0}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: gray500 }}
              allowDecimals={false}
            />

            <Tooltip
              cursor={{ fill: gray100, opacity: 0.5 }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              labelFormatter={(_, payload) => payload[0]?.payload?.fullRange}
            />

            <Bar
              dataKey="count"
              fill={blue500}
              radius={[4, 4, 0, 0]}
              barSize={Math.min(50, 500 / chartData.length)}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  )
}

export default SalaryStatisticsPage
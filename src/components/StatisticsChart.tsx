"use client"

import { Box, Heading, Container, useToken } from "@chakra-ui/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { StatsChartProps, StatsDataItem } from "@/models/StatisticsChartInterface"

export const StatisticsChart = <T extends StatsDataItem>({ 
  title, data, dataKeyX, dataKeyY, tooltipLabelKey 
}: StatsChartProps<T>) => {
  // Получаем цвета
  const [accent, gray500, gridColor, textDark] = useToken("colors", [
    "blue.500", "gray.500", "gray.100", "gray.800"
  ])

  return (
    <Container maxW="container.xl" py="8">
      <Heading size="2xl" mb="8" letterSpacing="tight">
        {title}
      </Heading>
      
      <Box 
        p="6" 
        borderWidth="1px" 
        borderRadius="2xl" 
        bg="bg.panel" 
        height="400px"
        shadow="sm"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            
            <XAxis 
              dataKey={dataKeyX} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: gray500 }} 
              interval="preserveStartEnd" // Авто-скрытие меток, если их слишком много
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: gray500 }} 
              allowDecimals={false} 
            />
            
            <Tooltip
              cursor={{ fill: gridColor, opacity: 0.5 }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: 'var(--chakra-shadows-lg)',
                backgroundColor: 'white',
              }}
              labelStyle={{ color: textDark, fontWeight: 'bold', marginBottom: '4px' }}
              itemStyle={{ color: textDark, fontSize: '14px' }}
              // Оптимизировали проверку через опциональную цепочку
              labelFormatter={(_, payload) => payload?.[0]?.payload?.[tooltipLabelKey] ?? ""}
            />
            
            <Bar 
              dataKey={dataKeyY} 
              fill={accent} 
              radius={[4, 4, 0, 0]} 
              // Если столбцов много, они сами станут уже
              minPointSize={2} 
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  )
}
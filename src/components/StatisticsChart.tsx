"use client";

import { Box, Heading, Container, useToken } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { StatsChartProps } from "@/models/StatsInterface";

export const StatisticsChart = ({
  title,
  data,
  dataKeyX = "xValue",
  dataKeyY = "yValue",
  labelY = "Employees",
  tooltipLabelKey = "tooltipValue",
}: StatsChartProps) => {
  const [accent, gray500, gridColor, textDark] = useToken("colors", [
    "blue.500",
    "gray.500",
    "gray.100",
    "gray.800",
  ]);

  return (
    // Убираем вертикальные отступы контейнера на мобилках (py="0")
    <Container maxW="container.xl" py={{ base: "0", md: "8" }} px="0">
      <Heading 
        size={{ base: "lg", md: "2xl" }} 
        mb={{ base: "4", md: "8" }} 
        letterSpacing="tight"
      >
        {title}
      </Heading>

      <Box
        p={{ base: "3", md: "6" }}
        borderWidth="1px"
        borderRadius={{ base: "xl", md: "2xl" }}
        bg="bg.panel"
        height={{ base: "300px", md: "400px" }}
        shadow="sm"
        // ПРАВКИ ДЛЯ КОНСОЛИ:
        minW="0" 
        minH="0"
        position="relative"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={gridColor}
            />
            <XAxis
              dataKey={dataKeyX}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: gray500 }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: gray500 }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: gridColor, opacity: 0.5 }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "var(--chakra-shadows-lg)",
                backgroundColor: "white",
              }}
              labelStyle={{
                color: textDark,
                fontWeight: "bold",
                marginBottom: "2px",
              }}
              itemStyle={{ color: textDark, fontSize: "12px" }}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.[tooltipLabelKey] ?? ""
              }
            />
            <Bar
              dataKey={dataKeyY}
              name={labelY}
              fill={accent}
              radius={[4, 4, 0, 0]}
              minPointSize={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};
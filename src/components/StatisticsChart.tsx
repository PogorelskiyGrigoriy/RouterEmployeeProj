/**
 * @module StatisticsChart
 * Responsive bar chart integrated with Chakra UI theme tokens.
 * Data keys are strictly typed to ensure consistency with Zod-validated stats.
 */

"use client";

import { useMemo } from "react";
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

import type { StatsChartProps } from "@/schemas/statsInterface.schema";

const CHART_MARGIN = { top: 10, right: 10, left: -20, bottom: 0 } as const;

export const StatisticsChart = ({
  title,
  data,
  dataKeyX = "xValue",
  dataKeyY = "yValue",
  labelY = "Employees",
  tooltipLabelKey = "tooltipValue",
}: StatsChartProps) => {
  const [accent, grayMuted, gridColor, textPrimary] = useToken("colors", [
    "blue.500",
    "fg.muted",
    "border.subtle",
    "fg.emphasized",
  ]);

  // Memoize tooltip styles
  const tooltipStyles = useMemo(() => ({
    contentStyle: {
      borderRadius: "12px",
      border: "none",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      backgroundColor: "var(--chakra-colors-bg-panel)",
      padding: "8px 12px",
    },
    labelStyle: {
      color: textPrimary,
      fontWeight: "bold",
      fontSize: "13px",
      marginBottom: "2px",
    },
    itemStyle: { 
      color: textPrimary, 
      fontSize: "12px",
      padding: "0" 
    }
  }), [textPrimary]);

  return (
    <Container>
      <Heading 
        size={{ base: "md", md: "xl" }} 
        mb={{ base: "4", md: "6" }} 
        fontWeight="bold"
        letterSpacing="tight"
      >
        {title}
      </Heading>

      <Box
        p={{ base: "2", md: "5" }}
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="2xl"
        bg="bg.panel"
        height={{ base: "280px", md: "400px" }}
        shadow="xs"
        position="relative"
      >
        <ResponsiveContainer>
          <BarChart data={data} margin={CHART_MARGIN}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={gridColor}
            />
            
            <XAxis
              dataKey={dataKeyX as string}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: grayMuted }}
              dy={10}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: grayMuted }}
              allowDecimals={false}
              dx={-5}
            />
            
            <Tooltip
              cursor={{ fill: gridColor, opacity: 0.4 }}
              contentStyle={tooltipStyles.contentStyle}
              labelStyle={tooltipStyles.labelStyle}
              itemStyle={tooltipStyles.itemStyle}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.[tooltipLabelKey as string] ?? ""
              }
            />
            
            <Bar
              dataKey={dataKeyY as string}
              name={labelY}
              fill={accent}
              radius={[4, 4, 0, 0]}
              barSize={32}
              minPointSize={3}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};
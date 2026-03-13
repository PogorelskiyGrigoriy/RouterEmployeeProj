/**
 * @module StatisticsSelector
 * Role-based dropdown for switching between different statistics dashboards.
 */

"use client";

import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Icon } from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";

import { 
  MenuContent, 
  MenuItem, 
  MenuRoot, 
  MenuTrigger 
} from "@/components/ui/menu"; 

import { STATS_NAV_LINKS } from "@/config/navigation";
// Importing updated selectors
import { useIsAuthenticated, useUserRole } from "@/store/useAuthStore";

export const StatisticsSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Refactored: Accessing auth state via specialized selectors.
   */
  const isAuthenticated = useIsAuthenticated();
  const userRole = useUserRole();

  /**
   * 1. Permission-based Filtering.
   * Filters available statistics views based on the current user's role.
   */
  const allowedStats = useMemo(() => {
    if (!isAuthenticated || !userRole) return [];
    return STATS_NAV_LINKS.filter(link => link.roles.includes(userRole));
  }, [isAuthenticated, userRole]);

  /**
   * 2. Active View Tracking.
   * Identifies which statistics dashboard is currently displayed based on URL.
   */
  const activeStat = useMemo(() => {
    return allowedStats.find(link => link.to === location.pathname);
  }, [allowedStats, location.pathname]);

  // Hide the selector if no views are available for the current role
  if (allowedStats.length === 0) return null;

  return (
    <MenuRoot positioning={{ placement: "bottom-end" }}>
      <MenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          bg="bg.panel" 
          borderColor={activeStat ? "blue.500" : "border.emphasized"}
          color={activeStat ? "blue.600" : "fg.emphasized"}
          fontWeight={activeStat ? "bold" : "medium"}
          px="4"
          height="36px"
          _hover={{ 
            bg: "blue.50", 
            borderColor: "blue.400",
          }}
        >
          {activeStat ? activeStat.label : "Statistics"} 
          <Icon 
            as={LuChevronDown} 
            ms="2" 
            transition="transform 0.2s"
            color={activeStat ? "blue.500" : "fg.muted"} 
          />
        </Button>
      </MenuTrigger>
      
      <MenuContent minW="180px">
        {allowedStats.map((item) => {
          const isSelected = item.to === location.pathname;
          
          return (
            <MenuItem 
              key={item.to} 
              value={item.to}
              onClick={() => navigate(item.to)}
              color={isSelected ? "blue.600" : "inherit"}
              fontWeight={isSelected ? "bold" : "normal"}
              cursor="pointer"
            >
              {item.label}
            </MenuItem>
          );
        })}
      </MenuContent>
    </MenuRoot>
  );
};
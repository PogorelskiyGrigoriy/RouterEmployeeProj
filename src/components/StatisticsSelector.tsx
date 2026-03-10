"use client";

import { Button } from "@chakra-ui/react";
import { 
  MenuContent, 
  MenuItem, 
  MenuRoot, 
  MenuTrigger 
} from "@/components/ui/menu"; 
import { useNavigate, useLocation } from "react-router-dom";
import { STATS_NAV_LINKS } from "@/config/navigation";
import { LuChevronDown } from "react-icons/lu";
import { useAuthStore } from "@/store/useAuthStore"; 

const StatisticsSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore(); // Достаем данные юзера

  // 1. Фильтруем ссылки на основе роли пользователя
  // Это гарантирует, что юзер не увидит в меню то, на что у него нет прав
  const allowedStats = STATS_NAV_LINKS.filter(link => 
    isAuthenticated && user ? link.roles.includes(user.role) : false
  );

  // 2. Определяем активный пункт среди РАЗРЕШЕННЫХ ссылок
  const activeStat = allowedStats.find(link => link.to === location.pathname);
  const buttonLabel = activeStat ? activeStat.label : "Statistics";

  // Если для данной роли нет доступных графиков, вообще не рендерим селектор
  if (allowedStats.length === 0) return null;

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          bg="white" 
          color={activeStat ? "blue.600" : "gray.700"}
          borderColor={activeStat ? "blue.500" : "gray.300"}
          borderWidth="1px"
          px="4"
          height="36px"
          fontWeight={activeStat ? "bold" : "medium"}
          boxShadow="sm"
          _hover={{ 
            bg: "blue.50", 
            borderColor: "blue.400",
            color: "blue.700"
          }}
          _active={{
            bg: "blue.100"
          }}
          transition="all 0.2s"
        >
          {buttonLabel} 
          <LuChevronDown style={{ 
            marginLeft: '8px', 
            transition: 'transform 0.2s',
            color: activeStat ? "inherit" : "gray.400" 
          }} />
        </Button>
      </MenuTrigger>
      <MenuContent>
        {/* Рендерим только те пункты, которые прошли фильтрацию по ролям */}
        {allowedStats.map((item) => (
          <MenuItem 
            key={item.to} 
            value={item.to}
            onClick={() => navigate(item.to)}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default StatisticsSelector;
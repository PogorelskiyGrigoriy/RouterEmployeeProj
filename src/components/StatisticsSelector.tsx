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

const StatisticsSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Определяем текст на кнопке: если мы на странице статистики — пишем её имя, иначе "Statistics"
  const activeStat = STATS_NAV_LINKS.find(link => link.to === location.pathname);
  const buttonLabel = activeStat ? activeStat.label : "Statistics";

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          // Стили для контраста на бежевом/сером фоне
          bg="white" 
          color={activeStat ? "blue.600" : "gray.700"}
          borderColor={activeStat ? "blue.500" : "gray.300"}
          borderWidth="1px"
          px="4"
          height="36px"
          fontWeight={activeStat ? "bold" : "medium"}
          boxShadow="sm" // Легкая тень для отделения от фона
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
        {STATS_NAV_LINKS.map((item) => (
          <MenuItem 
            key={item.to} 
            value={item.to}
            onClick={() => navigate(item.to)}
            closeOnSelect
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default StatisticsSelector;
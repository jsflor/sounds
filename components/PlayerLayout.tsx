import { Box } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";

const PlayerLayout = ({children}) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" left="0" width="250px">
        <Sidebar/>
      </Box>
      <Box marginLeft="250" marginBottom="100px">
        {children}
      </Box>
      <Box position="absolute" bottom="0" left="0" height="100px">
        Player bar
      </Box>
    </Box>
  );
};

export default PlayerLayout;
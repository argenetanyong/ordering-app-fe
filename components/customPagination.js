import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const CustomPagination = (props) => {
  const { itemsCount, pageSize, handlePageChange } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  return (
    <Box>
      <Stack>
        <Pagination
          sx={{ margin: " 0 auto 50px" }}
          count={pageCount}
          size="small"
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
};

export default CustomPagination;

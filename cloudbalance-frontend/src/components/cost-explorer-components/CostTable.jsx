import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { fomateTableData } from "../../utils/formateTableData";

const CostTable = ({ costData }) => {
  const { group, headings, filterCost } = fomateTableData(costData);

  const formatDate = (dateString) => dayjs(dateString).format("MMM YYYY");

  const monthCount = filterCost[0]?.costs.length || 0;

  const columnTotals = Array.from({ length: monthCount }, (_, colIdx) =>
    filterCost.reduce((sum, filter) => sum + (filter.costs[colIdx] || 0), 0)
  );

  const grandTotal = columnTotals.reduce((a, b) => a + b, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 500,
        overflow: "auto",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Table
        stickyHeader
        sx={{
          minWidth: 650,
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
        size="small"
        aria-label="cost table"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell
              sx={{
                fontWeight: "bold",
                position: "sticky",
                left: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 2,
              }}
            >
              {group}
            </TableCell>

            {headings[0].category.map((heading, idx) => (
              <TableCell
                key={idx}
                align="right"
                sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
              >
                {formatDate(heading.label)}
              </TableCell>
            ))}
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filterCost.map((filter) => {
            const rowTotal = filter.costs.reduce((a, b) => a + b, 0);
            return (
              <TableRow key={filter.service} hover>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#fff",
                    fontWeight: 500,
                    zIndex: 1,
                  }}
                >
                  {filter.service}
                </TableCell>

                {filter.costs.map((cost, idx) => (
                  <TableCell key={idx} align="right">
                    {cost.toLocaleString()}
                  </TableCell>
                ))}

                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {rowTotal.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}

          {/* Total Row */}
          <TableRow
            sx={{
              fontWeight: "bold",
              backgroundColor: "#f0f0f0",
              borderTop: "2px solid #ccc",
            }}
          >
            <TableCell>Total</TableCell>
            {columnTotals.map((total, idx) => (
              <TableCell key={idx} align="right">
                {total.toLocaleString()}
              </TableCell>
            ))}
            <TableCell align="right">{grandTotal.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CostTable;

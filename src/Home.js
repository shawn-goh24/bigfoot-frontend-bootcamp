import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "./constants";

const tableColumns = [
  { id: "index", label: "Index" },
  { id: "county", label: "County", minWidth: "100px" },
  { id: "year", label: "Year", minWidth: "100px" },
  { id: "season", label: "Season" },
  { id: "month", label: "Month" },
];

export default function Home() {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterYear, setFilterYear] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const year = searchParams.get("year");
    const page = searchParams.get("page");
    const getData = async () => {
      const response = await fetch(
        year !== null
          ? `${BACKEND_URL}/sightings?year=${year}&page=${page}`
          : `${BACKEND_URL}/sightings`
      );
      const jsonData = await response.json();
      setDatas(jsonData);
    };

    getData();
  }, [searchParams]);

  const createData = (index, county, year, season, month) => {
    return { index, county, year, season, month };
  };

  const tableRows = [];
  if (datas.length !== 0) {
    datas.forEach((data, i) => {
      tableRows.push(
        createData(data.INDEX, data.COUNTY, data.YEAR, data.SEASON, data.MONTH)
      );
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (filterYear !== "") {
      setSearchParams({ filter: "year", year: filterYear, page: newPage });
    } else {
      setSearchParams({ page: newPage });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (filterYear !== "") {
      setSearchParams({ filter: "year", year: filterYear, page: page });
    } else {
      setSearchParams({});
    }
  };

  return (
    <header className="App-header">
      <h1>Home page</h1>
      <form onSubmit={handleSubmit} style={{ paddingBottom: "5px" }}>
        <FormControl>
          <InputLabel sx={{ color: "white" }}>Filter year</InputLabel>
          <Input
            onChange={(e) => setFilterYear(e.target.value)}
            sx={{ color: "white" }}
          />
        </FormControl>
      </form>
      <Paper sx={{ width: "70%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {tableColumns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "county" ? (
                              <Link to={`/sightings/${row["index"]}`}>
                                {/* Link does not go to correct sight after filtering */}
                                {value}
                              </Link>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </header>
  );
}

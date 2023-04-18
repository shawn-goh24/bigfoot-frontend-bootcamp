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
  Button,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "./constants";

const tableColumns = [
  { id: "index", label: "Index" },
  { id: "date", label: "Date" },
  {
    id: "location_description",
    label: "Location Description",
    minWidth: "100px",
  },
  { id: "city", label: "City" },
  { id: "country", label: "Country" },
];

export default function Home() {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterYear, setFilterYear] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

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
      console.log(jsonData);
      setDatas(jsonData);
    };

    getData();
  }, [searchParams]);

  const createData = (index, date, location_description, city, country) => {
    return { index, date, location_description, city, country };
  };

  const tableRows = [];
  if (datas.length !== 0) {
    datas.forEach((data, i) => {
      tableRows.push(
        createData(
          data.id,
          data.date,
          data.location_description,
          data.city,
          data.country
        )
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

  const tableValues = (text, row, value) => {
    if (text === "date") {
      return new Date(value).toLocaleDateString();
    } else {
      return value;
    }
  };

  const moveToForm = () => {
    navigate("/sightings/new");
  };

  return (
    <header className="App-header">
      <h1>Home page</h1>
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
                            {column.id === "location_description" ? (
                              <Link to={`/sightings/${row["index"]}`}>
                                {value}
                              </Link>
                            ) : (
                              tableValues(column.id, row, value)
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
      <br />
      <Button onClick={() => navigate("/sightings/new")}>
        Add new sighting here
      </Button>
    </header>
  );
}

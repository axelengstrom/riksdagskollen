import React, { forwardRef } from "react";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import MaterialTable from "material-table";
import {
  ArrowDownward,
  FirstPage,
  Clear,
  Search,
  ChevronLeft,
  ChevronRight,
  LastPage
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import {
  getAge,
  getActiveTime,
  getGender,
  getOverallActivity
} from "../utils/functions";

import * as actionCreators from "../store/actions/actions";

import Badge from "./Badge";

const useStyles = makeStyles(() => ({
  avatar: {
    maxWidth: 40,
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.16)"
  },
  progressBackground: {
    background: "#e4e4e4",
    borderRadius: 5
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rebeccapurple"
  }
}));

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />)
};

const Table = ({ data }) => {
  const { filteredItems, items } = data;
  const classes = useStyles();

  return (
    <main className="persons">
      <MaterialTable
        options={{
          pageSize: 20
        }}
        title="Ledamöter i riksdagen"
        icons={tableIcons}
        columns={[
          {
            title: "Bild",
            sorting: false,
            render: ({
              bild_url_80: image,
              tilltalsnamn: name,
              efternamn: lastname,
              parti: party
            }) => (
              <Avatar
                className={classes.avatar}
                src={image}
                alt={`${name} ${lastname} (${party})`}
              />
            )
          },
          {
            title: "Namn",
            field: "sorteringsnamn",
            render: ({ tilltalsnamn: name, efternamn: lastname }) =>
              `${name} ${lastname}`
          },
          {
            title: "Ålder",
            field: "fodd_ar",
            render: ({ fodd_ar: age }) => getAge(age)
          },
          {
            title: "Kön",
            field: "kon",
            render: ({ kon: gender }) => getGender(gender)
          },
          {
            title: "Pondus",
            field: "authority",
            customSort: (a, b) =>
              Math.min(
                ...a.personuppdrag.uppdrag
                  .filter(item => item.from !== null)
                  .map(item => Date.parse(item.from))
              ) -
              Math.max(
                ...a.personuppdrag.uppdrag
                  .filter(item => item.tom !== null)
                  .map(item => Date.parse(item.tom))
              ) -
              (Math.min(
                ...b.personuppdrag.uppdrag
                  .filter(item => item.from !== null)
                  .map(item => Date.parse(item.from))
              ) -
                Math.max(
                  ...b.personuppdrag.uppdrag
                    .filter(item => item.tom !== null)
                    .map(item => Date.parse(item.tom))
                )),
            render: ({ personuppdrag: tasks }) => {
              const { uppdrag: taskList } = tasks;
              return (
                <div className={classes.progressBackground}>
                  <div
                    className={classes.progressBar}
                    style={{
                      width:
                        (getActiveTime(taskList) / getOverallActivity(items)) *
                          100 +
                        "%"
                    }}
                  />
                </div>
              );
            }
          },
          {
            title: "Parti",
            field: "parti",
            defaultSort: "asc",
            render: ({ parti: party }) => <Badge party={party} />
          }
        ]}
        data={filteredItems}
        localization={{
          toolbar: {
            searchPlaceholder: "Sök",
            searchTooltip: "Sök",
            nRowsSelected: "{0} rader valda"
          },
          header: {
            actions: "Handlingar"
          },
          body: {
            emptyDataSourceMessage: "Hittade inga ledamöter med dessa filter",
            filterRow: {
              filterTooltip: "Filter"
            }
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} av {count}",
            lastAriaLabel: "Sista sidan",
            lastTooltip: "Sista sidan",
            nextAriaLabel: "Nästa sida",
            nextTooltip: "Nästa sida",
            previousAriaLabel: "Föregående sida",
            previousTooltip: "Föregående sida",
            firstAriaLabel: "Första sidan",
            firstTooltip: "Första sidan",
            labelRowsSelect: "ledamöter",
            labelRowsPerPage: "Rader per sida"
          }
        }}
      />
    </main>
  );
};

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(actionCreators.fetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

export const dashboardTableSyles = {
  table: {
    style: {
      border: "none",
      position: "relative",
    },
  },

  headRow: {
    style: {
      borderBottom: "24px solid #fafafa !important",
    },
  },

  rows: {
    style: {
      minHeight: "72px", // override the row height
      fontSize: "16px",
      fontWeight: "400",
      color: "#192861",
      borderBottom: "8px solid #fafafa !important",
      boxShadow:
        "0px 8px 50px -4px rgba(16, 24, 40, 0.01), 0px 20px 50px -4px rgba(16, 24, 40, 0.03), 1px -4px 50px 4px rgba(16, 24, 40, 0.01), 0px -10px 50px 4px rgba(0, 0, 0, 0.03)",
    },
  },
  headCells: {
    style: {
      padding: "30px 10px 30px 10px",
      backgroundColor: "#FFF",
      fontSize: "14px",
      fontWeight: "500",
      color: "#192861",
      // borderBottom: "24px solid #fafafa !important",
    },
  },
  cells: {
    style: {
      paddingLeft: "10px", // override the cell padding for data cells
      paddingRight: "10px",
      minWidth: "100px",
    },
  },
};

// export const dashboardTableSyles = {
//     table: {
//       style: {
//         border: "none",
//         position: "relative",
//       },
//     },
//     rows: {
//       style: {
//         minHeight: "72px", // override the row height
//         // fontFamily: "DM Sans",
//         fontSize: "16px",
//         fontWeight: "400",
//         color: "#6976A1",
//         borderBottom: "8px solid #fafafa !important",
//       },
//     },
//     headCells: {
//       style: {
//         padding: "30px 10px 30px 10px",
//         backgroundColor: "#FFF",
//         // fontFamily: "DM Sans",
//         fontSize: "14px",
//         fontWeight: "500",
//         color: "#2B3241",
//         borderBottom: "24px solid #fafafa !important",
//       },
//     },
//     cells: {
//       style: {
//         paddingLeft: "10px", // override the cell padding for data cells
//         paddingRight: "10px",
//         minWidth: "100px",
//       },
//     },
//   };

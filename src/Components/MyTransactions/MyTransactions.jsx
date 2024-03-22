import React, { useEffect, useState } from "react";
import "./transactions.scss";
import { Input, Select, Button, Radio, Table, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { parse, unparse } from "papaparse";
function MyTransactions({ transactions,addTransaction }) {
  const [isInput, setIsinput] = useState("");
  const [filterTrans, setFilterTrans] = useState();

  useEffect(() => {
    setFilterTrans(transactions);
  }, [transactions]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      key: "tag",
      dataIndex: "tag",
    },
  ];

  const options = [
    {
      label: "No Sort",
      value: "No Sort",
    },
    {
      label: "Sort by Date",
      value: "Sort by Date",
    },
    {
      label: "Sort by Amount",
      value: "Sort by Amount",
    },
  ];
  const searchByType = (value) => {
    console.log(value);
    if (value === "all") {
      setFilterTrans(transactions);
    } else {
      const newData = transactions.filter(
        (item) => item.type.toLowerCase() === value.toLowerCase()
      );
      setFilterTrans(newData);
    }
  };

  const handleBySearch = (e) => {
    const searchVal = e.target.value.toLowerCase();
    setIsinput(searchVal);

    const newData = transactions.filter((item) =>
      item.name.toLowerCase().includes(searchVal)
    );

    if (searchVal === "") {
      setFilterTrans(transactions);
    } else {
      setFilterTrans(newData);
    }
  };

  const handleSort = (e) => {
    if (e.target.value === "Sort by Date") {
      console.log(e.target.value);
      setFilterTrans(
        [...filterTrans].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    } else if (e.target.value === "Sort by Amount") {
      console.log(e.target.value);
      setFilterTrans([...filterTrans].sort((a, b) => a.amount - b.amount));
    } else {
      setFilterTrans(transactions);
    }
  };

  const exportCSV = () => {
    console.log("exportCSV");
    let csv = unparse({
      fields: ["name", "type", "date", "amount", "tag"],
      data: transactions,
    });

    var data = new Blob([csv], { type: "text/csv" });
    var csvURL = window.URL.createObjectURL(data);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "transactions.csv");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const importCSV = (event) => {
    event.preventDefault();
    console.log("importCSV");
    try{
      parse(event.target.files[0], {
        header : true,
        complete: async function(results){
          for( const transaction of results.data){
            const newTransaction = {
              ...transaction
            }
          await addTransaction(newTransaction);

          }
        }
      })
      event.target.files = null;

    }catch(e){
      console.log(e.message)
    }
  };

  return (
    <div className="transaction-sec">
      <div className="trans-search-sec">
        <Input
          placeholder="Search by Name"
          className="searchInput"
          value={isInput}
          onChange={handleBySearch}
          variant="borderless"
          prefix={<SearchOutlined />}
        />
        <Select
          className="selectInput"
          defaultValue="All"
          variant="borderless"
          onChange={searchByType}
          options={[
            { value: "all", label: "All" },
            { value: "income", label: "Income" },
            { value: "expense", label: "Expense" },
          ]}
        />
      </div>

      <div className="trans-table-sec">
        <div className="table-row">
          <p className="heading">My Transactions</p>
          <div className="sort-tabs">
            <Radio.Group
              options={options}
              defaultValue="No Sort"
              optionType="button"
              onChange={handleSort}
            />
          </div>

          <div className="imp-exp-btn">
            <Button id="exp-btn" onClick={exportCSV}>
              Export to CSV
            </Button>
            <label htmlFor="name" className="imp-label" >Import from CSV</label>
            <input type="file" id="name" onChange={importCSV} style={{display: 'none'}}/>
          </div>
        </div>

        <Table columns={columns} className="table" dataSource={filterTrans} />
      </div>
    </div>
  );
}

export default MyTransactions;

import React, { useState, useEffect,useMemo } from 'react';

import { forwardRef } from 'react';

import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import { COLUMNS } from './columns'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const api = axios.create({
  baseURL: 'https://covid-relief-backend-karnataka.herokuapp.com/api'
})


function validateEmail(email){
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

export default function XApp() {

    const columns = useMemo(() => COLUMNS, [])
    const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    api.get("/ambulance")
        .then(response => {     
            console.log(response.data.created_at);  
            console.log('Response was received');        
            setData(response.data.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.available === ""){
      errorList.push("Please Enter True or False")
    }
    if(newData.description === ""){
      errorList.push("Please enter description")
    }
    if(newData.link_to_go === "" ){
      errorList.push("Please enter a valid link")
    }
    if(newData.location_covered === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.name === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.source === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.timings === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.verified === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.verified_by === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData._id === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.contact_email === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.contact_name === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.contact_number === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(newData.last_update_time === "" ){
        errorList.push("Please enter a valid location_covered")
    }
    if(errorList.length < 1){
      api.patch("/ambulance/"+newData.id, newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if(newData.available === undefined){
        errorList.push("Please Enter True or False")
      }
      if(newData.description === undefined){
        errorList.push("Please enter Description")
      }
      if(newData.link_to_go === undefined ){
        errorList.push("Please enter a valid link")
      }
      if(newData.location_covered === undefined ){
          errorList.push("Please enter a valid location_covered")
        }
        if(newData.name ===undefined ){
          errorList.push("Please enter a valid Name")
        }
        if(newData.source === undefined ){
          errorList.push("Please enter a valid Source")
        }
        if(newData.timings === undefined ){
          errorList.push("Please enter a valid Timing")
        }
        if(newData.verified === undefined ){
          errorList.push("Please enter a valid Value")
        }
        if(newData.verified_by === undefined ){
          errorList.push("Please enter a valid Data")
        }
        if(newData._id === undefined ){
          errorList.push("Please enter a valid ID")
        }
        if(newData.contact_email === undefined ){
          errorList.push("Please enter a valid Email")
        }
        if(newData.contact_name === undefined){
          errorList.push("Please enter a valid Contact Name")
        }
        if(newData.contact_number ===undefined ){
          errorList.push("Please enter a valid Contact Number")
        }
        if(newData.last_update_time === undefined){
          errorList.push("Please enter a valid Update Time")
        }

    if(errorList.length < 1){ //no error
      api.post("/ambulance", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  const handleRowDelete = (oldData, resolve) => {
    
    api.delete("/ambulance/"+oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


  return (
    <div className="Appname">
      
      <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={12}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            <MaterialTable
              title="User data from remote source"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}


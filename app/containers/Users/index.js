import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import UserTable from "../../components/UserTable";
import Button from "@material-ui/core/Button";
import DeletionDialog from "../../components/DeletionDialog";
import UsersDialog from "../../components/UsersDialog";
import uuid from 'react-uuid';

export default props => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data from localstorage on page load
    let users = localStorage.getItem("users");
    setData(users ? JSON.parse(users) : {});
  }, []);

  const onDeleteItem = item => {
    // Deletion of data
    let newData = {...data};
    delete newData[item.id];
    setData(newData);
    localStorage.setItem("users", JSON.stringify(newData));
  };

  const onEditItem = item => {
    if(item.id) {
      // If item has an `id`, it means we need to edit an existing asset
      let newData = {...data};
      newData[item.id] = item;
      setData(newData);
      localStorage.setItem("users", JSON.stringify(newData));
    } else {
      // If item does not have an `id`, it means its a new asset
      let id = uuid();
      let newData = {...data, [id]: {...item, id}};
      setData(newData);
      localStorage.setItem("users", JSON.stringify(newData));
    }
  };

  return (
    <Grid direction='row' alignItems='center' justify='center' container>
      <Grid xs={8} item>
        <Grid style={{ marginTop: '10vh' }} direction='column' alignItems='flex-end' justify='center' container>
          <Button variant='contained' color='primary' alignItems='center' justify='center' onClick={() => setOpenEdit(true)}>Add record</Button>
          <br/>
          <UserTable onDeleteItem={(item) => {
            setSelectedItem(item);
            setOpenDelete(true);
          }} onEditItem={(item) => {
            setSelectedItem(item);
            setOpenEdit(true);
          }} data={Object.values(data).reverse()}/>
        </Grid>
      </Grid>

      <DeletionDialog onNegativeAction={() => {
        setOpenDelete(false);
        setSelectedItem(null);
      }} onPositiveAction={() => {
        onDeleteItem(selectedItem);
      }} onClose={() => setOpenDelete(false)} open={openDelete}/>

      <UsersDialog {...selectedItem} onNegativeAction={() => {
        setSelectedItem(null);
      }} onPositiveAction={(user) => {
        setSelectedItem(null);
        onEditItem(user);
        setOpenEdit(false);
      }} onClose={() => {
        setSelectedItem(null);
        setOpenEdit(false);
      }} open={openEdit}/>
    </Grid>
  )
};
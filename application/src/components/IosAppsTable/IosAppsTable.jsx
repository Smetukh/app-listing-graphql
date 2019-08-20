import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import MoviesDialog from '../MoviesDialog/MoviesDialog';
import MoviesSearch from '../MoviesSearch/MoviesSearch';

import withHocs from './IosAppsTableHoc';

class IosAppsTable extends React.Component {
  state = {
    anchorEl: null,
    openDialog: false,
    name: '',
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSearch = (e) => {
    const { data } = this.props;
    const { name } = this.state;

    if(e.charCode === 13) {
      data.fetchMore({
        variables: { name },
        updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
      });
    }
  };

  handleDialogOpen = () => { this.setState({ openDialog: true }); };
  handleDialogClose = () => { this.setState({ openDialog: false }); };

  handleClick = ({ currentTarget }, data) => {
    this.setState({
      anchorEl: currentTarget,
      data,
    });
  };

  handleClose = () => { this.setState({ anchorEl: null }); };

  handleEdit = () => {
    this.props.onOpen(this.state.data);
    this.handleClose();
  };

  handleDelete = () => {
    this.handleDialogOpen();
    this.handleClose();
  };

  render() {
    const { anchorEl, openDialog, data: activeElem = {}, name } = this.state;

    const { classes, data = {} } = this.props;

    const { apps = [] } = data;
    console.log('apps = ' , apps)

    return (
      <>
        <Paper>
          <MoviesSearch name={name} handleChange={this.handleChange} handleSearch={this.handleSearch} />
        </Paper>
        <MoviesDialog open={openDialog} handleClose={this.handleDialogClose} id={activeElem.id} />
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell align="right">Size (MB)</TableCell>
                <TableCell>Download</TableCell>
                {/* <TableCell>Watched</TableCell>
                <TableCell align="right"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {apps.map(app => {
                return (
                  <TableRow key={app.id}>
                    <TableCell component="th" scope="row">{app.name}</TableCell>
                    <TableCell>{app.dateModified}</TableCell>
                    <TableCell align="right">{app.fileSize}</TableCell>
                    {/* <TableCell>{movie.director.name}</TableCell> */}
                    <TableCell>
                      <Checkbox checked={app.watched} disabled />
                    </TableCell>
                    <TableCell align="right">
                      <>
                        <IconButton color="inherit" onClick={(e) => this.handleClick(e, app)}>
                          <MoreIcon />
                        </IconButton>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
                          <MenuItem onClick={this.handleEdit}><CreateIcon /> Edit</MenuItem>
                          <MenuItem onClick={this.handleDelete}><DeleteIcon/> Delete</MenuItem>
                        </Menu>
                      </>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
};

export default withHocs(IosAppsTable);

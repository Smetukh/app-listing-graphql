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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
                  <ExpansionPanel key={`${app.id}-expansion`}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${app.id}-content`}
                      id={`${app.id}-header`}
                    >
                      
                      <TableRow key={app.id}>
                      <>
                        <TableCell component="th" scope="row">{app.fileName}</TableCell>
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
                        </>
                      </TableRow>
                      
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <TableRow key={app.id} className={classes.expanded}>
                      <>
                        <TableCell component="th" scope="row">
                        <ul>
                          <li>
                            {/* <i class="fas fa-code-branch"></i> */}
                            Version: { app.version }
                          </li>
                          <li>
                            {/* <i class="fas fa-first-aid"></i> */}
                            Build: { app.build }
                          </li>
                          <li>
                            {/* <i class="far fa-id-card"></i> */}
                            {/* {{ this.path == 'api/ios-apps' ? 'Bundle' : 'Package' }}  */}
                            ID: { app.bundleId }
                          </li>
                          <li >
                            {/* <i class="fas fa-user-friends"></i> */}
                            Team: { app.team }
                          </li>
                          <li>
                             {/* *ngIf="this.path == 'api/ios-apps' && app.dateExpired">
                            <i class="fas fa-clock"></i> */}
                            Expiration:  { app.dateExpired }
                          </li>
                          <li>
                            {/* <i class="fas fa-users"></i> */}
                            User Groups: { app.userGroups }
                          </li>
                          {/* <li>
                            <i class="fas fa-comment"></i>
                            Description ({ app.description && app.description[this.defaultLanguage] ? this.defaultLanguage : "en_US" }}):
                            <span [innerHtml] = "app.description && app.description[this.defaultLanguage] | safe: 'html'"></span>
                          </li> */}
                        </ul>
                        </TableCell>
                        <TableCell>
                          <a
                            href="#"
                            installable="true"
                            description=""
                            className={classes.ahref}
                            // style="float: left; text-align: center"
                            >

                            <img
                              src={ app.qrCode }
                              align="right"
                              alt="{{ 'No icon' }}"
                              className={classes.qr}
                              // style="width:auto; height:150px; border-radius: 20%;" 
                              ></img>
                          </a>
                        </TableCell>
                        </>
                      </TableRow>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  
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

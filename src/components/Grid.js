import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import { getMessage } from '../services/MessageService';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router";
import Navbar from "./navbar/Header";




const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});


export default function ComplexGrid() {
    const location = useLocation();
    const data = getMessage(location.state.id);

    return (<>
        <Navbar />
        <h1> MESSAGE DETAILS </h1>

        <Paper sx={
            {
                p: 2,
                margin: 'auto',
                maxWidth: 600,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }
        } >

            <Grid container spacing={2}>


                <Grid item >
                    <ButtonBase sx={
                        { width: 128, height: 128 }} >
                        <Img alt="complex"
                            src="https://creativeagencysecrets.com/wp-content/uploads/2013/12/Email.png" />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong > {data.subject} </strong>
                            </Typography>
                            <Typography variant="body2" gutterBottom > {data.content}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">

                            </Typography>
                        </Grid> <Grid item >
                            <Typography sx={
                                { cursor: 'pointer' }}
                                variant="body2" >
                                <Button variant="outlined" component={Link} to="/list">
                                    Return to Message List
                                </Button>
                            </Typography> </Grid> </Grid> <Grid item >
                        <Typography variant="subtitle1"
                            component="div">
                            ... </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </>
    );
}
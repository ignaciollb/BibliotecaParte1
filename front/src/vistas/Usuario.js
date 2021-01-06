import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MaterialDatatable from "material-datatable";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)

    },
    delete: {
        backgroundColor: "red"
    }

}));

export default function Usuario() {
    const classes = useStyles();

    const { register, handleSubmit, errors, getValues, setValue, reset } = useForm(
        { defaultValues: { mail: "", pass: ""} });

    const [contador, setContador] = useState(0)
    const [usuarios, setUsuarios] = useState([])
    const [accion, setAccion] = useState("Guardar")
    const [idUsuario, setIdUsuario] = useState(null);

    useEffect(() => {
        cargarUsuario();
    }, []);
    /*
      const seleccionar = (item) =>{
        setValue("mail",item.mail)
        setValue("apellido",item.pass)
        setValue("edad",item.edad)
        setValue("rut",item.rut)
        //setIdAutor(item._id)
        setAccion("Modificar")
      }*/
      
    const columns = [
        {
            name: 'Mail',
            field: 'mail'
        },
        {
            name: 'Contraseña',
            field: 'pass'
        }


    ];


    const options = {
        selectableRows: false,
        print: false,
        onlyOneRowCanBeSelected: false,
        textLabels: {
            body: {
                noMatch: "Lo sentimos, no se encuentran registros",
                toolTip: "Sort",
            },
            pagination: {
                next: "Siguiente",
                previous: "Página Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
        },
        download: false,
        pagination: true,
        rowsPerPage: 5,
        usePaperPlaceholder: true,
        rowsPerPageOptions: [5, 10, 25],
        sortColumnDirection: "desc",
    }
    const onSubmit = data => {

        if (accion == "Guardar") {
            axios
                .post("http://localhost:9000/api/usuario", data)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            alert("Registro ok")
                            cargarUsuario();
                            reset();
                        }
                    },
                    (error) => {
                        // Swal.fire(
                        //   "Error",
                        //   "No es posible realizar esta acción: " + error.message,
                        //   "error"
                        // );
                    }
                )
                .catch((error) => {
                    // Swal.fire(
                    //   "Error",
                    //   "No cuenta con los permisos suficientes para realizar esta acción",
                    //   "error"
                    // );
                    console.log(error);
                });
        }
    }
        
    const cargarUsuario = async () => {
        // const { data } = await axios.get('/api/zona/listar');
        const { data } = await axios.get("http://localhost:9000/api/usuario/")
        setUsuarios(data.data);
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                
                <Typography component="h1" variant="h5">
                    Crear usuario
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="mail"
                                label="Mail"
                                name="mail"
                                autoComplete="mail"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="pass"
                                label="Contraseña"
                                id="pass"
                                type="password"
                                inputRef={register}

                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {accion}
                    </Button>
                    <Grid item xs={12}>
                        <MaterialDatatable
                            title={"Usuarios registrados"}
                            data={usuarios}
                            columns={columns}
                            options={options}
                        />
                    </Grid>


                </form>


            </div>

        </Container>
    );
}

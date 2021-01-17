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

export default function Prestamo() {
    const classes = useStyles();

    const { register, handleSubmit, errors, getValues, setValue, reset } = useForm(
        { defaultValues: { nombreP: "nombre", nombreL: "nombre Libro", codigo: "codigo"} });

    const [contador, setContador] = useState(0)
    const [personas, setPersonas] = useState([])
    const [libros, setLibros] = useState([])
    const [accion, setAccion] = useState("Guardar")
    const [idPersona, setIdPersona] = useState(null);
    const [idLibro, setIdLibro] = useState(null);
    
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    newDate = month+"-"+date+"-"+year;

    const fecha = newDate
    

    useEffect(() => {
        cargarPersona();
        cargarLibro();
    }, []);

    const seleccionarP = (item) => {
        setValue("nombreP", item.nombre)
        setIdPersona(item._id)
    }

    const seleccionarL = (item) => {
        setValue("nombreL", item.nombre)
        setValue("codigo",item.codigo)
        setIdLibro(item._id)
    }
    const columnsP = [
        {
            name: "Seleccionar",
            options: {
                headerNoWrap: true,
                customBodyRender: (item, tablemeta, update) => {
                    return (
                        <Button
                            variant="contained"
                            className="btn-block"
                            onClick={() => seleccionarP(item)}
                        >
                            Seleccionar
                        </Button>
                    );
                },
            },
        },
        {
            name: 'Nombre',
            field: 'nombre'
        }
    ];

    const columnsL = [
        {
            name: "Seleccionar",
            options: {
                headerNoWrap: true,
                customBodyRender: (item, tablemeta, update) => {
                    return (
                        <Button
                            variant="contained"
                            className="btn-block"
                            onClick={() => seleccionarL(item)}
                        >
                            Seleccionar
                        </Button>
                    );
                },
            },
        },
        {
            name: 'Nombre',
            field: 'nombre'
        },
        {
            name: 'Codigo',
            field: 'codigo'
        }
    ];


    const optionsL = {
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
    const optionsP = {
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


  /*  function guardar(){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let fecha = date+"/"+month+"/"+year;
        axios
                .post("http://localhost:9000/api/prestamo",{persona: idPersona, libro: idLibro, fecha: fecha})
                .then(
                    (response) => {
                        if (response.status == 200) {
                            alert("Registro ok")
                            cargarPersona();
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
    }*/
    const onSubmit = data => {

        if (accion == "Guardar") {

            axios
                .post("http://localhost:9000/api/prestamo",{
                    idPersona: idPersona, 
                    libro: idLibro, 
                    fecha: fecha})
                .then(
                    (response) => {
                        if (response.status == 200) {
                            alert("Registro ok")
                            cargarPersona();
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
        /*if (accion == "Modificar") {
            axios
                .put("http://localhost:9000/api/autor/" + idAutor, data)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            alert("Modificado")
                            cargarPersona();
                            reset();
                            setIdAutor(null)
                            setAccion("Guardar")
                            console.log(response.data)
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
        }*/

    }

   /* const eliminar = () => {
        if (idAutor == null) {
            alert("Debe seleccionar un autor")
            return
        }
        axios
            .delete("http://localhost:9000/api/autor/" + idAutor)
            .then(
                (response) => {
                    if (response.status == 200) {
                        cargarPersona();
                        reset();
                        setIdAutor(null)
                        setAccion("Guardar")
                        console.log(response.data)
                        alert("Eliminado")
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
    }*/
    const cargarPersona = async () => {
        const { data } = await axios.get("http://localhost:9000/api/personas");
        console.log(data)
        setPersonas(data.persona);
    };
    const cargarLibro = async () => {
        const { data } = await axios.get("http://localhost:9000/api/libroautor");
        console.log(data)
        setLibros(data.libroConAutor);
    };
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"

                    className={classes.submit}
                    onClick={() => { reset(); setAccion("Guardar"); setIdPersona(null) }}
                >
                    Nuevo
          </Button>
                <Typography component="h1" variant="h5">
                    Autor - Contador: {contador}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="nombreP"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                                inputRef={register}
                                disabled
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Nombre libro"
                                name="nombreL"
                                autoComplete="lname"
                                inputRef={register}
                                disabled
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="edad"
                                label="Codigo libro"
                                name="codigo"
                                autoComplete="edad"
                                inputRef={register}
                                disabled
                            />
                        </Grid>

                    </Grid>

                    <Grid container spacing={1} item xs={12} direction="row">
                        <Grid item xs={6}>
                            <MaterialDatatable
                                title={"Personas"}
                                data={personas}
                                columns={columnsP}
                                options={optionsP}
                            />
                        </Grid >
                        <Grid item xs={6}>
                            <MaterialDatatable
                                title={"Libro"}
                                data={libros}
                                columns={columnsL}
                                options={optionsL}
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
                </form>


            </div>

        </Container>
    );
}
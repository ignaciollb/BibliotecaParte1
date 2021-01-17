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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


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

export default function Libro() {
  const classes = useStyles();

  const { register, handleSubmit, errors, getValues, setValue, reset } = useForm(
    { defaultValues: { nombre: "", codigo: "", autor: "" } }
  );
  const [libros, setLibros] = useState([])
  const [autores, setAutores] = useState([])
  const [itemsAutor, setItems] = useState([])
  const [accion, setAccion] = useState("Guardar")
  const [idAutor, setIdAutor] = useState("");

  useEffect(() => {
    cargarLibro();
    cargarAutores();
  }, []);

  /*const seleccionar = (item) => {
    setValue("nombre", item.nombre)
    setValue("apellido", item.apellido)
    setValue("edad", item.edad)
    setValue("rut", item.rut)
    setIdAutor(item._id)
    setAccion("Modificar")


  }*/
  const columns = [
    {
      name: 'Nombre',
      field: 'nombre'
    },
    {
      name: 'Codigo',
      field: 'codigo'
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
        .post("http://localhost:9000/api/libro",{
          codigo: data.codigo,
          nombre: data.nombre,
          autor: idAutor
        })
        .then(
          (response) => {
            if (response.status == 200) {
              alert("Registro ok")
              cargarLibro();
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
    if (accion == "Modificar") {
      axios
        .put("http://localhost:9000/api/autor/" + idAutor, data)
        .then(
          (response) => {
            if (response.status == 200) {
              alert("Modificado")
              cargarLibro();
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
    }

  }

  const eliminar = () => {
    if (idAutor == null) {
      alert("Debe seleccionar un autor")
      return
    }
    axios
      .delete("http://localhost:9000/api/autor/" + idAutor)
      .then(
        (response) => {
          if (response.status == 200) {

            cargarLibro();
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
  }
  const cargarLibro = async () => {
    // const { data } = await axios.get('/api/zona/listar');

    const { data } = await axios.get("http://localhost:9000/api/libroautor");
    setLibros(data.libroConAutor);
  };
  const cargarAutores = async () => {
    const { data } = await axios.get("http://localhost:9000/api/autor");
    console.log("post axios");
    console.log(data.autor);
    setAutores(data.autor);
  };

  const handleChange = (event) => {
    setIdAutor(event.target.value);
    console.log(idAutor);
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
          onClick={() => { reset(); setAccion("Guardar"); setIdAutor(null) }}
        >
          Nuevo
          </Button>
        <Typography component="h1" variant="h5">
          Registrar libro
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="nombre"
                variant="outlined"
                required
                fullWidth
                label="Nombre"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="codigo"
                label="Código"
                name="codigo"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
              <InputLabel id="demo-customized-select">Seleccione autor</InputLabel>
                {/*<Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {itemsAutor}
                  
                </Select>*/}
                <Select
                  onChange={handleChange}
                  value={idAutor}
                  labelWidth={"Autor"}
                  margin="dense"
                >
                  <MenuItem selected={true} key={1} value={0}>
                    Seleccione Autor
                  </MenuItem>

                  {autores !== null ? (
                    autores.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          <em>{item.nombre}</em>
                        </MenuItem>
                      );
                    })
                  ) : (
                      <MenuItem key={-1} value={0}>
                        <em>''</em>
                      </MenuItem>
                    )}
                </Select>
              </FormControl>
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
              title={"Libros"}
              data={libros}
              columns={columns}
              options={options}
            />
          </Grid>


        </form>


      </div>

    </Container>
  );
}
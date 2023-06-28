
let gastos = [];
let presupuesto = 0;
let total = 0;
let saldo = 0;

document.getElementById('presupuesto').addEventListener('submit', (e) => {
    e.preventDefault();
    presupuesto = Number(document.getElementById('presupuestoIngresado').value);
    console.log(presupuesto);
    if (isNaN(presupuesto)) {
        alert('Ingrese un presupuesto válido');
    }

    document.getElementById('mostrarPresupuesto').innerHTML = "$" + presupuesto.toLocaleString('es-CL');
});

document.getElementById('gastos').addEventListener('submit', (e) => {
    e.preventDefault();
    valor = parseInt(document.getElementById('gastosIngresado').value);
    nombre = document.getElementById('nombreGasto').value;

    let gasto = { nombre, valor };

    if (valor == '') {
        alert('El valor del gasto es obligatorio');
        return;
    }
    if (nombre === '') {
        alert('Ingresa el nombre de tu gasto');
        return;
    }
    gastos.push(gasto);

    document.getElementById('gastosIngresado').value = '';
    document.getElementById('nombreGasto').value = '';

    inyectarGasto(gastos);
    mostrarGastos(gastos);
});

function inyectarGasto(gastos) {

    total = 0;
    for (i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }

    document.getElementById('mostrarGasto').innerHTML = '$' + total.toLocaleString('es-CL');
    document.getElementById('mostrarSaldo').innerHTML = '$' + (presupuesto - total).toLocaleString('es-CL');
}

function mostrarGastos(gastos) {
    document.getElementById('datoTabla').innerHTML = '';

    for (i = 0; i < gastos.length; i++) {
        let tr =
            `       <tr id='tr'>
                    <td>${gastos[i].nombre}</td>
                    <td>$${gastos[i].valor.toLocaleString('es-CL')}</td>
                    <td id="button" onclick="eliminarGasto(${i})"><i class="fa-solid fa-trash-can" style="color: #5b90ec;"></i></td><hr>
                </tr>
        `
        document.getElementById('datoTabla').innerHTML += tr;
    }
}

function eliminarGasto(indice) {
    gastos.splice(indice, 1);
    mostrarGastos(gastos);
    inyectarGasto(gastos);
}
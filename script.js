document.addEventListener('DOMContentLoaded', () => {
    const alumnosList = document.getElementById('alumnosList');
    const entradasList = document.getElementById('entradasList');
    const salidasList = document.getElementById('salidasList');

    // Cargar la lista de alumnos desde el archivo JSON
    fetch('alumnos.json')
        .then(response => response.json())
        .then(alumnos => {
            alumnos.forEach(alumno => {
                const li = document.createElement('li');
                li.innerHTML = `<input type="checkbox" class="alumnoCheckbox" value="${alumno}"> ${alumno}`;
                alumnosList.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar la lista de alumnos:', error));

    function registrarEvento(tipo) {
        const checkboxes = document.querySelectorAll('.alumnoCheckbox:checked');
        if (checkboxes.length > 0) {
            checkboxes.forEach(checkbox => {
                const nombre = checkbox.value;
                const fechaHora = new Date().toLocaleString();
                const registro = `${nombre} - ${tipo} - ${fechaHora}`;
                const li = document.createElement('li');
                li.textContent = registro;

                if (tipo === 'Entrada') {
                    entradasList.appendChild(li);
                } else if (tipo === 'Salida') {
                    salidasList.appendChild(li);
                }
                
                checkbox.checked = false; // Desmarca el checkbox después de registrar
            });
        } else {
            alert('Selecciona al menos un alumno.');
        }
    }

    window.registrarEvento = registrarEvento; // Hacemos la función accesible desde HTML
});
// script.js

function registrarEvento(tipo) {
    const lista = tipo === 'Entrada' ? document.getElementById('entradasList') : document.getElementById('salidasList');
    const nombre = prompt("Ingrese el nombre del alumno:");
    if (nombre) {
        const tiempo = new Date().toLocaleString();
        const li = document.createElement('li');
        li.textContent = `${nombre} - ${tipo} - ${tiempo}`;
        lista.appendChild(li);
    }
}

function downloadCSV(id, filename) {
    const list = document.getElementById(id);
    let csv = 'Nombre,Tipo,Hora\n';

    list.querySelectorAll('li').forEach(li => {
        const [nombre, tipo, tiempo] = li.textContent.split(' - ');
        csv += `${nombre},${tipo},${tiempo}\n`;
    });

    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    
    downloadLink.download = filename;
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


import React, {useState}  from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logosinfondo from '../../Generic/imagen/logosinfondo.png';


const TicketVisitante = ({ parking }) => {
    const [tiempoParqueaderoHoras, setTiempoParqueaderoHoras] = useState(1);
    const [tiempoParqueaderoMinutos, setTiempoParqueaderoMinutos] = useState(0);
    const calculateCost = (entrada, salida, tipoParqueadero) => {
        const entradaDate = new Date(entrada);
        const salidaDate = new Date(salida);
        let totalCost = 0;

        if (tipoParqueadero.toLowerCase().includes('visitante')) {
            let currentTime = entradaDate;

            while (currentTime < salidaDate) {
                const nextBoundary = new Date(currentTime);
                if (currentTime.getHours() >= 6 && currentTime.getHours() < 18) {
                    // Período de día
                    nextBoundary.setHours(18, 0, 0, 0);
                    totalCost += 4000;
                } else {
                    // Período de noche
                    nextBoundary.setHours(6, 0, 0, 0);
                    if (nextBoundary < currentTime) {
                        nextBoundary.setDate(nextBoundary.getDate() + 1);
                    }
                    totalCost += 6000;
                }

                currentTime = nextBoundary;
                if (currentTime > salidaDate) {
                    break;
                }
            }
        } else if (tipoParqueadero.toLowerCase().includes('carro-propietario')) {
            totalCost = 50000;
        } else if (tipoParqueadero.toLowerCase().includes('moto-propietario')) {
            totalCost = 36000;
        }
        const tiempoTotalHoras = tiempoParqueaderoHoras + tiempoParqueaderoMinutos / 60;
        totalCost *= tiempoTotalHoras;

        return totalCost;
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('===============================================', 20, 30);
        // Título
        doc.addImage(logosinfondo, 'PNG', 40, 30, 120, 60, '', 'FAST', 0.10);


        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('Ticket de Parqueadero', 105, 20, 'center');
        doc.setFontSize(12);
        
        // Datos del vehículo
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        
        doc.text(`ID: ${parking.id}`, 105, 50, 'center');
        doc.text(`Tipo: ${parking.tipoParqueadero}`, 105, 60, 'center');
        doc.text(`Fecha y Hora de Entrada: ${new Date(parking.fecParqueadero).toLocaleString()}`, 105, 70, 'center');
        doc.text(`Fecha y Hora de Salida: ${new Date(parking.horaSalida).toLocaleString()}`, 105, 80, 'center');
        doc.text(`Datos del Vehículo: ${parking.dvteParqueadero}`, 105, 90, 'center');
        doc.text(`Número de Cupo: ${parking.cupParqueadero}`, 105, 100, 'center');
        doc.text(`Tiempo en el Parqueadero: ${tiempoParqueaderoHoras} hora(s) y ${tiempoParqueaderoMinutos} minuto(s)`, 105, 110, 'center');
        doc.text(`Costo Total: ${calculateCost(parking.fecParqueadero, parking.horaSalida, parking.tipoParqueadero).toFixed(2)} COP`, 105, 120, 'center');
       
        doc.text('==============================================================', 20, 130);
        doc.save('Ticket_Parqueadero.pdf');
    };

    return (
        <button onClick={generatePDF} className="btn btn-primary btn-sm mx-2" style={{ backgroundColor: '#a11129', borderColor: '#a11129' }}>
            <i className="bi bi-filetype-pdf"></i>
        </button>
    );
};

export default TicketVisitante;

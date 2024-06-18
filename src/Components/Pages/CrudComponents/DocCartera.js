import React from 'react';
import jsPDF from 'jspdf';
import logosinfondo from '../../Generic/imagen/logosinfondo.png';

const DocCartera = ({ walletStatus }) => {

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.addImage(logosinfondo, 'PNG', 40, 30, 120, 60, '', 'FAST', 0.10);
        const currentDate = new Date().toLocaleDateString('es-ES');
        const inmuebleNumber = walletStatus.property?.numInmueble || 'N/A';
        const userName = walletStatus.worker?.userName || 'N/A';
        const userCedula = walletStatus.worker?.userCedula || 'N/A';
        


        // Fecha
        doc.setFontSize(12);
        doc.text(`Fecha: ${currentDate}`, 20, 20); // Posición arriba a la izquierda

        if (walletStatus.estcartera === 'Mora') {
            // Título
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(18);
            doc.setTextColor(255, 0, 0); // Rojo para Mora
            doc.text('Acuerdo de Pago', doc.internal.pageSize.width / 2, 40, { align: 'center' });

            // Cuerpo
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0); // Negro para texto normal
            doc.text(`El inmueble número ${inmuebleNumber} se encuentra en mora por concepto de cuota de administración.`, 10, 60);
            doc.text('Lo animamos a ponerse al día en los pagos. Desde la administración estamos', 10, 70);
            doc.text('prestos a llegar a un acuerdo.', 10, 80);

            // Firma
            doc.setFont('helvetica', 'bold');
            doc.text('Atentamente,', 10, 110);
            doc.text('Alba Amaya', 10, 120);
            doc.text('Administradora - Representante Legal', 20, 130);

        } else if (walletStatus.estcartera === 'Paz y Salvo') {
            // Título
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(18);
            doc.setTextColor(0, 128, 0); // Verde para Paz y Salvo
            doc.text('Certificado de Paz y Salvo', doc.internal.pageSize.width / 2, 40, { align: 'center' });

            // Cuerpo
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0); // Negro para texto normal
            doc.text(`Yo, Alba Amaya, identificada con cédula ${userCedula}.`, 10, 60);
            doc.text('Administradora y Representante Legal del Conjunto Residencial Quintas del Recreo', 10, 70);
            doc.text('Primera Etapa, ubicado en la Carrera 93 D # 71-49 Sur.', 10, 80);
            doc.text(`Certifico que el copropietario del inmueble número ${inmuebleNumber},`, 10, 90);
            doc.text('se encuentra a paz y salvo por todo concepto hasta el mes actual.', 10, 100);

            // Firma
            doc.setFont('helvetica', 'bold');
            doc.text('Atentamente,', 10, 130);
            doc.text('Alba Amaya', 10, 140);
            doc.text('Administradora - Representante Legal', 10, 150);
        } else if (walletStatus.estcartera === 'Proceso Jurídico') {
            // Título
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(18);
            doc.setTextColor(255, 0, 0); // Rojo para Proceso Jurídico
            doc.text('Aviso de Proceso Jurídico', doc.internal.pageSize.width / 2, 40, { align: 'center' });

            // Cuerpo
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0); // Negro para texto normal
            doc.text(`El inmueble número ${inmuebleNumber} se encuentra en proceso jurídico por concepto de cuotas de administración.`, 10, 60);
            doc.text('Por lo tanto, es necesario que se acerque a la oficina para llegar a un acuerdo con el fin de que pueda saldar la deuda.', 10, 70);

            // Firma
            doc.setFont('helvetica', 'bold');
            doc.text('Atentamente,', 10, 100);
            doc.text('Alba Amaya', 10, 110);
            doc.text('Administradora - Representante Legal', 10, 120);
        }

        // Guardar el archivo PDF con un nombre adecuado
        doc.save(`Reporte_Cartera_${walletStatus.estcartera}_${currentDate}.pdf`);
    
    };

    return (
        <button onClick={generatePDF} className="btn btn-warning btn-sm mx-1" style={{ backgroundColor: '#f0ad4e', borderColor: '#f0ad4e' }}>
            <i className="bi bi-file-earmark-pdf"></i> 
        </button>
    );
};

export default DocCartera;

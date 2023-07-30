/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// fecha formato
import moment from 'moment';
import 'moment/locale/es-do';
//
import styles from '../invoice/details/InvoiceStyle';

// ----------------------------------------------------------------------

RegistosPDF.propTypes = {
  estudiantes: PropTypes.object,
};

export default function RegistosPDF({ estudiantes }) {
  const {
    id,
    nombres,
    apellidos,
    sexo,
    etapa,
    grado,
    regional,
    distrito,
    centro_educativo,
    telefono,
    correo,
    fecha_nacimiento,
    img_url,
  } = estudiantes;


  return (
    <Document>
      <Page size="A4" style={styles.page} orientation='landscape'>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_full.jpg" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text> PLERD-EST-0001 </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Reporte desde</Text>
            <Text style={styles.body1}>{Date.now}</Text>
            <Text style={styles.body1}>PRUEBA</Text>
          </View>

          <View style={styles.col6}>
            <View style={[styles.gridContainer]}>
            <View style={styles.col6}>
              <Text style={[styles.overline, styles.mb8]}>Fecha de creación</Text>
              <Text style={styles.body1}>{Date.now}</Text>
            </View>
        </View>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>REGISTROS DE ESTUDIANTES</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_4}>
                <Text style={styles.subtitle2}>ID</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>NOMBRES</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>APELLIDOS</Text>
              </View>

              <View style={[styles.tableCell_4]}>
                <Text style={styles.subtitle2}>SEXO</Text>
              </View>

              <View style={[styles.tableCell_4]}>
                <Text style={styles.subtitle2}>ETAPA</Text>
              </View>

              <View style={[styles.tableCell_2]}>
                <Text style={styles.subtitle2}>REGIONAL</Text>
              </View>

              <View style={[styles.tableCell_2]}>
                <Text style={styles.subtitle2}>DISTRITO</Text>
              </View>

              <View style={[styles.tableCell_2]}>
                <Text style={styles.subtitle2}>CENTRO EDUCATIVO</Text>
              </View>

              <View style={[styles.tableCell_2]}>
                <Text style={styles.subtitle2}>NÚMERO</Text>
              </View>

              <View style={[styles.tableCell_2]}>
                <Text style={styles.subtitle2}>EMAIL</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>FECHA DE NACIMIENTO</Text>
              </View>

            </View>
          </View>

          <View style={styles.tableBody}>
            {estudiantes.map((item) => (
              <View style={styles.tableRow} key={item.id} wrap={false} split={false}>

                <View style={styles.tableCell_4}>
                  <Text>{item.id}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{item.nombres}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{item.apellidos}</Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text>{item.sexo}</Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text>{item.etapa}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{item.regional}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{item.distrito}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{item.centro_educativo}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{item.telefono}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{item.correo}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text>{moment(item.fecha_nacimiento).format('DD-MMM-YYYY')}</Text>
                </View>

              </View>
            ))}
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>
              We appreciate your business. Should you need us to add VAT or extra notes let us know!
            </Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>support@abcapp.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

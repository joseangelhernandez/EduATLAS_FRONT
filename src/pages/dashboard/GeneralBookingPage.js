import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// _mock_
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats,
} from '../../sections/@dashboard/general/booking';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
} from '../../assets/illustrations';

// ----------------------------------------------------------------------

export default function GeneralBookingPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ocupación Escolar | EduATLAS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Total de Estudiantes"
              total={700000} 
              icon={<BookingIllustration />}
            />
          </  Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary 
              title="Ocupación Actual" 
              total={500000} 
              icon={<CheckInIllustration />} 
            />
          </  Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Cupos Disponibles"
              total={200000} 
              icon={<CheckOutIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes
                  title="Ocupación Histórica"
                  total={18765} 
                  percent={2.6}
                  chart={{
                    series: [111, 136, 76, 108, 74, 54, 57, 84], 
                  }}
                />
              </  Grid>
                
              <Grid item xs={12} md={6}>
                <BookingBookedRoom 
                  title="Disponibilidad Histórica" 
                  data={_bookingsOverview} es
                />
              </  Grid>
                
              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets
                  title="Ocupación y Disponibilidad de Cupos"
                  chart={{
                    colors: [theme.palette.warning.main],
                    series: [
                      { label: 'Ocupación', percent: 72, total: 38566 }, 
                      { label: 'Disponibilidad', percent: 64, total: 18472 }, 
                    ],
                  }}
                />
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={12} md={4}>
            <BookingRoomAvailable
              title="Aulas Disponibles"
              chart={{
                series: [
                  { label: 'Ocupadas', value: 120 },
                  { label: 'Disponibles', value: 66 },
                ],
              }}
            />
          </Grid>


          <Grid item xs={12} md={8}>
            <BookingReservationStats
              title="Estadísticas de Matrícula"
              subheader="(+43% Matriculados | +12% Graduados) que el año pasado"
              chart={{
                categories: ['2021-2022', '2022-2023', '2023-2024'],
                series: [
                  {
                    type: 'Semestre',
                    data: [
                      { name: 'Matriculados', data: [2000, 2200, 2400] },
                      { name: 'Graduados', data: [1800, 2100, 2300] },
                    ],
                  },
                  {
                    type: 'Año escolar',
                    data: [
                      { name: 'Matriculados', data: [4000, 4500, 5000] },
                      { name: 'Graduados', data: [3800, 4100, 4700] },
                    ],
                  },
                ],
              }}
            />

          </Grid>
          

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews
              title="Customer Reviews"
              subheader={`${_bookingReview.length} Reviews`}
              list={_bookingReview}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}

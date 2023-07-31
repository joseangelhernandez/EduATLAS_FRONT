import { useRef } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Card, Button, Fab, Stack, InputBase } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Comparte lo que piensas con tus compañeros y amigos, o donde participarás pronto..."
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleClickAttach}>
            <Iconify icon="ic:round-perm-media" width={24} sx={{ color: 'success.main' }} />
            Imagen/Video
          </Fab>
        </Stack>

        <Button variant="contained">Publicar</Button>
      </Stack>

      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Card>
  );
}

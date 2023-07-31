import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [openPreview, setOpenPreview] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    tags: Yup.array().min(2, 'Debe tener al menos 2 etiquetas'),
    metaKeywords: Yup.array().min(1, 'Se requieren palabras clave meta'),
    cover: Yup.mixed().required('Se requiere una portada').nullable(true),
    content: Yup.string().required('El contenido es obligatorio'),    
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['The Kid'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar('Entrada creada con éxito.');
      navigate(PATH_DASHBOARD.blog.posts);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('cover', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('cover', null);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Título" />

              <RHFTextField name="description" label="Descripción" multiline rows={3} />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Contenido
                </Typography>

                <RHFEditor simple name="content" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Imagen - Banner
                </Typography>

                <RHFUpload
                  name="cover"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <RHFSwitch
                  name="publish"
                  label="Publicar"
                  labelPlacement="start"
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />

                <RHFSwitch
                  name="comments"
                  label="Habilitar comentarios"
                  labelPlacement="start"
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              </div>

              <RHFAutocomplete
                name="tags"
                label="Etiquetas"
                multiple
                freeSolo
                options={TAGS_OPTION.map((option) => option)}
                ChipProps={{ size: 'small' }}
              />

              <RHFTextField name="metaTitle" label="Meta Título" />

              <RHFTextField
                name="metaDescription"
                label="Meta descripción"
                fullWidth
                multiline
                rows={3}
              />

              <RHFAutocomplete
                name="metaKeywords"
                label="Palabras claves"
                multiple
                freeSolo
                options={TAGS_OPTION.map((option) => option)}
                ChipProps={{ size: 'small' }}
              />
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              onClick={handleOpenPreview}
            >
              Previsulizar
            </Button>

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Publicar
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>

      <BlogNewPostPreview
        values={values}
        open={openPreview}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

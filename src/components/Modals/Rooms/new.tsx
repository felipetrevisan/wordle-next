import React from 'react';
import { Modal, Backdrop, Fade, Box, IconButton, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';

const NewRoomModal: React.FC = () => {
  return (
    <Modal
      open
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in>
        <Box>
          <IconButton autoFocus>
            <Close />
          </IconButton>
          <Grid container direction="row"></Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewRoomModal;

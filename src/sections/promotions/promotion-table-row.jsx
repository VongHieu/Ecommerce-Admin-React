import {
  IconButton,
  MenuItem,
  Popover,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { promotionService } from 'src/apis/promotion-service';
import ModalDelete from 'src/components/modal-delete/modal-delete';
import { notify } from 'src/utils/untils';
import PropTypes from 'prop-types';
import { error, secondary, success } from 'src/theme/palette';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import PromotionAdd from './promotion-add';

export default function PromotionTableRow({
  name,
  discount,
  from_day,
  to_day,
  status,
  expiry,
  selected,
  handleClick,
  hanldeGetId,
}) {
  const [open, setOpen] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setOpen(null);
  };
  const handleEditPromotion = (event) => {
    const categoryId = hanldeGetId(event);
    setId(categoryId);
    setOpenModal(true);
    setOpen(null);
  };

  const handleDeleteModal = async (event) => {
    const categoryId = hanldeGetId(event);

    setId(categoryId);
    setOpenModalDelete(true);
    setOpen(null);
  };

  const handleDeletePromotion = async () => {
    if (id) {
      const dataPromtion = await promotionService.deleteProductCategory(id);
      notify(dataPromtion.data.message, dataPromtion.status);
    }
    setId(null);
  };

  const renderDiscount = (
    <Label
      variant="filled"
      color={secondary.dark}
      sx={{
        fontSize: '12px',
        pl: 1.5,
        pr: 1.5,
      }}
    >
      {`${discount}%`}
    </Label>
  );

  const renderExpiry = (
    <Label
      variant="filled"
      color={expiry ? success.special : error.special}
      sx={{
        fontSize: '12px',
        pl: 1.5,
        pr: 1.5,
      }}
    >
      {`${expiry ? 'Còn hạn' : 'Đã hết hạn'}`}
    </Label>
  );

  const renderStatus = (
    <Label
      variant="filled"
      color={status ? success.special : error.special}
      sx={{
        fontSize: '12px',
        pl: 1.5,
        pr: 1.5,
      }}
    >
      {`${status ? 'Đang sử dụng' : 'Đã khóa'}`}
    </Label>
  );

  return (
    <>
      <ModalDelete
        open={openModalDelete}
        handleClose={() => setOpenModalDelete(false)}
        handleAccept={handleDeletePromotion}
      />
      {openModal && (
        <PromotionAdd open={openModal} isEdit id={id} setOpen={() => setOpenModal(false)} />
      )}
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="center" spacing={2} width="150px">
            <Typography variant="subtitle2" noWrap overflow="hidden" textOverflow="ellipsis">
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            {renderDiscount}
          </Stack>
        </TableCell>

        <TableCell>{from_day}</TableCell>

        <TableCell>{to_day}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            {renderStatus}
          </Stack>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            {renderExpiry}
          </Stack>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={(event) => handleEditPromotion(event)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={(event) => {
            handleDeleteModal(event);
          }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

PromotionTableRow.propTypes = {
  name: PropTypes.string,
  discount: PropTypes.number,
  from_day: PropTypes.any,
  to_day: PropTypes.any,
  status: PropTypes.bool,
  expiry: PropTypes.bool,
  selected: PropTypes.any,
  handleClick: PropTypes.func,
  hanldeGetId: PropTypes.func,
};

// onClick={(event) => handleEditModal(event)} onClick={(event) => {handleDeleteModal(event)}}

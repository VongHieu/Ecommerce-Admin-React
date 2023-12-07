import { Helmet } from 'react-helmet-async';

import UserDetailView from 'src/sections/user/view/user-detail-view';

export default function AddInfoUserPage() {
  return (
    <>
      <Helmet>
        <title>Add User | MeatDeli Admin </title>
      </Helmet>

      <UserDetailView isAdd={true} />
    </>
  );
}

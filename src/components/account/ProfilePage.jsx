import React from 'react';

const ProfilePage = (props) => {
  const { match } = props;
  return (
    <section className="page-content">
      <div className="row">
        <div className="col-sm-12 col-lg-8">
          This is the Profile Page. The profile id is: {match.params.id}
        </div>
        <aside className="col-sm-12 col-lg-4">
          This is the sidebar.
        </aside>
      </div>
    </section>
  );
};

export default ProfilePage;

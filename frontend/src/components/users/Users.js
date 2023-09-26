// frontend/src/components/users/Users.js

// Component to show the tree of the users and subordinates
const Users = ({ users }) => {
  let array = [];

  // return the array of userlist tree view elements
  const getUsersList = (usersObj, arr, ml) => {
    if (usersObj?.subordinates?.length > 0) {
      arr.push(
        <div style={{ display: 'flex', textAlign: 'start', marginLeft: ml }}>
          - {usersObj.id} {usersObj.level}
        </div>
      );
      usersObj?.subordinates?.map((obj) => {
        getUsersList(obj, arr, ml + 20);
      });
    } else {
      arr.push(
        <div style={{ display: 'flex', textAlign: 'start', marginLeft: ml }}>
          - {usersObj.id} {usersObj.level}
        </div>
      );
    }
    return arr;
  };

  return <div className="user-container">{getUsersList(users, array, 10)}</div>;
};

export default Users;

// backend/controllers/UsersController.js
import data from '../data.json' assert { type: 'json' };

const internalServerErrMsg = 'Internal Server Error';

let result = data;
let currentLength = 5;
let userArray = [];
/**
 * /api/users
 *   get:
 *     tags:
 *       - users
 *     @description : returns the array of users
 *     response:
 *       200:
 *          description: returns the array of users
 */
export const getUsers = async (req, res) => {
  userArray = [];
  try {
    function getUserDetails(data) {
      userArray.push({ id: data.id, level: data.level });
      if (data.subordinates.length > 0) {
        for (const user of data.subordinates) {
          getUserDetails(user);
        }
      }
    }

    // Function call to get modified response
    getUserDetails(data);

    res.json({ users: userArray, tree: result });
  } catch (error) {
    console.error('Error fetching data from the external API:', error);
    res.status(500).json({ error: internalServerErrMsg });
  }
};

/**
 * /api/users
 *   post:
 *     tags:
 *       - users
 *     @description : returns the array of users
 *     response:
 *       200:
 *          description: returns the array of users
 */
export const addUser = async (req, res) => {
  const { id, newValue } = req.body;
  try {
    const insertUser = function (tree, Id, item) {
      if (tree.id === Id) {
        console.log(tree.id, Id);
        tree.subordinates.push({
          id: currentLength + 1,
          level: newValue,
          subordinates: [],
        });
        return tree;
      }

      let latestNode = [];
      latestNode = tree.subordinates.map((ob) => {
        return insertUser(ob, Id, item);
      });

      return { ...tree, subordinates: latestNode };
    };

    result = insertUser(result, id, newValue);

    currentLength += 1;
    userArray.push({ id: currentLength, level: newValue });
    res.json({ users: userArray, tree: result });
  } catch (error) {
    console.error('Error fetching data from the external API:', error);
    res.status(500).json({ error: internalServerErrMsg });
  }
};

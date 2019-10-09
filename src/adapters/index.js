export const fetchUsers = async () => {
  const response = await fetch('/api/v1/users');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export const fetchPosts = async () => {
  const response = await fetch('/api/v1/posts');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body.posts;
};

export const fetchUserById = async (id) => {
  const response = await fetch(`/api/v1/users/${id}`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body.foundUser;
}

export const fetchUserByName = async (username) => {
  const response = await fetch(`/api/v1/user/${username}`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

export const createPost = async (post) => {
  console.log("In createPost", post)
  try {
    const response = await postData(`/api/v1/posts`, post);
    const body = await response.json();
    console.log(response)
    if (response.status !== 200) {
      throw Error(body.message);
    }
    // return body;
  } catch (error) {
    console.log(error);
  }

}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

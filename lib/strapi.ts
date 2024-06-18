const token =
  "bearer d728c2a8ff1a117ecbfd06b27dd9b612a85b53a5bf49e9c40a66bb7f0420f070284a267c2b7c485936ef196f3b0e365da3147a6e9d462b08a3348945aa5372170e727cc2dfd998a878d3f1636a7433efafa582a7580386ac2d350f1cd9e8ff333e6ea9d2a67b13efbfc218dc45c72ca4dfae5f26d923c1ab60c61919fb2e5a48";
const baseUrl = "http://127.0.0.1:1337";
export async function getAllNotes() {
  const response = await fetch(`${baseUrl}/api/notes`);
  const data = await response.json();

  const res = {};

  data.data.forEach(
    ({ id, attributes: { title, content, slug, updatedAt } }) => {
      res[slug] = JSON.stringify({
        title,
        content,
        updateTime: updatedAt,
      });
    }
  );

  return res;
}

export async function addNote(data) {
  const response = await fetch(`${baseUrl}/api/notes`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.attributes.slug;
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`${baseUrl}/api/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid) {
  const response = await fetch(
    `${baseUrl}/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();

  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id,
  };
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid);
  const response = await fetch(`${baseUrl}/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  const res = await response.json();
}

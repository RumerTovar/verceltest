const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const DgraphLogIn = (form, setLoginError, setProfile, setIsOpen) => {
 async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(endpoint, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    query: operationsDoc,
    variables: variables,
    operationName: operationName,
   }),
  });

  return await result.json();
 }

 const operationsDoc = `
  query MyQuery($email: String!, $password: String!) {
    checkAuthorsPassword(email: $email, pwd: $password) {
      email
      firstName
      lastName
    }
  }
`;

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {
   email: form.email,
   password: form.password,
  });
 }

 async function startFetchMyQuery() {
  const { errors: error, data } = await fetchMyQuery();
  const { checkAuthorsPassword } = data;

  if (error) {
   // handle those errors like a pro
   return console.log(error);
  }

  if (!checkAuthorsPassword) {
   return setLoginError('Invalid email or password');
  }

  // do something great with this precious data
  setProfile(checkAuthorsPassword);
  setIsOpen(false);
 }

 startFetchMyQuery();
};

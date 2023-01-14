export const DgraphAuthentication = (
 email,
 setProfile,
 setIsOpen,
 setLoginError
) => {
 async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
   'https://blue-surf-790015.us-east-1.aws.cloud.dgraph.io/graphql',
   {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     query: operationsDoc,
     variables: variables,
     operationName: operationName,
    }),
   }
  );

  return await result.json();
 }

 const operationsDoc = `
  query MyQuery($email: String!) {
    getAuthors(email: $email) {
      firstName
      lastName
    }
  }
`;

 function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, 'MyQuery', {
   email: email,
  });
 }

 async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  const { getAuthors } = data;

  if (errors) {
   // handle those errors like a pro
   console.error(errors);
   return setLoginError('Something went wrong try again');
  }

  // do something great with this precious data
  setProfile(getAuthors);
  setIsOpen(false);
  // console.log(data);
 }

 startFetchMyQuery();
};
